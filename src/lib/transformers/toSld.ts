import { ParsedData } from '../types';

/**
 * Transforms ParsedData to SLD (Single Line Data) format string
 */
export function dataToSLD(data: ParsedData): string {
  const { collectionName, fields, records } = data;
  
  // Format: collectionName|count|field1,field2,...|value1,value2,...;value1,value2,...
  const fieldsStr = fields.join(',');
  
  const recordsStr = records.map(record => {
    return fields.map(field => {
      const value = record[field];
      return value !== undefined ? String(value) : '';
    }).join(',');
  }).join(';');
  
  return `${collectionName}|${records.length}|${fieldsStr}|${recordsStr}`;
}
