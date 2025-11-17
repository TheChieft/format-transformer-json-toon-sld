import type { ParsedData, ValidationResult } from '../types';

/**
 * Validates JSON string and returns validation result
 */
export function validateJSON(input: string): ValidationResult {
  if (!input.trim()) {
    return { isValid: false, error: 'Input is empty' };
  }

  try {
    const parsed = JSON.parse(input);
    
    if (typeof parsed !== 'object' || parsed === null) {
      return {
        isValid: false,
        error: 'JSON must be an object at the root level',
      };
    }

    // Check if there's at least one array property
    const hasArrayProperty = Object.values(parsed).some(
      (value) => Array.isArray(value)
    );

    if (!hasArrayProperty) {
      return {
        isValid: false,
        error: 'JSON should contain at least one array property for transformation',
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON format',
    };
  }
}

/**
 * Parses JSON string into internal ParsedData format
 * Extracts the first array property as the main collection
 */
export function parseJSON(input: string): ParsedData {
  const parsed = JSON.parse(input);
  
  // Find the first array property
  const collectionEntry = Object.entries(parsed).find(([, value]) =>
    Array.isArray(value)
  );

  if (!collectionEntry) {
    throw new Error('No array property found in JSON');
  }

  const [collectionName, items] = collectionEntry;

  // Ensure all items are objects
  if (!Array.isArray(items) || !items.every((item: unknown) => typeof item === 'object' && item !== null)) {
    throw new Error('All array items must be objects');
  }

  return {
    collectionName,
    items: items as Record<string, unknown>[],
  };
}

/**
 * Converts ParsedData back to JSON string
 */
export function toJSON(data: ParsedData): string {
  return JSON.stringify(
    {
      [data.collectionName]: data.items,
    },
    null,
    2
  );
}
