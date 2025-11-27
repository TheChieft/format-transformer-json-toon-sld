export function FormatComparisonTable() {
  const formats = [
    {
      name: 'JSON',
      category: 'APIs & Web',
      structure: 'High',
      tokenEfficiency: '⭐⭐⭐',
      readability: '⭐⭐⭐',
      useCase: 'Universal data interchange',
      bestFor: 'APIs, web services, configuration',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'TOON',
      category: 'LLM Prompts',
      structure: 'High',
      tokenEfficiency: '⭐⭐⭐⭐⭐',
      readability: '⭐⭐⭐⭐',
      useCase: 'Token-optimized for LLMs',
      bestFor: 'LLM prompts, AI context, cost reduction',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'SLD',
      category: 'Experimental',
      structure: 'High',
      tokenEfficiency: '⭐⭐⭐⭐',
      readability: '⭐⭐⭐',
      useCase: 'Compact data format',
      bestFor: 'Experimental use cases',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'CSV',
      category: 'Spreadsheets',
      structure: 'Low',
      tokenEfficiency: '⭐⭐⭐⭐⭐',
      readability: '⭐⭐⭐⭐⭐',
      useCase: 'Pure tabular data',
      bestFor: 'Excel, databases, flat tables',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'TSV',
      category: 'Unix/Linux',
      structure: 'Low',
      tokenEfficiency: '⭐⭐⭐⭐⭐',
      readability: '⭐⭐⭐',
      useCase: 'Tab-separated values',
      bestFor: 'Unix pipes, bioinformatics',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      name: 'YAML',
      category: 'Configuration',
      structure: 'High',
      tokenEfficiency: '⭐⭐⭐',
      readability: '⭐⭐⭐⭐⭐',
      useCase: 'Human-readable config',
      bestFor: 'Kubernetes, Docker, CI/CD',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Format Comparison</h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Format
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Category
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Structure
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Token Efficiency
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Readability
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Best For
              </th>
            </tr>
          </thead>
          <tbody>
            {formats.map((format) => (
              <tr
                key={format.name}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${format.color}`}></div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {format.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{format.category}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      format.structure === 'High'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {format.structure}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                  {format.tokenEfficiency}
                </td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{format.readability}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-sm">
                  {format.bestFor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {formats.map((format) => (
          <div
            key={format.name}
            className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${format.color}`}></div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {format.name}
                </h3>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {format.category}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Structure:</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    format.structure === 'High'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}
                >
                  {format.structure}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Token Efficiency:</span>
                <span className="text-gray-900 dark:text-gray-100">{format.tokenEfficiency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Readability:</span>
                <span className="text-gray-900 dark:text-gray-100">{format.readability}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 font-medium">{format.bestFor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          💡 Choosing the Right Format
        </h3>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>
            • <strong>LLM Prompts</strong>: Use TOON for 40% token savings
          </li>
          <li>
            • <strong>APIs & Web</strong>: Use JSON for universal compatibility
          </li>
          <li>
            • <strong>Flat Tables</strong>: Use CSV for maximum simplicity
          </li>
          <li>
            • <strong>Configuration</strong>: Use YAML for human editability
          </li>
          <li>
            • <strong>Unix Pipelines</strong>: Use TSV for command-line tools
          </li>
        </ul>
      </div>
    </div>
  );
}
