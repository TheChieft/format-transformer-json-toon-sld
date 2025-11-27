import { useState, useCallback, useEffect } from 'react';
import { transformData } from '../lib/transformers/formatRouter';
import { estimateTokenCount } from '../lib/utils/tokenEstimator';
import { calculateReadability } from '../lib/utils/readabilityCalculator';

export type DataFormat = 'JSON' | 'TOON' | 'SLD' | 'CSV' | 'TSV' | 'YAML';

interface FormatMetrics {
  format: DataFormat;
  content: string;
  charCount: number;
  tokenCount: number;
  byteSize: number;
  readabilityScore: number;
}

const FORMAT_OPTIONS: { value: DataFormat; label: string; description: string }[] = [
  { value: 'JSON', label: 'JSON', description: 'Universal data format' },
  { value: 'TOON', label: 'TOON', description: 'Token-optimized for LLMs' },
  { value: 'SLD', label: 'SLD', description: 'Experimental compact format' },
  { value: 'CSV', label: 'CSV', description: 'Comma-separated values' },
  { value: 'TSV', label: 'TSV', description: 'Tab-separated values' },
  { value: 'YAML', label: 'YAML', description: 'Human-readable config' },
];

function getReadabilityColor(score: number): string {
  if (score >= 80) return 'text-green-600 dark:text-green-400';
  if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

interface EditorPanelProps {
  title: string;
  format: DataFormat;
  value: string;
  onChange: (value: string) => void;
  onFormatChange: (format: DataFormat) => void;
  metrics: FormatMetrics | null;
  isReadOnly: boolean;
  onCopy: () => void;
  onDownload: () => void;
  gradientColor: string;
}

function EditorPanel({
  title,
  format,
  value,
  onChange,
  onFormatChange,
  metrics,
  isReadOnly,
  onCopy,
  onDownload,
  gradientColor,
}: EditorPanelProps) {
  const readability = value ? calculateReadability(value) : null;

  return (
    <div className="flex flex-col h-full">
      {/* Header with Format Selector */}
      <div className={`bg-gradient-to-r ${gradientColor} p-4 rounded-t-xl`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={onCopy}
              disabled={!value}
              className="p-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              title="Copy to clipboard"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button
              onClick={onDownload}
              disabled={!value}
              className="p-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              title="Download file"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Format Selector */}
        <select
          value={format}
          onChange={(e) => onFormatChange(e.target.value as DataFormat)}
          className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
        >
          {FORMAT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-gray-800">
              {opt.label} - {opt.description}
            </option>
          ))}
        </select>
      </div>

      {/* Editor Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={isReadOnly}
        placeholder={isReadOnly ? 'Transformed output appears here...' : 'Paste your data here...'}
        className={`flex-1 p-4 bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700 font-mono text-sm resize-none focus:outline-none transition-colors duration-300 ${
          isReadOnly ? 'cursor-default text-gray-700 dark:text-gray-300' : ''
        }`}
        spellCheck={false}
      />

      {/* Metrics Footer */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 transition-colors duration-300">
        {metrics && readability ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Characters:</span>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {metrics.charCount.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Tokens:</span>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                ~{metrics.tokenCount.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Bytes:</span>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {metrics.byteSize.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Readability:</span>
              <p className={`font-semibold ${getReadabilityColor(readability.score)}`}>
                {readability.score}/100
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">No data to analyze</p>
        )}
      </div>
    </div>
  );
}

export function DualColumnEditor() {
  const [inputFormat, setInputFormat] = useState<DataFormat>('JSON');
  const [outputFormat, setOutputFormat] = useState<DataFormat>('TOON');
  const [inputContent, setInputContent] = useState('');
  const [outputContent, setOutputContent] = useState('');
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [copyNotification, setCopyNotification] = useState<string | null>(null);

  const [inputMetrics, setInputMetrics] = useState<FormatMetrics | null>(null);
  const [outputMetrics, setOutputMetrics] = useState<FormatMetrics | null>(null);

  const calculateMetrics = useCallback((content: string, format: DataFormat): FormatMetrics => {
    const encoder = new TextEncoder();
    const byteSize = encoder.encode(content).length;
    const charCount = content.length;
    const tokenCount = estimateTokenCount(content);
    const readabilityScore = calculateReadability(content).score;

    return {
      format,
      content,
      charCount,
      tokenCount,
      byteSize,
      readabilityScore,
    };
  }, []);

  const handleTransform = useCallback(() => {
    if (!inputContent.trim()) {
      setOutputContent('');
      setInputMetrics(null);
      setOutputMetrics(null);
      setError('');
      setHasChanges(false);
      return;
    }

    try {
      setError('');
      const transformed = transformData(inputContent, inputFormat, outputFormat);
      setOutputContent(transformed);

      // Calculate metrics
      setInputMetrics(calculateMetrics(inputContent, inputFormat));
      setOutputMetrics(calculateMetrics(transformed, outputFormat));

      setHasChanges(false);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Transformation error';
      setError(errorMessage);
      setOutputContent('');
      setOutputMetrics(null);
    }
  }, [inputContent, inputFormat, outputFormat, calculateMetrics]);

  const handleInputChange = useCallback((value: string) => {
    setInputContent(value);
    setHasChanges(true);
  }, []);

  const handleCopy = useCallback((content: string, format: DataFormat) => {
    if (!content) return;

    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopyNotification(`${format} copied!`);
        setTimeout(() => setCopyNotification(null), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        setCopyNotification('Failed to copy');
        setTimeout(() => setCopyNotification(null), 2000);
      });
  }, []);

  const handleDownload = useCallback((content: string, format: DataFormat) => {
    if (!content) return;

    const extensions: Record<DataFormat, string> = {
      JSON: '.json',
      TOON: '.toon',
      SLD: '.sld',
      CSV: '.csv',
      TSV: '.tsv',
      YAML: '.yaml',
    };

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data${extensions[format]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleTransform();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTransform]);

  // Load example data on mount
  useEffect(() => {
    const exampleJson = `{
  "users": [
    { "id": 1, "name": "Alice Johnson", "role": "admin", "active": true },
    { "id": 2, "name": "Bob Smith", "role": "user", "active": true },
    { "id": 3, "name": "Charlie Brown", "role": "user", "active": false }
  ]
}`;
    setInputContent(exampleJson);
    setHasChanges(true);
  }, []);

  // Auto-transform on format change
  useEffect(() => {
    if (inputContent && inputFormat !== outputFormat) {
      handleTransform();
    }
  }, [inputFormat, outputFormat]);

  return (
    <div className="space-y-4">
      {/* Copy Notification Toast */}
      {copyNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">{copyNotification}</span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">
                Transformation Error
              </h4>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1 whitespace-pre-wrap">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
        <EditorPanel
          title="Input"
          format={inputFormat}
          value={inputContent}
          onChange={handleInputChange}
          onFormatChange={setInputFormat}
          metrics={inputMetrics}
          isReadOnly={false}
          onCopy={() => handleCopy(inputContent, inputFormat)}
          onDownload={() => handleDownload(inputContent, inputFormat)}
          gradientColor="from-blue-500 to-cyan-500"
        />
        <EditorPanel
          title="Output"
          format={outputFormat}
          value={outputContent}
          onChange={() => {}}
          onFormatChange={setOutputFormat}
          metrics={outputMetrics}
          isReadOnly={true}
          onCopy={() => handleCopy(outputContent, outputFormat)}
          onDownload={() => handleDownload(outputContent, outputFormat)}
          gradientColor="from-purple-500 to-pink-500"
        />
      </div>

      {/* Transform Button */}
      <div className="flex justify-center">
        <button
          onClick={handleTransform}
          disabled={!hasChanges && inputContent !== ''}
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <div className="flex items-center space-x-3">
            <svg
              className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-lg">Transform Data</span>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
            {hasChanges ? 'Click to transform' : 'No changes'} • Ctrl+Enter
          </div>
        </button>
      </div>

      {/* Comparison Bar Chart */}
      {inputMetrics && outputMetrics && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>Performance Comparison</span>
          </h3>

          {/* Character Count Comparison */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Character Count
            </h4>
            <div className="space-y-3">
              {[
                {
                  metrics: inputMetrics,
                  label: `Input (${inputFormat})`,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'bg-blue-100 dark:bg-blue-900/30',
                },
                {
                  metrics: outputMetrics,
                  label: `Output (${outputFormat})`,
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-100 dark:bg-purple-900/30',
                },
              ].map(({ metrics, label, color, bgColor }) => {
                const maxChars = Math.max(inputMetrics.charCount, outputMetrics.charCount);
                const percentage = (metrics.charCount / maxChars) * 100;
                const diff =
                  ((metrics.charCount - inputMetrics.charCount) / inputMetrics.charCount) * 100;
                return (
                  <div key={label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {metrics.charCount.toLocaleString()} chars
                        {diff !== 0 && (
                          <span className={diff < 0 ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                            ({diff > 0 ? '+' : ''}
                            {diff.toFixed(1)}%)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className={`h-8 ${bgColor} rounded-lg overflow-hidden relative`}>
                      <div
                        className={`h-full bg-gradient-to-r ${color} transition-all duration-500 flex items-center justify-end pr-3`}
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-white text-xs font-bold">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Token Count Comparison */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Estimated Tokens
            </h4>
            <div className="space-y-3">
              {[
                {
                  metrics: inputMetrics,
                  label: `Input (${inputFormat})`,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'bg-blue-100 dark:bg-blue-900/30',
                },
                {
                  metrics: outputMetrics,
                  label: `Output (${outputFormat})`,
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-100 dark:bg-purple-900/30',
                },
              ].map(({ metrics, label, color, bgColor }) => {
                const maxTokens = Math.max(inputMetrics.tokenCount, outputMetrics.tokenCount);
                const percentage = (metrics.tokenCount / maxTokens) * 100;
                const diff =
                  ((metrics.tokenCount - inputMetrics.tokenCount) / inputMetrics.tokenCount) * 100;
                return (
                  <div key={label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        ~{metrics.tokenCount.toLocaleString()} tokens
                        {diff !== 0 && (
                          <span className={diff < 0 ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                            ({diff > 0 ? '+' : ''}
                            {diff.toFixed(1)}%)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className={`h-8 ${bgColor} rounded-lg overflow-hidden relative`}>
                      <div
                        className={`h-full bg-gradient-to-r ${color} transition-all duration-500 flex items-center justify-end pr-3`}
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-white text-xs font-bold">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Readability Score Comparison */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Readability Score
            </h4>
            <div className="space-y-3">
              {[
                {
                  metrics: inputMetrics,
                  label: `Input (${inputFormat})`,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'bg-blue-100 dark:bg-blue-900/30',
                },
                {
                  metrics: outputMetrics,
                  label: `Output (${outputFormat})`,
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-100 dark:bg-purple-900/30',
                },
              ].map(({ metrics, label, color, bgColor }) => {
                const percentage = metrics.readabilityScore;
                return (
                  <div key={label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
                      <span
                        className={`font-semibold ${getReadabilityColor(metrics.readabilityScore)}`}
                      >
                        {metrics.readabilityScore}/100
                      </span>
                    </div>
                    <div className={`h-8 ${bgColor} rounded-lg overflow-hidden relative`}>
                      <div
                        className={`h-full bg-gradient-to-r ${color} transition-all duration-500 flex items-center justify-end pr-3`}
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-white text-xs font-bold">{percentage}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
