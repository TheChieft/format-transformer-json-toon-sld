import type { ParsedData, ValidationResult } from '../types';

/**
 * TOON Format Grammar:
 * Header: collectionName[count]{field1,field2,...}:
 * Data: value1,value2,...
 * 
 * Example:
 * users[2]{id,name,role}:
 * 1,Alice,admin
 * 2,Bob,user
 */

/**
 * Validates TOON format string
 */
export function validateTOON(input: string): ValidationResult {
  if (!input.trim()) {
    return { isValid: false, error: 'Input is empty' };
  }

  const lines = input.trim().split('\n');
  if (lines.length < 2) {
    return {
      isValid: false,
      error: 'TOON format requires at least a header and one data line',
    };
  }

  const headerRegex = /^(\w+)\[(\d+)\]\{([^}]+)\}:$/;
  const headerMatch = lines[0].match(headerRegex);

  if (!headerMatch) {
    return {
      isValid: false,
      error: 'Invalid TOON header format. Expected: collectionName[count]{field1,field2,...}:',
    };
  }

  const declaredCount = parseInt(headerMatch[2], 10);
  const dataLines = lines.slice(1).filter((line) => line.trim());

  if (dataLines.length !== declaredCount) {
    return {
      isValid: false,
      error: `Header declares ${declaredCount} items but found ${dataLines.length} data lines`,
    };
  }

  return { isValid: true };
}

/**
 * Parses TOON format string into ParsedData
 */
export function parseTOON(input: string): ParsedData {
  const lines = input.trim().split('\n');
  const headerRegex = /^(\w+)\[(\d+)\]\{([^}]+)\}:$/;
  const headerMatch = lines[0].match(headerRegex);

  if (!headerMatch) {
    throw new Error('Invalid TOON header format');
  }

  const collectionName = headerMatch[1];
  const fields = headerMatch[3].split(',').map((f) => f.trim());
  const dataLines = lines.slice(1).filter((line) => line.trim());

  const items: Record<string, unknown>[] = dataLines.map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const item: Record<string, unknown> = {};

    fields.forEach((field, index) => {
      if (index < values.length) {
        // Try to parse as number, otherwise keep as string
        const value = values[index];
        const numValue = Number(value);
        item[field] = isNaN(numValue) ? value : numValue;
      }
    });

    return item;
  });

  return { collectionName, items };
}

/**
 * Converts ParsedData to TOON format string
 */
export function toTOON(data: ParsedData): string {
  if (data.items.length === 0) {
    return `${data.collectionName}[0]{}:\n`;
  }

  // Get all unique fields from all items
  const fieldsSet = new Set<string>();
  data.items.forEach((item) => {
    Object.keys(item).forEach((key) => fieldsSet.add(key));
  });
  const fields = Array.from(fieldsSet);

  // Create header
  const header = `${data.collectionName}[${data.items.length}]{${fields.join(',')}}:`;

  // Create data lines
  const dataLines = data.items.map((item) => {
    return fields.map((field) => item[field] ?? '').join(',');
  });

  return [header, ...dataLines].join('\n');
}
