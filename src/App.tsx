import { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { DualColumnEditor } from './components/DualColumnEditor';
import { FormatGallery } from './components/FormatGallery';
import { FormatComparisonTable } from './components/FormatComparisonTable';

function App() {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: 'home' | 'how-it-works') => {
    if (section === 'home' && homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'how-it-works' && howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
      <Navbar onNavigate={handleNavigate} />

      {/* Hero Section */}
      <div ref={homeRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block">
              <div className="flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span>Open Source • Free to Use • AI Optimized</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Transform Data
              </span>
              <br />
              <span className="text-gray-900 dark:text-gray-100">For AI Systems</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Convert between JSON, TOON, and SLD formats. Save tokens, reduce costs, and optimize
              your AI prompts with intelligent data serialization.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-3 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Savings</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">40-60%</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-3 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="text-sm text-gray-600 dark:text-gray-400">Token Reduction</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Real-time</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-3 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="text-sm text-gray-600 dark:text-gray-400">Formats</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">6+</div>
              </div>
            </div>
          </div>

          {/* Main Editor */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-2xl transition-colors duration-300">
            <DualColumnEditor />
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Multi-Format Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Transform between 6+ formats: JSON, TOON, SLD, CSV, TSV, and YAML. Choose the right format for your use case.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Smart Metrics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                See character count, token estimates, byte size, and readability scores for each
                format.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Cost Savings</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reduce AI API costs by up to 60% with optimized data formats that use fewer tokens.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Format Gallery Section */}
      <div
        ref={howItWorksRef}
        className="relative bg-white dark:bg-gray-800 transition-colors duration-300"
      >
        <FormatGallery />
      </div>

      {/* Format Comparison Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FormatComparisonTable />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Format Transformer
              </h3>
              <p className="text-gray-400 text-sm">
                Open-source tool for converting data between AI-optimized formats. Built with React,
                TypeScript, and modern web technologies.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-300">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => handleNavigate('home')}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('how-it-works')}
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/TheChieft/format-transformer-json-toon-sld"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-300">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Vitest'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>Built with ❤️ for the AI community • Open Source • MIT License</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
