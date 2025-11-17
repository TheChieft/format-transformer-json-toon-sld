interface TextAreaPanelProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  onLoadExample?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  error?: string;
}

export default function TextAreaPanel({
  label,
  value,
  onChange,
  readOnly = false,
  placeholder,
  onLoadExample,
  onCopy,
  onDownload,
  error,
}: TextAreaPanelProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="flex gap-2">
          {onLoadExample && (
            <button
              onClick={onLoadExample}
              className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
            >
              Load Example
            </button>
          )}
          {onCopy && (
            <button
              onClick={onCopy}
              disabled={!value}
              className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Copy
            </button>
          )}
          {onDownload && (
            <button
              onClick={onDownload}
              disabled={!value}
              className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download
            </button>
          )}
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full h-64 px-4 py-3 border rounded-lg font-mono text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error
            ? 'border-red-500 dark:border-red-500'
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
          readOnly ? 'bg-gray-50 dark:bg-gray-900' : ''
        }`}
      />
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
