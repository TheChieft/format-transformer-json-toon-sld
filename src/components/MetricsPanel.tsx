import type { Metrics } from '../lib/types';

interface MetricsPanelProps {
  metrics: Metrics | null;
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  if (!metrics) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Transformation Metrics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <MetricCard
          title="Input"
          characters={metrics.inputLength}
          tokens={metrics.inputTokens}
        />
        <MetricCard
          title="Output"
          characters={metrics.outputLength}
          tokens={metrics.outputTokens}
        />
      </div>

      <div className="border-t border-blue-200 dark:border-gray-700 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            JSON Baseline
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {metrics.jsonLength} chars | ~{metrics.jsonTokens} tokens
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Savings vs JSON
          </span>
          <span
            className={`text-lg font-bold ${
              metrics.savingsPercentage > 0
                ? 'text-green-600 dark:text-green-400'
                : metrics.savingsPercentage < 0
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {metrics.savingsPercentage > 0 ? '+' : ''}
            {metrics.savingsPercentage}%
          </span>
        </div>
        
        {metrics.savingsPercentage !== 0 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  metrics.savingsPercentage > 0
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
                style={{
                  width: `${Math.min(Math.abs(metrics.savingsPercentage), 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  characters: number;
  tokens: number;
}

function MetricCard({ title, characters, tokens }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
        {title}
      </h4>
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {characters.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            characters
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            ~{tokens.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            tokens (estimated)
          </span>
        </div>
      </div>
    </div>
  );
}
