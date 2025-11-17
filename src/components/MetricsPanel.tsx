import { TransformationResult } from '../lib/types';

interface MetricsPanelProps {
  result: TransformationResult | null;
}

export function MetricsPanel({ result }: MetricsPanelProps) {
  if (!result) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border 
                    border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Transform data to see metrics and comparisons
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 
                  dark:from-gray-800 dark:to-gray-900 rounded-lg border 
                  border-blue-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Transformation Metrics
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <MetricCard
          label="Input"
          chars={result.inputCharCount}
          tokens={result.inputTokenCount}
        />
        <MetricCard
          label="Output"
          chars={result.outputCharCount}
          tokens={result.outputTokenCount}
        />
      </div>
      
      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border 
                    border-blue-100 dark:border-gray-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Savings vs JSON
          </span>
          <span className={`text-lg font-bold ${
            result.savingsPercentage > 0 
              ? 'text-green-600 dark:text-green-400' 
              : result.savingsPercentage < 0
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {result.savingsPercentage > 0 ? '↓' : result.savingsPercentage < 0 ? '↑' : '='} 
            {Math.abs(result.savingsPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              result.savingsPercentage > 0 
                ? 'bg-green-500' 
                : result.savingsPercentage < 0
                ? 'bg-red-500'
                : 'bg-gray-400'
            }`}
            style={{ width: `${Math.min(Math.abs(result.savingsPercentage), 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Based on character count comparison with JSON format
        </p>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="p-2 bg-white dark:bg-gray-800 rounded border 
                      border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">JSON chars:</span>
          <span className="ml-2 font-mono font-semibold text-gray-900 dark:text-gray-100">
            {result.jsonCharCount.toLocaleString()}
          </span>
        </div>
        <div className="p-2 bg-white dark:bg-gray-800 rounded border 
                      border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Output chars:</span>
          <span className="ml-2 font-mono font-semibold text-gray-900 dark:text-gray-100">
            {result.outputCharCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, chars, tokens }: { label: string; chars: number; tokens: number }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border 
                  border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        {label}
      </h4>
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {chars.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">chars</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            ~{tokens.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">tokens</span>
        </div>
      </div>
    </div>
  );
}
