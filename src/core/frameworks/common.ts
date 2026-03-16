import { createHash } from 'crypto';

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
export function findDescribeBlocks(
  content: string,
  describePattern: RegExp
): DescribeBlock[] {
  const blocks: DescribeBlock[] = [];

  let match: RegExpExecArray | null;
  describePattern.lastIndex = 0;

  while ((match = describePattern.exec(content)) !== null) {
    const matchEnd = match.index + match[0].length;
    const afterMatch = content.substring(matchEnd);

    // Walk forward to find the opening brace of the callback arrow/function
    const braceOffset = afterMatch.indexOf('{');
    if (braceOffset === -1) continue;

    const braceStart = matchEnd + braceOffset;
    const braceEnd = findMatchingBrace(content, braceStart);

    if (braceEnd !== -1) {
      blocks.push({ name: match[2] || match[1], start: braceStart, end: braceEnd });
    }
  }

  return blocks;
}

/**
 * Finds the innermost describe block that contains `index`.
 * Returns undefined when the test is at the top level.
 */
export function resolveParentDescribe(
  blocks: DescribeBlock[],
  index: number
): string | undefined {
  let innermost: DescribeBlock | undefined;

  for (const block of blocks) {
    if (index > block.start && index < block.end) {
      if (!innermost || block.start > innermost.start) {
        innermost = block;
      }
    }
  }

  return innermost?.name;
}
