import { useState, useEffect } from 'react';

interface FormatExample {
  name: string;
  description: string;
  color: string;
  icon: JSX.Element;
  example: string;
  features: string[];
}

const FORMATS: FormatExample[] = [
  {
    name: 'JSON',
    description: 'Universal data interchange format',
    color: 'from-blue-500 to-cyan-500',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    example: `{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "role": "admin"
    }
  ]
}`,
    features: ['Universal support', 'Rich types', 'Widely adopted'],
  },
  {
    name: 'TOON',
    description: 'Token-optimized for LLM prompts',
    color: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    example: `users[1]{id,name,role}:
  1,Alice,admin`,
    features: ['40% fewer tokens', 'LLM-friendly', 'CSV-like compact'],
  },
  {
    name: 'SLD',
    description: 'Experimental compact format',
    color: 'from-orange-500 to-red-500',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    example: `users[
  1|Alice|admin
]`,
    features: ['Minimal syntax', 'Pipe-separated', 'Ultra-compact'],
  },
  {
    name: 'CSV',
    description: 'Comma-separated values for spreadsheets',
    color: 'from-green-500 to-emerald-500',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    example: `id,name,role
1,Alice,admin
2,Bob,user`,
    features: ['Universal spreadsheets', 'Simple format', 'Flat tables only'],
  },
  {
    name: 'TSV',
    description: 'Tab-separated for Unix pipelines',
    color: 'from-indigo-500 to-purple-500',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    example: `id	name	role
1	Alice	admin
2	Bob	user`,
    features: ['Unix-friendly', 'CLI tools', 'Less escaping'],
  },
  {
    name: 'YAML',
    description: 'Human-readable configuration format',
    color: 'from-pink-500 to-rose-500',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    example: `users:
  - id: 1
    name: Alice
    role: admin`,
    features: ['Readable', 'Comments support', 'Config files'],
  },
];

export function FormatGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % FORMATS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % FORMATS.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume auto-rotation after 10s
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + FORMATS.length) % FORMATS.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const activeFormat = FORMATS[activeIndex];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Supported Formats
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Transform data between multiple formats - each optimized for different use cases
          </p>
        </div>

        {/* Gallery Card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${activeFormat.color} p-8 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                  {activeFormat.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{activeFormat.name}</h3>
                  <p className="text-white/90 mt-1">{activeFormat.description}</p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  aria-label="Previous format"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  aria-label="Next format"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Example Code */}
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                  EXAMPLE
                </h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100 font-mono whitespace-pre">
                    {activeFormat.example}
                  </pre>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                  KEY FEATURES
                </h4>
                <ul className="space-y-3">
                  {activeFormat.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeFormat.color}`}
                      ></div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center space-x-2 pb-6">
            {FORMATS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-8 h-2 bg-gradient-to-r ' + activeFormat.color
                    : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to ${FORMATS[index].name}`}
              />
            ))}
          </div>

          {/* Auto-rotation indicator */}
          {!isPaused && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-full bg-gradient-to-r ${activeFormat.color} animate-progress`}
                style={{ animation: 'progress 5s linear' }}
              />
            </div>
          )}
        </div>

        {/* Format Counter */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Format {activeIndex + 1} of {FORMATS.length}
            {!isPaused && <span className="ml-2">• Auto-rotating</span>}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
