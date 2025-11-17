import type { ParsedData, ValidationResult } from '../types';

/**
 * SLD (Single Line Data) Format Grammar:
 * collectionName|count|field1,field2,...|row1value1,row1value2;row2value1,row2value2;...
 * 
 * Example:
 * users|2|id,name,role|1,Alice,admin;2,Bob,user
 */

/**
 * Validates SLD format string
 */
export function validateSLD(input: string): ValidationResult {
  if (!input.trim()) {
    return { isValid: false, error: 'Input is empty' };
  }

  const parts = input.trim().split('|');
  if (parts.length !== 4) {
    return {
      isValid: false,
      error: 'SLD format requires exactly 4 parts separated by |: collectionName|count|fields|data',
    };
  }

  const [collectionName, countStr, fieldsStr, dataStr] = parts;

  if (!collectionName) {
    return { isValid: false, error: 'Collection name is required' };
  }

  const count = parseInt(countStr, 10);
  if (isNaN(count)) {
    return { isValid: false, error: 'Count must be a valid number' };
  }

  if (!fieldsStr) {
    return { isValid: false, error: 'Fields definition is required' };
  }

  if (count > 0 && !dataStr) {
    return { isValid: false, error: 'Data is required when count > 0' };
  }

  const rows = dataStr ? dataStr.split(';').filter((r) => r.trim()) : [];
  if (rows.length !== count) {
    return {
      isValid: false,
      error: `Declared count ${count} doesn't match actual row count ${rows.length}`,
    };
  }

  return { isValid: true };
}

/**
 * Parses SLD format string into ParsedData
 */
export function parseSLD(input: string): ParsedData {
  const parts = input.trim().split('|');
  
  if (parts.length !== 4) {
    throw new Error('Invalid SLD format');
  }

  const [collectionName, , fieldsStr, dataStr] = parts;
  const fields = fieldsStr.split(',').map((f) => f.trim());
  const rows = dataStr ? dataStr.split(';').filter((r) => r.trim()) : [];

  const items: Record<string, unknown>[] = rows.map((row) => {
    const values = row.split(',').map((v) => v.trim());
    const item: Record<string, unknown> = {};

    fields.forEach((field, index) => {
      if (index < values.length) {
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
 * Converts ParsedData to SLD format string
 */
export function toSLD(data: ParsedData): string {
  if (data.items.length === 0) {
    return `${data.collectionName}|0||`;
  }

  // Get all unique fields
  const fieldsSet = new Set<string>();
  data.items.forEach((item) => {
    Object.keys(item).forEach((key) => fieldsSet.add(key));
  });
  const fields = Array.from(fieldsSet);

  // Create data rows
  const rows = data.items.map((item) => {
    return fields.map((field) => item[field] ?? '').join(',');
  });

  return `${data.collectionName}|${data.items.length}|${fields.join(',')}|${rows.join(';')}`;
}
