import { DataFormat } from '../lib/types';

interface TextAreaPanelProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  format: DataFormat;
  onLoadExample?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  error?: string;
  suggestion?: string;
}

export function TextAreaPanel({
  title,
  value,
  onChange,
  readOnly = false,
  placeholder,
  format,
  onLoadExample,
  onCopy,
  onDownload,
  error,
  suggestion,
}: TextAreaPanelProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      if (onCopy) onCopy();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const extension = format.toLowerCase();
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (onDownload) onDownload();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <div className="flex gap-2">
          {onLoadExample && (
            <button
              onClick={onLoadExample}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-300 rounded-md
                       hover:bg-gray-300 dark:hover:bg-gray-600 
                       transition-colors"
            >
              Load Example
            </button>
          )}
          {readOnly && value && (
            <>
              <button
                onClick={handleCopy}
                className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 
                         text-blue-700 dark:text-blue-300 rounded-md
                         hover:bg-blue-200 dark:hover:bg-blue-800 
                         transition-colors"
              >
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 
                         text-green-700 dark:text-green-300 rounded-md
                         hover:bg-green-200 dark:hover:bg-green-800 
                         transition-colors"
              >
                Download
              </button>
            </>
          )}
        </div>
      </div>
      
      <textarea
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`flex-1 w-full px-4 py-3 border rounded-lg font-mono text-sm
                   ${readOnly 
                     ? 'bg-gray-50 dark:bg-gray-900 cursor-default' 
                     : 'bg-white dark:bg-gray-800'}
                   ${error 
                     ? 'border-red-500 dark:border-red-500' 
                     : 'border-gray-300 dark:border-gray-600'}
                   text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   resize-none transition-colors`}
        style={{ minHeight: '300px' }}
      />
      
      {error && (
        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 
                      dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">
            Error: {error}
          </p>
          {suggestion && (
            <p className="text-sm text-red-600 dark:text-red-500 mt-1">
              Suggestion: {suggestion}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
