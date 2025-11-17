/**
 * Estimates token count for a given text string
 * 
 * This is a simplified heuristic approximation. Real tokenization depends on
 * the specific tokenizer (GPT, Claude, etc.), but this provides a reasonable estimate.
 * 
 * Algorithm:
 * 1. Split on whitespace to get words
 * 2. Count special characters and punctuation as separate tokens
 * 3. Longer words may be split into multiple tokens (rough approximation)
 */
export function estimateTokenCount(text: string): number {
  if (!text || text.trim().length === 0) {
    return 0;
  }

  let tokenCount = 0;

  // Split by whitespace to get word-like chunks
  const chunks = text.split(/\s+/).filter(chunk => chunk.length > 0);

  for (const chunk of chunks) {
    // Count special characters and punctuation as separate tokens
    const specialChars = chunk.match(/[{}\[\](),:;|]/g);
    if (specialChars) {
      tokenCount += specialChars.length;
    }

    // Remove special characters to get the core word
    const word = chunk.replace(/[{}\[\](),:;|]/g, '');
    
    if (word.length === 0) {
      continue;
    }

    // Heuristic: words longer than 4 characters might be split
    // Average English word is ~1.3 tokens in GPT tokenizers
    if (word.length <= 4) {
      tokenCount += 1;
    } else if (word.length <= 8) {
      tokenCount += 1;
    } else {
      // Longer words may be split into multiple tokens
      tokenCount += Math.ceil(word.length / 4);
    }
  }

  return tokenCount;
}

/**
 * Calculates the percentage savings between two character counts
 */
export function calculateSavings(original: number, compressed: number): number {
  if (original === 0) return 0;
  const savings = ((original - compressed) / original) * 100;
  return Math.round(savings * 10) / 10; // Round to 1 decimal place
}
