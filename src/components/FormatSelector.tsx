import type { Format } from '../lib/types';

interface FormatSelectorProps {
  label: string;
  value: Format;
  onChange: (format: Format) => void;
  disabled?: boolean;
}

export default function FormatSelector({
  label,
  value,
  onChange,
  disabled = false,
}: FormatSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Format)}
        disabled={disabled}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="JSON">JSON</option>
        <option value="TOON">TOON</option>
        <option value="SLD">SLD</option>
      </select>
    </div>
  );
}
