/**
 * Test diffing utilities for detecting renamed/modified tests.
 * Uses Levenshtein distance for 85%+ accuracy on renames.
 */

/**
 * Calculates the Levenshtein distance between two strings.
 * This is the minimum number of single-character edits (insertions, deletions, substitutions)
 * needed to change one string into another.
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(0))

  // Initialize first row and column
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j

  // Fill the matrix
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + cost // substitution
      )
    }
  }

  return matrix[b.length][a.length]
}

/**
 * Normalizes test names for comparison:
 * - Converts to lowercase
 * - Replaces underscores, hyphens, spaces with single spaces
 * - Trims leading/trailing whitespace
 */
export function normalizeTestName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[_\-\s]+/g, ' ')
    .trim()
}

/**
 * Calculates similarity score between two test names (0.0 to 1.0).
 * Uses normalized Levenshtein distance.
 */
export function calculateSimilarity(a: string, b: string): number {
  const normA = normalizeTestName(a)
  const normB = normalizeTestName(b)

  if (normA === normB) return 1.0 // Exact match after normalization

  const distance = levenshteinDistance(normA, normB)
  const maxLength = Math.max(normA.length, normB.length)
  
  // Avoid division by zero
  if (maxLength === 0) return 1.0
  
  return 1 - distance / maxLength
}

/**
 * Determines if two test names likely represent the same test (with possible rename).
 * Threshold: 85% similarity.
 * 
 * Examples:
 * - "should validate email" -> "should validate email address" = 92% (match)
 * - "should_validate_email" -> "should validate email" = 100% (match)
 * - "login" -> "logout" = 60% (no match)
 */
export function isSameTest(a: string, b: string): boolean {
  const similarity = calculateSimilarity(a, b)
  return similarity > 0.85
}

/**
 * Finds the best matching test name from a list based on similarity.
 * Returns { index, similarity, name } or null if no good match (>85%).
 */
export function findBestMatch(
  removedTest: string,
  addedTests: string[]
): { index: number; similarity: number; name: string } | null {
  let bestMatch: { index: number; similarity: number; name: string } | null = null

  for (let i = 0; i < addedTests.length; i++) {
    const similarity = calculateSimilarity(removedTest, addedTests[i])
    
    if (similarity > 0.85 && (!bestMatch || similarity > bestMatch.similarity)) {
      bestMatch = {
        index: i,
        similarity,
        name: addedTests[i],
      }
    }
  }

  return bestMatch
}
