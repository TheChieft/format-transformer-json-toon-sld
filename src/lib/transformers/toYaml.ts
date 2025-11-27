import type { ParsedData } from '../types';

/**
 * Transform ParsedData to YAML format
 *
 * Note: YAML output not yet fully implemented.
 * Coming soon!
 */
export function toYAML(_data: ParsedData): string {
  throw new Error(
    '❌ YAML output not yet fully implemented.\n\n' +
      '💡 Try using JSON or TOON format instead.\n' +
      '   YAML support coming soon!'
  );
}
