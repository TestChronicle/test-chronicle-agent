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
/**
 * Describe block metadata extracted from test file
 */
export interface DescribeBlock {
    name: string;
    /** Index of the opening brace of the callback */
    start: number;
    /** Index of the matching closing brace */
    end: number;
}
/**
 * Find all describe blocks in content using provided regex pattern.
 * Works for any framework (Playwright, Cypress, Vitest) by accepting the regex pattern.
 */
export declare function findDescribeBlocks(content: string, describePattern: RegExp): DescribeBlock[];
/**
 * Finds the innermost describe block that contains `index`.
 * Returns undefined when the test is at the top level.
 */
export declare function resolveParentDescribe(blocks: DescribeBlock[], index: number): string | undefined;
//# sourceMappingURL=common.d.ts.map