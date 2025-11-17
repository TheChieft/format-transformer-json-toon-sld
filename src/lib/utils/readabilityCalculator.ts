/**
 * Calculates a human readability score for data formats
 * 
 * The score is based on multiple factors:
 * - Structure clarity (indentation, newlines, spacing)
 * - Character density (how packed the information is)
 * - Symbol-to-text ratio (punctuation vs actual content)
 * - Average line length
 * 
 * Returns a score from 0-100 where:
 * - 90-100: Excellent readability (well-formatted JSON)
 * - 70-89: Good readability (compact but structured)
 * - 50-69: Moderate readability (TOON-like formats)
 * - 30-49: Low readability (SLD-like formats)
 * - 0-29: Very low readability (minified/compressed)
 */

export interface ReadabilityMetrics {
  score: number;
  rating: 'Excellent' | 'Good' | 'Moderate' | 'Low' | 'Very Low';
  factors: {
    structure: number;
    density: number;
    symbolRatio: number;
    lineLength: number;
  };
}

export function calculateReadability(text: string): ReadabilityMetrics {
  if (!text || text.trim().length === 0) {
    return {
      score: 0,
      rating: 'Very Low',
      factors: { structure: 0, density: 0, symbolRatio: 0, lineLength: 0 },
    };
  }

  // Factor 1: Structure clarity (0-25 points)
  // Based on newlines, indentation, and whitespace
  const lines = text.split('\n');
  const avgIndentation = lines.reduce((sum, line) => {
    const leadingSpaces = line.match(/^[ \t]*/)?.[0].length || 0;
    return sum + leadingSpaces;
  }, 0) / lines.length;
  
  const hasStructure = lines.length > 1;
  const structureScore = Math.min(25, (hasStructure ? 15 : 0) + Math.min(10, avgIndentation));

  // Factor 2: Character density (0-25 points)
  // Lower density = more whitespace = more readable
  const totalChars = text.length;
  const nonWhitespaceChars = text.replace(/\s/g, '').length;
  const density = nonWhitespaceChars / totalChars;
  const densityScore = Math.max(0, 25 - (density * 30)); // Inverse: lower density = higher score

  // Factor 3: Symbol-to-text ratio (0-25 points)
  // Too many symbols make it harder to read
  const symbols = (text.match(/[{}[\]();:,|]/g) || []).length;
  const alphanumeric = (text.match(/[a-zA-Z0-9]/g) || []).length;
  const symbolRatio = alphanumeric > 0 ? symbols / alphanumeric : 1;
  const symbolScore = Math.max(0, 25 - (symbolRatio * 40));

  // Factor 4: Line length (0-25 points)
  // Moderate line lengths are most readable
  const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
  const idealLength = 80;
  const lengthDeviation = Math.abs(avgLineLength - idealLength) / idealLength;
  const lineLengthScore = Math.max(0, 25 - (lengthDeviation * 25));

  // Calculate final score
  const score = Math.round(structureScore + densityScore + symbolScore + lineLengthScore);

  // Determine rating
  let rating: ReadabilityMetrics['rating'];
  if (score >= 90) rating = 'Excellent';
  else if (score >= 70) rating = 'Good';
  else if (score >= 50) rating = 'Moderate';
  else if (score >= 30) rating = 'Low';
  else rating = 'Very Low';

  return {
    score,
    rating,
    factors: {
      structure: Math.round(structureScore),
      density: Math.round(densityScore),
      symbolRatio: Math.round(symbolScore),
      lineLength: Math.round(lineLengthScore),
    },
  };
}

/**
 * Get a color class for the readability score
 */
export function getReadabilityColor(score: number): string {
  if (score >= 90) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 70) return 'text-green-600 dark:text-green-400';
  if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
  if (score >= 30) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}

/**
 * Get a background color class for the readability score
 */
export function getReadabilityBgColor(score: number): string {
  if (score >= 90) return 'bg-emerald-100 dark:bg-emerald-900/30';
  if (score >= 70) return 'bg-green-100 dark:bg-green-900/30';
  if (score >= 50) return 'bg-yellow-100 dark:bg-yellow-900/30';
  if (score >= 30) return 'bg-orange-100 dark:bg-orange-900/30';
  return 'bg-red-100 dark:bg-red-900/30';
}
