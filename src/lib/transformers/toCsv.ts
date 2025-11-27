import type { ParsedData } from '../types';

/**
 * Transform ParsedData to CSV format
 *
 * Features:
 * - Headers on first line
 * - Values quoted if they contain commas, quotes, or newlines
 * - Boolean values converted to lowercase strings
 * - Empty values represented as empty strings
 */
export function toCSV(data: ParsedData): string {
  if (!data.records || data.records.length === 0) {
    throw new Error('Cannot convert empty data to CSV');
  }

  const fields = data.fields;
  const lines: string[] = [];

  // Header line
  lines.push(fields.map(escapeCSVValue).join(','));

  // Data lines
  for (const record of data.records) {
    const values = fields.map((field) => {
      const value = record[field];
      if (value === null || value === undefined || value === '') {
        return '';
      }
      return String(value);
    });
    lines.push(values.map(escapeCSVValue).join(','));
  }

  return lines.join('\n');
}

/**
 * Escape CSV value (add quotes if needed)
 */
function escapeCSVValue(value: string): string {
  // Check if value needs quoting
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    // Escape quotes by doubling them
    const escaped = value.replace(/"/g, '""');
    return `"${escaped}"`;
  }

  return value;
}
