import { ParsedData, ValidationError } from '../types';

/**
 * Validates and parses JSON input
 */
export function parseJSON(input: string): ParsedData {
  const trimmed = input.trim();
  
  if (!trimmed) {
    throw new Error('Input is empty');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (e) {
    throw new Error(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('JSON must be an object at root level');
  }

  const obj = parsed as Record<string, unknown>;
  const keys = Object.keys(obj);

  if (keys.length === 0) {
    throw new Error('JSON object is empty');
  }

  // Find the first array property
  let collectionName = '';
  let records: unknown[] = [];

  for (const key of keys) {
    if (Array.isArray(obj[key])) {
      collectionName = key;
      records = obj[key] as unknown[];
      break;
    }
  }

  if (!collectionName) {
    throw new Error('JSON must contain at least one array property');
  }

  if (records.length === 0) {
    throw new Error(`Array "${collectionName}" is empty`);
  }

  // Extract fields from all records
  const fieldsSet = new Set<string>();
  const processedRecords: Record<string, string | number>[] = [];

  for (const record of records) {
    if (typeof record !== 'object' || record === null || Array.isArray(record)) {
      throw new Error(`All items in "${collectionName}" must be objects`);
    }

    const recordObj = record as Record<string, unknown>;
    const processedRecord: Record<string, string | number> = {};

    Object.keys(recordObj).forEach((key) => {
      fieldsSet.add(key);
      const value = recordObj[key];
      
      if (typeof value === 'string' || typeof value === 'number') {
        processedRecord[key] = value;
      } else if (value === null || value === undefined) {
        processedRecord[key] = '';
      } else {
        processedRecord[key] = JSON.stringify(value);
      }
    });

    processedRecords.push(processedRecord);
  }

  return {
    collectionName,
    fields: Array.from(fieldsSet),
    records: processedRecords,
  };
}

/**
 * Validates JSON input and returns validation result
 */
export function validateJSON(input: string): ValidationError {
  try {
    parseJSON(input);
    return { isValid: true };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unknown error';
    let suggestion = '';

    if (error.includes('Unexpected token')) {
      suggestion = 'Check for missing commas, quotes, or brackets';
    } else if (error.includes('array property')) {
      suggestion = 'Ensure your JSON has at least one array property like: { "users": [...] }';
    }

    return {
      isValid: false,
      error,
      suggestion,
    };
  }
}
