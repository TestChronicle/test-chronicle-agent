import { createHash } from 'crypto';

/**
 * Common parsing utilities shared across framework-specific parsers
 */

/**
 * Generate a deterministic 8-character ID from a string using MD5 hash
 */
export function hashId(input: string): string {
  return createHash('md5').update(input).digest('hex').substring(0, 8);
}

/**
 * Calculate line number for a given position in content
 */
export function lineNumberAt(content: string, position: number): number {
  return content.substring(0, position).split('\n').length;
}

/**
 * Find the matching closing brace for an opening brace at openPos
 */
export function findMatchingBrace(content: string, openPos: number): number {
  let depth = 0;
  for (let i = openPos; i < content.length; i++) {
    if (content[i] === '{') {
      depth++;
    } else if (content[i] === '}') {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
  }
  return -1;
}
