import { ParsedData, ValidationError } from '../types';

/**
 * Parses TOON format string
 * Format: collectionName[count]{field1,field2,...}:
 *         value1,value2,...
 *         value1,value2,...
 */
export function parseTOON(input: string): ParsedData {
  const trimmed = input.trim();
  
  if (!trimmed) {
    throw new Error('Input is empty');
  }

  const lines = trimmed.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  if (lines.length < 1) {
    throw new Error('TOON format requires at least a header line');
  }

  const headerLine = lines[0];
  
  // Parse header: collectionName[count]{field1,field2,...}:
  const headerMatch = headerLine.match(/^(\w+)\[(\d+)\]\{([^}]+)\}:$/);
  
  if (!headerMatch) {
    throw new Error('Invalid TOON header format. Expected: collectionName[count]{field1,field2,...}:');
  }

  const collectionName = headerMatch[1];
  const expectedCount = parseInt(headerMatch[2], 10);
  const fieldsStr = headerMatch[3];
  const fields = fieldsStr.split(',').map(f => f.trim());

  if (fields.length === 0) {
    throw new Error('TOON header must contain at least one field');
  }

  const dataLines = lines.slice(1);
  
  if (dataLines.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} records, but found ${dataLines.length}`);
  }

  const records: Record<string, string | number>[] = [];

  for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i];
    const values = line.split(',').map(v => v.trim());

    if (values.length !== fields.length) {
      throw new Error(`Line ${i + 2}: Expected ${fields.length} values, found ${values.length}`);
    }

    const record: Record<string, string | number> = {};
    
    for (let j = 0; j < fields.length; j++) {
      const value = values[j];
      // Try to parse as number, otherwise keep as string
      const numValue = Number(value);
      record[fields[j]] = isNaN(numValue) ? value : numValue;
    }

    records.push(record);
  }

  return {
    collectionName,
    fields,
    records,
  };
}

/**
 * Validates TOON input
 */
export function validateTOON(input: string): ValidationError {
  try {
    parseTOON(input);
    return { isValid: true };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unknown error';
    let suggestion = '';

    if (error.includes('header format')) {
      suggestion = 'Header should be: collectionName[count]{field1,field2,...}:';
    } else if (error.includes('Expected') && error.includes('records')) {
      suggestion = 'Check that the number in brackets matches the actual number of data lines';
    }

    return {
      isValid: false,
      error,
      suggestion,
    };
  }
}
