import { useState, useEffect, useCallback } from 'react';
import { DataFormat, FormatMetrics } from '../lib/types';
import { transformData } from '../lib/transformers/formatRouter';
import { estimateTokenCount } from '../lib/utils/tokenEstimator';
import {
  calculateReadability,
  getReadabilityColor,
  getReadabilityBgColor,
} from '../lib/utils/readabilityCalculator';

interface EditorColumnProps {
  format: DataFormat;
  value: string;
  onChange: (value: string, format: DataFormat) => void;
  metrics: FormatMetrics | null;
  isActive: boolean;
  onCopy: () => void;
  onDownload: () => void;
}

function EditorColumn({
  format,
  value,
  onChange,
  metrics,
  isActive,
  onCopy,
  onDownload,
}: EditorColumnProps) {
  const readability = value ? calculateReadability(value) : null;

  const formatColors = {
    JSON: 'from-blue-500 to-cyan-500',
    TOON: 'from-purple-500 to-pink-500',
    SLD: 'from-orange-500 to-red-500',
  };

  const formatExtensions = {
    JSON: '.json',
    TOON: '.toon',
    SLD: '.sld',
  };

  return (
    <div
      className={`flex flex-col h-full transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${formatColors[format]} p-4 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg flex items-center space-x-2">
            <span>{format}</span>
            {isActive && (
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Editing</span>
            )}
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onCopy}
              disabled={!value}
              className="p-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 group"
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
              className="p-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 group"
              title={`Download as ${formatExtensions[format]}`}
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
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value, format)}
          className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-x border-gray-200 dark:border-gray-700 focus:outline-none resize-none transition-colors duration-300"
          placeholder={`Enter ${format} data here...`}
          spellCheck={false}
        />
      </div>

      {/* Metrics Footer */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 rounded-b-xl space-y-2 transition-colors duration-300">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Characters:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {metrics?.charCount.toLocaleString() || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Tokens:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ~{metrics?.tokenCount.toLocaleString() || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Bytes:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {metrics?.byteSize.toLocaleString() || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">vs JSON:</span>
            <span
              className={`font-semibold ${
                metrics && metrics.savingsVsJson > 0
                  ? 'text-green-600 dark:text-green-400'
                  : metrics && metrics.savingsVsJson < 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {(metrics?.savingsVsJson ?? 0) > 0
                ? '-'
                : (metrics?.savingsVsJson ?? 0) < 0
                  ? '+'
                  : ''}
              {Math.abs(metrics?.savingsVsJson ?? 0)}%
            </span>
          </div>
        </div>

        {/* Readability Score */}
        {readability && (
          <div
            className={`flex items-center justify-between p-2 rounded-lg ${getReadabilityBgColor(readability.score)}`}
          >
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Readability:
            </span>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold ${getReadabilityColor(readability.score)}`}>
                {readability.rating}
              </span>
              <span className={`text-sm font-bold ${getReadabilityColor(readability.score)}`}>
                {readability.score}/100
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ThreeColumnEditor() {
  const [jsonContent, setJsonContent] = useState('');
  const [toonContent, setToonContent] = useState('');
  const [sldContent, setSldContent] = useState('');
  const [activeFormat, setActiveFormat] = useState<DataFormat>('JSON');
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [copyNotification, setCopyNotification] = useState<string | null>(null);

  const [jsonMetrics, setJsonMetrics] = useState<FormatMetrics | null>(null);
  const [toonMetrics, setToonMetrics] = useState<FormatMetrics | null>(null);
  const [sldMetrics, setSldMetrics] = useState<FormatMetrics | null>(null);

  const calculateMetrics = useCallback(
    (content: string, format: DataFormat, jsonCharCount: number): FormatMetrics => {
      const encoder = new TextEncoder();
      const byteSize = encoder.encode(content).length;
      const charCount = content.length;
      const tokenCount = estimateTokenCount(content);
      const readabilityScore = calculateReadability(content).score;
      const savingsVsJson =
        jsonCharCount > 0 ? Math.round(((jsonCharCount - charCount) / jsonCharCount) * 100) : 0;

      return {
        format,
        content,
        charCount,
        tokenCount,
        byteSize,
        readabilityScore,
        savingsVsJson,
      };
    },
    []
  );

  const transformFormats = useCallback(
    (content: string, sourceFormat: DataFormat) => {
      if (!content.trim()) {
        setJsonContent('');
        setToonContent('');
        setSldContent('');
        setJsonMetrics(null);
        setToonMetrics(null);
        setSldMetrics(null);
        setError('');
        setHasChanges(false);
        return;
      }

      try {
        setError('');

        // Transform to all formats
        let jsonData = content;
        let toonData = content;
        let sldData = content;

        if (sourceFormat !== 'JSON') {
          jsonData = transformData(content, sourceFormat, 'JSON');
        }
        if (sourceFormat !== 'TOON') {
          toonData = transformData(jsonData, 'JSON', 'TOON');
        }
        if (sourceFormat !== 'SLD') {
          sldData = transformData(jsonData, 'JSON', 'SLD');
        }

        // Update all contents
        setJsonContent(jsonData);
        setToonContent(toonData);
        setSldContent(sldData);

        // Calculate metrics for all formats
        const jsonCharCount = jsonData.length;
        setJsonMetrics(calculateMetrics(jsonData, 'JSON', jsonCharCount));
        setToonMetrics(calculateMetrics(toonData, 'TOON', jsonCharCount));
        setSldMetrics(calculateMetrics(sldData, 'SLD', jsonCharCount));

        setHasChanges(false);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Transformation error';
        setError(errorMessage);
      }
    },
    [calculateMetrics]
  );

  const handleChange = useCallback((value: string, format: DataFormat) => {
    setActiveFormat(format);
    setHasChanges(true);

    // Update only the specific format content
    if (format === 'JSON') setJsonContent(value);
    else if (format === 'TOON') setToonContent(value);
    else if (format === 'SLD') setSldContent(value);
  }, []);

  const handleTransform = useCallback(() => {
    const activeContent =
      activeFormat === 'JSON' ? jsonContent : activeFormat === 'TOON' ? toonContent : sldContent;
    transformFormats(activeContent, activeFormat);
  }, [activeFormat, jsonContent, toonContent, sldContent, transformFormats]);

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

  // Copy to clipboard handler
  const handleCopy = useCallback(
    (format: DataFormat) => {
      const content =
        format === 'JSON' ? jsonContent : format === 'TOON' ? toonContent : sldContent;
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
    },
    [jsonContent, toonContent, sldContent]
  );

  // Download file handler
  const handleDownload = useCallback(
    (format: DataFormat) => {
      const content =
        format === 'JSON' ? jsonContent : format === 'TOON' ? toonContent : sldContent;
      if (!content) return;

      const extensions = {
        JSON: '.json',
        TOON: '.toon',
        SLD: '.sld',
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
    },
    [jsonContent, toonContent, sldContent]
  );

  // Load example data on mount
  useEffect(() => {
    const exampleJson = `{
  "users": [
    { "id": 1, "name": "Alice Johnson", "role": "admin", "active": true },
    { "id": 2, "name": "Bob Smith", "role": "user", "active": true },
    { "id": 3, "name": "Charlie Brown", "role": "user", "active": false }
  ]
}`;
    transformFormats(exampleJson, 'JSON');
  }, [transformFormats]);

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
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        <EditorColumn
          format="JSON"
          value={jsonContent}
          onChange={handleChange}
          metrics={jsonMetrics}
          isActive={activeFormat === 'JSON'}
          onCopy={() => handleCopy('JSON')}
          onDownload={() => handleDownload('JSON')}
        />
        <EditorColumn
          format="TOON"
          value={toonContent}
          onChange={handleChange}
          metrics={toonMetrics}
          isActive={activeFormat === 'TOON'}
          onCopy={() => handleCopy('TOON')}
          onDownload={() => handleDownload('TOON')}
        />
        <EditorColumn
          format="SLD"
          value={sldContent}
          onChange={handleChange}
          metrics={sldMetrics}
          isActive={activeFormat === 'SLD'}
          onCopy={() => handleCopy('SLD')}
          onDownload={() => handleDownload('SLD')}
        />
      </div>

      {/* Transform Button */}
      <div className="flex justify-center">
        <button
          onClick={handleTransform}
          disabled={!hasChanges && (jsonContent || toonContent || sldContent) !== ''}
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
      {jsonMetrics && toonMetrics && sldMetrics && (
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
                  metrics: jsonMetrics,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'bg-blue-100 dark:bg-blue-900/30',
                },
                {
                  metrics: toonMetrics,
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-100 dark:bg-purple-900/30',
                },
                {
                  metrics: sldMetrics,
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'bg-orange-100 dark:bg-orange-900/30',
                },
              ].map(({ metrics, color, bgColor }) => {
                const maxChars = Math.max(
                  jsonMetrics.charCount,
                  toonMetrics.charCount,
                  sldMetrics.charCount
                );
                const percentage = (metrics.charCount / maxChars) * 100;
                return (
                  <div key={`chars-${metrics.format}`} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {metrics.format}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {metrics.charCount} chars
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
                  metrics: jsonMetrics,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'bg-blue-100 dark:bg-blue-900/30',
                },
                {
                  metrics: toonMetrics,
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-100 dark:bg-purple-900/30',
                },
                {
                  metrics: sldMetrics,
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'bg-orange-100 dark:bg-orange-900/30',
                },
              ].map(({ metrics, color, bgColor }) => {
                const maxTokens = Math.max(
                  jsonMetrics.tokenCount,
                  toonMetrics.tokenCount,
                  sldMetrics.tokenCount
                );
                const percentage = (metrics.tokenCount / maxTokens) * 100;
                return (
                  <div key={`tokens-${metrics.format}`} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {metrics.format}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        ~{metrics.tokenCount} tokens
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
                  metrics: jsonMetrics,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'bg-blue-100 dark:bg-blue-900/30',
                },
                {
                  metrics: toonMetrics,
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-100 dark:bg-purple-900/30',
                },
                {
                  metrics: sldMetrics,
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'bg-orange-100 dark:bg-orange-900/30',
                },
              ].map(({ metrics, color, bgColor }) => {
                const percentage = metrics.readabilityScore;
                return (
                  <div key={`readability-${metrics.format}`} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {metrics.format}
                      </span>
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
