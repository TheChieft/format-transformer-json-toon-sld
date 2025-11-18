import { ParsedData, ValidationError } from '../types';

/**
 * Validates and parses JSON input
 * Supports both:
 * - Objects with array properties: { "users": [{...}] }
 * - Direct arrays: [{...}, {...}]
 */
export function parseJSON(input: string): ParsedData {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error('❌ Input is empty. Please paste some JSON data.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown error';
    throw new Error(
      `❌ Invalid JSON syntax:\n${errorMsg}\n\n💡 Tip: Check for missing commas, quotes, or brackets. Use a JSON validator to find the exact issue.`
    );
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('❌ JSON must be either an object or an array at root level.');
  }

  let collectionName = 'data';
  let records: unknown[] = [];

  // Case 1: Direct array at root level [{ }, { }]
  if (Array.isArray(parsed)) {
    records = parsed;
    collectionName = 'items'; // Default name for root arrays
  }
  // Case 2: Object with array property { "users": [{ }] }
  else {
    const obj = parsed as Record<string, unknown>;
    const keys = Object.keys(obj);

    if (keys.length === 0) {
      throw new Error('❌ JSON object is empty. Add some data to transform.');
    }

    // Find the first array property
    for (const key of keys) {
      if (Array.isArray(obj[key])) {
        collectionName = key;
        records = obj[key] as unknown[];
        break;
      }
    }

    if (!collectionName || records.length === 0) {
      throw new Error(
        `❌ No array found in JSON.\n\n💡 Expected format:\n• Direct array: [{...}, {...}]\n• Or object with array: {"users": [{...}]}`
      );
    }
  }

  if (records.length === 0) {
    throw new Error(`❌ Array "${collectionName}" is empty. Add at least one item.`);
  }

  // Extract fields from all records
  const fieldsSet = new Set<string>();
  const processedRecords: Record<string, string | number>[] = [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];

    if (typeof record !== 'object' || record === null || Array.isArray(record)) {
      throw new Error(
        `❌ Item at index ${i} is not a valid object.\n\n💡 All items must be objects like: {"name": "value", ...}`
      );
    }

    const recordObj = record as Record<string, unknown>;
    const processedRecord: Record<string, string | number> = {};

    Object.keys(recordObj).forEach((key) => {
      fieldsSet.add(key);
      const value = recordObj[key];

      // Handle different value types
      if (typeof value === 'string' || typeof value === 'number') {
        processedRecord[key] = value;
      } else if (typeof value === 'boolean') {
        processedRecord[key] = value.toString();
      } else if (value === null || value === undefined) {
        processedRecord[key] = '';
      } else if (Array.isArray(value)) {
        // Convert arrays to compact string representation
        processedRecord[key] = value
          .map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
          .join('|');
      } else if (typeof value === 'object') {
        // Convert nested objects to JSON string
        processedRecord[key] = JSON.stringify(value);
      } else {
        processedRecord[key] = String(value);
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

    if (error.includes('Invalid JSON syntax')) {
      suggestion = 'Use a JSON validator to check your syntax';
    } else if (error.includes('No array found')) {
      suggestion = 'Try formatting as [{...}] or {"items": [{...}]}';
    } else if (error.includes('not a valid object')) {
      suggestion = 'Ensure all array items are objects with key-value pairs';
    }

    return {
      isValid: false,
      error,
      suggestion,
    };
  }
}
