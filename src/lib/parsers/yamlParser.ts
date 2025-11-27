import type { ParsedData } from '../types';

/**
 * Parse YAML to internal ParsedData structure
 * 
 * Note: This is a VERY simplified YAML parser. 
 * It expects JSON-like structure with YAML syntax.
 * For full YAML support, use js-yaml library.
 */
export function parseYAML(_content: string): ParsedData {
  throw new Error(
    '❌ YAML parsing not yet fully implemented.\n\n' +
    '💡 Try using JSON format instead, or wait for js-yaml integration.\n' +
    '   YAML support coming soon!'
  );
}
