import { useState, useEffect } from 'react';
import type { Format, Metrics } from './lib/types';
import { transform } from './lib/transformers/formatRouter';
import { getExampleForFormat } from './lib/utils/examples';
import FormatSelector from './components/FormatSelector';
import TextAreaPanel from './components/TextAreaPanel';
import MetricsPanel from './components/MetricsPanel';
import InfoSection from './components/InfoSection';

function App() {
  const [inputFormat, setInputFormat] = useState<Format>('JSON');
  const [outputFormat, setOutputFormat] = useState<Format>('TOON');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize with dark mode based on system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleTransform = () => {
    try {
      setError(undefined);
      const result = transform(inputText, inputFormat, outputFormat);
      setOutputText(result.output);
      setMetrics(result.metrics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transformation failed');
      setOutputText('');
      setMetrics(null);
    }
  };

  const handleLoadExample = () => {
    const example = getExampleForFormat(inputFormat);
    setInputText(example);
    setError(undefined);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleDownload = () => {
    const extensions: Record<Format, string> = {
      JSON: 'json',
      TOON: 'toon',
      SLD: 'sld',
    };
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transformed.${extensions[outputFormat]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Format Transformer
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Convert between JSON, TOON, and SLD formats • Optimize data for
                AI applications
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Format Selectors and Transform Button */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <FormatSelector
                label="Input Format"
                value={inputFormat}
                onChange={setInputFormat}
              />
              <div className="flex items-end justify-center">
                <button
                  onClick={handleTransform}
                  disabled={!inputText}
                  className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors disabled:cursor-not-allowed"
                >
                  Transform →
                </button>
              </div>
              <FormatSelector
                label="Output Format"
                value={outputFormat}
                onChange={setOutputFormat}
              />
            </div>
          </div>

          {/* Input and Output Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <TextAreaPanel
                label="Input"
                value={inputText}
                onChange={setInputText}
                onLoadExample={handleLoadExample}
                placeholder={`Paste your ${inputFormat} data here...`}
                error={error}
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <TextAreaPanel
                label="Output"
                value={outputText}
                readOnly
                onCopy={handleCopy}
                onDownload={handleDownload}
                placeholder="Transformed data will appear here..."
              />
            </div>
          </div>

          {/* Metrics Panel */}
          {metrics && <MetricsPanel metrics={metrics} />}

          {/* Info Section */}
          <InfoSection />

          {/* About Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              About This Project
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This is a portfolio demonstration project showcasing full-stack
              development skills with React, TypeScript, and modern web
              technologies. The application provides practical utility for
              developers working with AI APIs who need to optimize their data
              formats for token efficiency.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Built with React, TypeScript, Vite, and TailwindCSS. Fully
              responsive design with dark mode support. Open source and ready
              for deployment on Netlify or Vercel.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Built with React + TypeScript + Vite + TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
