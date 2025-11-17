import { ParsedData } from '../types';

/**
 * Transforms ParsedData to TOON format string
 */
export function dataToTOON(data: ParsedData): string {
  const { collectionName, fields, records } = data;
  
  // Header: collectionName[count]{field1,field2,...}:
  const header = `${collectionName}[${records.length}]{${fields.join(',')}}:`;
  
  // Data lines
  const dataLines = records.map(record => {
    return fields.map(field => {
      const value = record[field];
      return value !== undefined ? String(value) : '';
    }).join(',');
  });
  
  return [header, ...dataLines].join('\n');
}
