/**
 * Test diffing utilities for detecting renamed/modified tests.
 * Uses Levenshtein distance for 85%+ accuracy on renames.
 */
/**
 * Calculates the Levenshtein distance between two strings.
 * This is the minimum number of single-character edits (insertions, deletions, substitutions)
 * needed to change one string into another.
 */
export declare function levenshteinDistance(a: string, b: string): number;
/**
 * Normalizes test names for comparison:
 * - Converts to lowercase
 * - Replaces underscores, hyphens, spaces with single spaces
 * - Trims leading/trailing whitespace
 */
export declare function normalizeTestName(name: string): string;
/**
 * Calculates similarity score between two test names (0.0 to 1.0).
 * Uses normalized Levenshtein distance.
 */
export declare function calculateSimilarity(a: string, b: string): number;
/**
 * Determines if two test names likely represent the same test (with possible rename).
 * Threshold: 85% similarity.
 *
 * Examples:
 * - "should validate email" -> "should validate email address" = 92% (match)
 * - "should_validate_email" -> "should validate email" = 100% (match)
 * - "login" -> "logout" = 60% (no match)
 */
export declare function isSameTest(a: string, b: string): boolean;
/**
 * Finds the best matching test name from a list based on similarity.
 * Returns { index, similarity, name } or null if no good match (>85%).
 */
export declare function findBestMatch(removedTest: string, addedTests: string[]): {
    index: number;
    similarity: number;
    name: string;
} | null;
//# sourceMappingURL=testDiff.d.ts.map