import { ParsedData } from '../types';

/**
 * Transforms ParsedData to JSON string
 */
export function dataToJSON(data: ParsedData): string {
  const obj = {
    [data.collectionName]: data.records,
  };
  return JSON.stringify(obj, null, 2);
}
