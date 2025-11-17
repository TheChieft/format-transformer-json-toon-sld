export default function InfoSection() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        How It Works
      </h2>

      <div className="space-y-6">
        <Section title="What is JSON?">
          <p className="text-gray-700 dark:text-gray-300">
            JSON (JavaScript Object Notation) is the standard data interchange
            format for web APIs and configuration files. While human-readable
            and well-supported, JSON can be verbose with its syntax requirements
            (quotes, brackets, etc.), making it less efficient for token-limited
            AI contexts.
          </p>
        </Section>

        <Section title="What is TOON?">
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            TOON is a more compact format optimized for AI token efficiency.
            It uses a header-based structure that eliminates repetitive field names:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm font-mono overflow-x-auto">
{`users[2]{id,name,role}:
1,Alice,admin
2,Bob,user`}
          </pre>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            Field names are declared once in the header, then only values appear
            in subsequent lines, reducing redundancy significantly.
          </p>
        </Section>

        <Section title="What is SLD (Single Line Data)?">
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            SLD is an ultra-compact format that puts everything on a single line
            using pipe (|) and semicolon (;) delimiters:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm font-mono overflow-x-auto break-all">
{`users|2|id,name,role|1,Alice,admin;2,Bob,user`}
          </pre>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            This format minimizes whitespace and structural characters, achieving
            maximum compactness at the cost of human readability.
          </p>
        </Section>

        <Section title="When to Use Compact Formats in AI?">
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Token Cost Optimization:</strong> Many AI APIs charge per
              token. Compact formats can reduce costs significantly.
            </li>
            <li>
              <strong>Context Window Limits:</strong> AI models have maximum
              context lengths. Compact data allows more information in the same
              window.
            </li>
            <li>
              <strong>Batch Processing:</strong> When sending many data items,
              compact formats reduce overall payload size.
            </li>
            <li>
              <strong>Structured Data for Prompts:</strong> Including tabular
              data in prompts is more efficient in TOON/SLD than JSON.
            </li>
          </ul>
        </Section>

        <Section title="Token Estimation Method">
          <p className="text-gray-700 dark:text-gray-300">
            This tool uses a simplified heuristic for token counting: splitting
            by whitespace and punctuation, counting alphanumeric sequences, and
            accounting for structural characters. While not as precise as actual
            tokenizers like tiktoken, it provides a reasonable approximation for
            comparison purposes.
          </p>
        </Section>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}
