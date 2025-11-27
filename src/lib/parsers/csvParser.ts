import type { ParsedData } from '../types';

/**
 * Parse CSV (Comma Separated Values) to internal ParsedData structure
 * 
 * Assumptions:
 * - First line contains headers (field names)
 * - Subsequent lines contain data records
 * - Values may be quoted if they contain commas or newlines
 * - Type inference: numbers, booleans, nulls
 */
export function parseCSV(content: string): ParsedData {
  if (!content || !content.trim()) {
    throw new Error('❌ CSV content is empty');
  }

  const lines = content.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error(
      `❌ CSV must have at least 2 lines (header + data).\n\n💡 Current lines: ${lines.length}`
    );
  }

  // Parse header line
  const headers = parseCSVLine(lines[0]);
  
  if (headers.length === 0 || headers.some(h => !h.trim())) {
    throw new Error(
      `❌ CSV headers are invalid.\n\n💡 Headers must be non-empty strings.`
    );
  }

  // Parse data lines
  const records: Record<string, string | number>[] = [];
  const fieldsSet = new Set<string>(headers);

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines

    const values = parseCSVLine(line);

    if (values.length !== headers.length) {
      throw new Error(
        `❌ Row ${i} has ${values.length} columns, but header has ${headers.length}.\n\n` +
        `💡 All rows must have the same number of columns.\n` +
        `   Row ${i}: "${line.substring(0, 50)}${line.length > 50 ? '...' : ''}"`
      );
    }

    const record: Record<string, string | number> = {};
    headers.forEach((header, j) => {
      record[header] = inferType(values[j]);
    });

    records.push(record);
  }

  if (records.length === 0) {
    throw new Error(
      `❌ CSV has no data rows (only header).\n\n💡 Add at least one data row.`
    );
  }

  return {
    collectionName: 'data',
    records,
    fields: Array.from(fieldsSet),
  };
}

/**
 * Parse a single CSV line, handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Add last field
  result.push(current.trim());

  return result;
}

/**
 * Infer type from string value
 */
function inferType(value: string): string | number {
  const trimmed = value.trim();

  // Handle quoted strings
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).replace(/""/g, '"'); // Unescape quotes
  }

  // Null/undefined
  if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined') {
    return '';
  }

  // Boolean (return as string since ParsedData only accepts string | number)
  if (trimmed.toLowerCase() === 'true') return 'true';
  if (trimmed.toLowerCase() === 'false') return 'false';

  // Number
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    const num = Number(trimmed);
    if (!isNaN(num)) return num;
  }

  // Default: string
  return trimmed;
}
