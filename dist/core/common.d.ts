/**
 * Common parsing utilities shared across framework-specific parsers
 */
/**
 * Generate a deterministic 8-character ID from a string using MD5 hash
 */
export declare function hashId(input: string): string;
/**
 * Calculate line number for a given position in content
 */
export declare function lineNumberAt(content: string, position: number): number;
/**
 * Find the matching closing brace for an opening brace at openPos
 */
export declare function findMatchingBrace(content: string, openPos: number): number;
//# sourceMappingURL=common.d.ts.map