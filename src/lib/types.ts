export interface ParsedData {
  collectionName: string;
  fields: string[];
  records: Record<string, string | number>[];
}

export type DataFormat = 'JSON' | 'TOON' | 'SLD';

export interface TransformationResult {
  output: string;
  inputCharCount: number;
  outputCharCount: number;
  inputTokenCount: number;
  outputTokenCount: number;
  savingsPercentage: number;
  jsonCharCount: number;
}

export interface ValidationError {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}
