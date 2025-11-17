export type Format = 'JSON' | 'TOON' | 'SLD';

export interface TransformResult {
  output: string;
  metrics: Metrics;
}

export interface Metrics {
  inputLength: number;
  outputLength: number;
  inputTokens: number;
  outputTokens: number;
  jsonLength: number;
  jsonTokens: number;
  savingsPercentage: number;
}

export interface ParsedData {
  collectionName: string;
  items: Record<string, unknown>[];
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
