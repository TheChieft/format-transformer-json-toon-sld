import { DataFormat } from '../lib/types';

interface FormatSelectorProps {
  label: string;
  value: DataFormat;
  onChange: (format: DataFormat) => void;
  disabled?: boolean;
}

const formats: DataFormat[] = ['JSON', 'TOON', 'SLD'];

export function FormatSelector({ label, value, onChange, disabled = false }: FormatSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DataFormat)}
        disabled={disabled}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        {formats.map((format) => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
      </select>
    </div>
  );
}
