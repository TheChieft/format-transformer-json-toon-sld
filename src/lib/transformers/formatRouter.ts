import type { Format, TransformResult, Metrics, ValidationResult } from '../types';
import {
  validateJSON,
  parseJSON,
  toJSON,
} from '../parsers/jsonParser';
import {
  validateTOON,
  parseTOON,
  toTOON,
} from '../parsers/toonParser';
import {
  validateSLD,
  parseSLD,
  toSLD,
} from '../parsers/sldParser';
import { estimateTokens, getCharacterCount } from '../utils/tokenEstimator';

/**
 * Validates input based on the specified format
 */
export function validateFormat(
  input: string,
  format: Format
): ValidationResult {
  switch (format) {
    case 'JSON':
      return validateJSON(input);
    case 'TOON':
      return validateTOON(input);
    case 'SLD':
      return validateSLD(input);
    default:
      return { isValid: false, error: 'Unknown format' };
  }
}

/**
 * Main transformation function that routes between formats
 */
export function transform(
  input: string,
  fromFormat: Format,
  toFormat: Format
): TransformResult {
  // Validate input first
  const validation = validateFormat(input, fromFormat);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid input format');
  }

  // If same format, return as-is
  if (fromFormat === toFormat) {
    const length = getCharacterCount(input);
    const tokens = estimateTokens(input);
    return {
      output: input,
      metrics: {
        inputLength: length,
        outputLength: length,
        inputTokens: tokens,
        outputTokens: tokens,
        jsonLength: length,
        jsonTokens: tokens,
        savingsPercentage: 0,
      },
    };
  }

  let output: string;

  // Direct transformations
  if (fromFormat === 'JSON' && toFormat === 'TOON') {
    const parsed = parseJSON(input);
    output = toTOON(parsed);
  } else if (fromFormat === 'JSON' && toFormat === 'SLD') {
    const parsed = parseJSON(input);
    output = toSLD(parsed);
  } else if (fromFormat === 'TOON' && toFormat === 'JSON') {
    const parsed = parseTOON(input);
    output = toJSON(parsed);
  } else if (fromFormat === 'SLD' && toFormat === 'JSON') {
    const parsed = parseSLD(input);
    output = toJSON(parsed);
  }
  // Indirect transformations (via JSON)
  else if (fromFormat === 'TOON' && toFormat === 'SLD') {
    const parsed = parseTOON(input);
    output = toSLD(parsed);
  } else if (fromFormat === 'SLD' && toFormat === 'TOON') {
    const parsed = parseSLD(input);
    output = toTOON(parsed);
  } else {
    throw new Error(`Transformation from ${fromFormat} to ${toFormat} is not supported`);
  }

  // Calculate metrics
  const metrics = calculateMetrics(input, output, fromFormat);

  return { output, metrics };
}

/**
 * Calculate metrics for the transformation
 */
function calculateMetrics(
  input: string,
  output: string,
  fromFormat: Format
): Metrics {
  const inputLength = getCharacterCount(input);
  const outputLength = getCharacterCount(output);
  const inputTokens = estimateTokens(input);
  const outputTokens = estimateTokens(output);

  // Get JSON representation for comparison
  let jsonRepresentation: string;
  if (fromFormat === 'JSON') {
    jsonRepresentation = input;
  } else {
    try {
      if (fromFormat === 'TOON') {
        const parsed = parseTOON(input);
        jsonRepresentation = toJSON(parsed);
      } else {
        const parsed = parseSLD(input);
        jsonRepresentation = toJSON(parsed);
      }
    } catch {
      // Fallback if conversion fails
      jsonRepresentation = input;
    }
  }

  const jsonLength = getCharacterCount(jsonRepresentation);
  const jsonTokens = estimateTokens(jsonRepresentation);

  // Calculate savings percentage compared to JSON
  const savingsPercentage =
    jsonLength > 0
      ? Math.round(((jsonLength - outputLength) / jsonLength) * 100)
      : 0;

  return {
    inputLength,
    outputLength,
    inputTokens,
    outputTokens,
    jsonLength,
    jsonTokens,
    savingsPercentage,
  };
}
