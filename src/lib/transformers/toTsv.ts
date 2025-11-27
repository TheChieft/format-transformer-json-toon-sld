import type { ParsedData } from '../types';

/**
 * Transform ParsedData to TSV format
 *
 * TSV uses tabs as delimiters instead of commas
 */
export function toTSV(data: ParsedData): string {
  if (!data.records || data.records.length === 0) {
    throw new Error('Cannot convert empty data to TSV');
  }

  const fields = data.fields;
  const lines: string[] = [];

  // Header line
  lines.push(fields.join('\t'));

  // Data lines
  for (const record of data.records) {
    const values = fields.map((field) => {
      const value = record[field];
      if (value === null || value === undefined || value === '') {
        return '';
      }
      // Convert tabs to spaces to avoid breaking TSV format
      return String(value).replace(/\t/g, ' ');
    });
    lines.push(values.join('\t'));
  }

  return lines.join('\n');
}
