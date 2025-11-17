import { useState, useEffect, useCallback } from 'react';
import { DataFormat, FormatMetrics } from '../lib/types';
import { transformData } from '../lib/transformers/formatRouter';
import { estimateTokenCount } from '../lib/utils/tokenEstimator';
import { calculateReadability, getReadabilityColor, getReadabilityBgColor } from '../lib/utils/readabilityCalculator';

interface EditorColumnProps {
  format: DataFormat;
  value: string;
  onChange: (value: string, format: DataFormat) => void;
  metrics: FormatMetrics | null;
  isActive: boolean;
}

function EditorColumn({ format, value, onChange, metrics, isActive }: EditorColumnProps) {
  const readability = value ? calculateReadability(value) : null;

  const formatColors = {
    JSON: 'from-blue-500 to-cyan-500',
    TOON: 'from-purple-500 to-pink-500',
    SLD: 'from-orange-500 to-red-500',
  };

  return (
    <div className={`flex flex-col h-full transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${formatColors[format]} p-4 rounded-t-xl`}>
        <h3 className="text-white font-bold text-lg flex items-center justify-between">
          <span>{format}</span>
          {isActive && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Editing</span>
          )}
        </h3>
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
            <span className={`font-semibold ${
              metrics && metrics.savingsVsJson > 0 
                ? 'text-green-600 dark:text-green-400' 
                : metrics && metrics.savingsVsJson < 0
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              {metrics?.savingsVsJson > 0 ? '-' : metrics?.savingsVsJson < 0 ? '+' : ''}
              {Math.abs(metrics?.savingsVsJson || 0)}%
            </span>
          </div>
        </div>

        {/* Readability Score */}
        {readability && (
          <div className={`flex items-center justify-between p-2 rounded-lg ${getReadabilityBgColor(readability.score)}`}>
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

  const [jsonMetrics, setJsonMetrics] = useState<FormatMetrics | null>(null);
  const [toonMetrics, setToonMetrics] = useState<FormatMetrics | null>(null);
  const [sldMetrics, setSldMetrics] = useState<FormatMetrics | null>(null);

  const calculateMetrics = useCallback((content: string, format: DataFormat, jsonCharCount: number): FormatMetrics => {
    const encoder = new TextEncoder();
    const byteSize = encoder.encode(content).length;
    const charCount = content.length;
    const tokenCount = estimateTokenCount(content);
    const readabilityScore = calculateReadability(content).score;
    const savingsVsJson = jsonCharCount > 0 
      ? Math.round(((jsonCharCount - charCount) / jsonCharCount) * 100)
      : 0;

    return {
      format,
      content,
      charCount,
      tokenCount,
      byteSize,
      readabilityScore,
      savingsVsJson,
    };
  }, []);

  const syncFormats = useCallback((content: string, sourceFormat: DataFormat) => {
    if (!content.trim()) {
      setJsonContent('');
      setToonContent('');
      setSldContent('');
      setJsonMetrics(null);
      setToonMetrics(null);
      setSldMetrics(null);
      setError('');
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

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Transformation error';
      setError(errorMessage);
    }
  }, [calculateMetrics]);

  const handleChange = useCallback((value: string, format: DataFormat) => {
    setActiveFormat(format);
    
    // Update the specific format content immediately for typing responsiveness
    if (format === 'JSON') setJsonContent(value);
    else if (format === 'TOON') setToonContent(value);
    else if (format === 'SLD') setSldContent(value);

    // Debounce the sync operation
    const timeoutId = setTimeout(() => {
      syncFormats(value, format);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [syncFormats]);

  // Load example data on mount
  useEffect(() => {
    const exampleJson = `{
  "users": [
    { "id": 1, "name": "Alice Johnson", "role": "admin", "active": true },
    { "id": 2, "name": "Bob Smith", "role": "user", "active": true },
    { "id": 3, "name": "Charlie Brown", "role": "user", "active": false }
  ]
}`;
    syncFormats(exampleJson, 'JSON');
  }, []);

  return (
    <div className="space-y-4">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">Transformation Error</h4>
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
        />
        <EditorColumn
          format="TOON"
          value={toonContent}
          onChange={handleChange}
          metrics={toonMetrics}
          isActive={activeFormat === 'TOON'}
        />
        <EditorColumn
          format="SLD"
          value={sldContent}
          onChange={handleChange}
          metrics={sldMetrics}
          isActive={activeFormat === 'SLD'}
        />
      </div>

      {/* Comparison Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Format Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[jsonMetrics, toonMetrics, sldMetrics].map((metrics) => metrics && (
            <div key={metrics.format} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2 transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{metrics.format}</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Size:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{metrics.charCount} chars</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tokens:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">~{metrics.tokenCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Readability:</span>
                  <span className={`font-medium ${getReadabilityColor(metrics.readabilityScore)}`}>
                    {metrics.readabilityScore}/100
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
