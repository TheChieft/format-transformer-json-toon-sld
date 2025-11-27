import type { ParsedData } from '../types';
import { parseCSV } from './csvParser';

/**
 * Parse TSV (Tab Separated Values) to internal ParsedData structure
 *
 * TSV is identical to CSV but uses tabs instead of commas
 */
export function parseTSV(content: string): ParsedData {
  if (!content || !content.trim()) {
    throw new Error('❌ TSV content is empty');
  }

  // Convert TSV to CSV by replacing tabs with commas
  // (handling quoted values properly)
  const csvContent = tsvToCSV(content);

  return parseCSV(csvContent);
}

/**
 * Convert TSV to CSV format
 */
function tsvToCSV(tsvContent: string): string {
  const lines = tsvContent.split('\n');
  const csvLines: string[] = [];

  for (const line of lines) {
    const values = line.split('\t');
    const escapedValues = values.map((value) => {
      const trimmed = value.trim();
      // If value contains comma or quote, wrap in quotes
      if (trimmed.includes(',') || trimmed.includes('"')) {
        return `"${trimmed.replace(/"/g, '""')}"`;
      }
      return trimmed;
    });
    csvLines.push(escapedValues.join(','));
  }

  return csvLines.join('\n');
}
