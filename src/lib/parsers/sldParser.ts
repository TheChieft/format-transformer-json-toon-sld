import { ParsedData, ValidationError } from '../types';

/**
 * Parses SLD (Single Line Data) format
 * Format: collectionName|count|field1,field2,...|value1,value2,...;value1,value2,...
 */
export function parseSLD(input: string): ParsedData {
  const trimmed = input.trim();
  
  if (!trimmed) {
    throw new Error('Input is empty');
  }

  const parts = trimmed.split('|');
  
  if (parts.length !== 4) {
    throw new Error('Invalid SLD format. Expected: collectionName|count|fields|records');
  }

  const collectionName = parts[0].trim();
  const count = parseInt(parts[1].trim(), 10);
  const fieldsStr = parts[2].trim();
  const recordsStr = parts[3].trim();

  if (!collectionName) {
    throw new Error('Collection name cannot be empty');
  }

  if (isNaN(count) || count < 0) {
    throw new Error('Count must be a valid non-negative number');
  }

  const fields = fieldsStr.split(',').map(f => f.trim());
  
  if (fields.length === 0) {
    throw new Error('SLD must contain at least one field');
  }

  const recordLines = recordsStr.split(';').map(r => r.trim()).filter(r => r.length > 0);
  
  if (recordLines.length !== count) {
    throw new Error(`Expected ${count} records, but found ${recordLines.length}`);
  }

  const records: Record<string, string | number>[] = [];

  for (let i = 0; i < recordLines.length; i++) {
    const values = recordLines[i].split(',').map(v => v.trim());

    if (values.length !== fields.length) {
      throw new Error(`Record ${i + 1}: Expected ${fields.length} values, found ${values.length}`);
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
 * Validates SLD input
 */
export function validateSLD(input: string): ValidationError {
  try {
    parseSLD(input);
    return { isValid: true };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unknown error';
    let suggestion = '';

    if (error.includes('Expected: collectionName')) {
      suggestion = 'Format should be: collectionName|count|field1,field2|val1,val2;val3,val4';
    } else if (error.includes('Expected') && error.includes('records')) {
      suggestion = 'Check that the count matches the number of semicolon-separated records';
    }

    return {
      isValid: false,
      error,
      suggestion,
    };
  }
}
