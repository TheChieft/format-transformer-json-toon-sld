export function HowItWorksSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Understanding data serialization formats optimized for AI systems
        </p>
      </div>

      {/* Format Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* JSON Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 h-full transition-colors duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">JSON</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              JavaScript Object Notation - the universal standard for data interchange. Human-readable, widely supported, but verbose.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">Excellent readability</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">Universal support</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">High token cost</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOON Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 h-full transition-colors duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">TOON</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tabular Object Oriented Notation - a structured, CSV-like format with metadata headers. Balances efficiency and readability.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">30-40% smaller than JSON</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">Still human-readable</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">Requires homogeneous data</span>
              </div>
            </div>
          </div>
        </div>

        {/* SLD Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 h-full transition-colors duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16m-7 5h7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">SLD</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Single Line Data - ultra-compact format for maximum token efficiency. Ideal for large datasets in AI prompts.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">50-60% smaller than JSON</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">Maximum token savings</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">Low readability</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8 md:p-12 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">When to Use Each Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">?</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Why Compact Formats Matter for AI</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Language models have token limits and pricing based on token usage. Reducing data size can:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Lower API costs significantly</li>
                  <li>Fit more data in context windows</li>
                  <li>Improve response times</li>
                  <li>Enable larger dataset analysis</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">📊</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Best Practices</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Use JSON for APIs and human collaboration</li>
                  <li>Use TOON for AI prompts with tabular data</li>
                  <li>Use SLD when token count is critical</li>
                  <li>Always test readability vs efficiency trade-offs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Real-World Example</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A dataset with 100 user records:
                </p>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">JSON:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">~5,000 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">TOON:</span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">~3,200 tokens (-36%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">SLD:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">~2,400 tokens (-52%)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  At $0.01 per 1K tokens, SLD saves $0.026 per request
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Performance Tips</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Remove unnecessary whitespace</li>
                  <li>Use shorter field names when possible</li>
                  <li>Group similar data types together</li>
                  <li>Consider compression for very large datasets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grammar Reference */}
      <div className="space-y-8">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">Format Grammar Reference</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TOON Grammar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">TOON Grammar</h4>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 dark:text-gray-400 mb-2">// Structure:</div>
                <div className="text-gray-900 dark:text-gray-100">collectionName[count]&#123;field1,field2,...&#125;:</div>
                <div className="text-gray-900 dark:text-gray-100">value1,value2,...</div>
                <div className="text-gray-900 dark:text-gray-100">value1,value2,...</div>
              </div>
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Header: collection name, item count, field names</li>
                <li>• Each line represents one record</li>
                <li>• Values in same order as header fields</li>
                <li>• Newlines separate records</li>
              </ul>
            </div>
          </div>

          {/* SLD Grammar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-4">SLD Grammar</h4>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 dark:text-gray-400 mb-2">// Structure:</div>
                <div className="text-gray-900 dark:text-gray-100 break-all">
                  collection|count|field1,field2|val1,val2;val1,val2
                </div>
              </div>
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Pipe (|) separates main sections</li>
                <li>• Semicolon (;) separates records</li>
                <li>• Comma (,) separates values within records</li>
                <li>• All on one line for maximum compactness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
