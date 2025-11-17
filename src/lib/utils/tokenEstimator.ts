/**
 * Token Estimator
 * 
 * Provides a simple heuristic-based token count estimation.
 * This is a simplified approximation and not as accurate as actual tokenizers like tiktoken.
 * 
 * Method:
 * - Split by whitespace and common separators
 * - Count alphanumeric sequences as tokens
 * - Count punctuation and special characters as tokens
 * - Adjust for common patterns
 */

export function estimateTokens(text: string): number {
  if (!text) return 0;

  let tokenCount = 0;

  // Split by whitespace
  const words = text.split(/\s+/).filter((word) => word.length > 0);

  for (const word of words) {
    // Count alphanumeric sequences
    const alphanumeric = word.match(/[a-zA-Z0-9]+/g) || [];
    tokenCount += alphanumeric.length;

    // Count special characters and punctuation as separate tokens
    const specialChars = word.match(/[^a-zA-Z0-9\s]/g) || [];
    tokenCount += specialChars.length;
  }

  // Additional tokens for structural elements in JSON/TOON/SLD
  const structuralChars = text.match(/[{}[\]:,|;]/g) || [];
  
  // Avoid double counting by subtracting what we already counted in words
  // and adding a small factor for structural importance
  const additionalStructural = Math.floor(structuralChars.length * 0.5);
  tokenCount += additionalStructural;

  return tokenCount;
}

/**
 * Calculate character length
 */
export function getCharacterCount(text: string): number {
  return text.length;
}
