export function InfoSection() {
  return (
    <div className="mt-12 space-y-8">
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border 
                        border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          How It Works
        </h2>
        
        <div className="space-y-6">
          <FormatExplanation
            title="JSON (JavaScript Object Notation)"
            description="The standard, human-readable data interchange format. Widely supported but verbose with repeated keys and formatting characters."
            example={`{
  "users": [
    {"id": 1, "name": "Alice"}
  ]
}`}
            pros={["Universal support", "Human-readable", "Self-documenting"]}
            cons={["Verbose", "High token count", "Repeated keys"]}
          />
          
          <FormatExplanation
            title="TOON (Tabular Object Oriented Notation)"
            description="A schema-first format that defines fields once in a header, then lists values. Reduces redundancy while maintaining readability."
            example={`users[1]{id,name}:
1,Alice`}
            pros={["Reduced redundancy", "Clear schema", "Still readable"]}
            cons={["Less universal support", "Requires parsing"]}
          />
          
          <FormatExplanation
            title="SLD (Single Line Data)"
            description="Ultra-compact single-line format that maximizes space efficiency. Best for large datasets where token count matters."
            example={`users|1|id,name|1,Alice`}
            pros={["Maximum compression", "Minimal tokens", "Fast parsing"]}
            cons={["Less human-readable", "No formatting"]}
          />
        </div>
      </section>
      
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 
                        dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md p-8 
                        border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Why Compact Formats Matter for AI
        </h2>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Large Language Models (LLMs) have token limits and token-based pricing. 
            Reducing data size can:
          </p>
          
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Lower costs:</strong> API calls are priced per token</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Fit more data:</strong> Stay within context window limits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Faster processing:</strong> Less data to parse and process</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Better performance:</strong> Models can focus on content, not structure</span>
            </li>
          </ul>
          
          <p className="text-gray-700 dark:text-gray-300">
            For tabular or structured data passed to AI systems, formats like TOON and SLD 
            can reduce token usage by 30-60% compared to JSON, without losing information.
          </p>
        </div>
      </section>
      
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border 
                        border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          About This Project
        </h2>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          This tool demonstrates the potential for optimizing data formats for AI applications. 
          Built with React, TypeScript, and Vite, it showcases clean architecture, type safety, 
          and modern web development practices.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Vitest'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 
                       dark:text-blue-300 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Created as a portfolio project to demonstrate full-stack development skills, 
          clean code practices, and problem-solving abilities.
        </p>
      </section>
    </div>
  );
}

interface FormatExplanationProps {
  title: string;
  description: string;
  example: string;
  pros: string[];
  cons: string[];
}

function FormatExplanation({ title, description, example, pros, cons }: FormatExplanationProps) {
  return (
    <div className="border-l-4 border-blue-500 pl-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-3">
        {description}
      </p>
      <pre className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm font-mono 
                    text-gray-800 dark:text-gray-200 mb-3 overflow-x-auto">
        {example}
      </pre>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-medium text-green-600 dark:text-green-400 mb-1">Pros</h4>
          <ul className="space-y-1">
            {pros.map((pro, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-400">• {pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-1">Cons</h4>
          <ul className="space-y-1">
            {cons.map((con, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-400">• {con}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
