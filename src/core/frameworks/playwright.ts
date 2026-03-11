import path from 'path';
import { TestCase, TestTag, SpecFile } from '../../types';
import { hashId, lineNumberAt, findMatchingBrace } from './common';

// ─── Regex patterns ───────────────────────────────────────────────────────────
//
// These patterns are intentionally permissive to handle common Playwright
// variants: test.describe.serial, test.only, test.skip, test.fixme, etc.

const DESCRIBE_RE =
  /test\.describe(?:\.(?:serial|parallel|skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;

const TEST_RE = /(?:^|[ \t]+)test(?:\.(?:skip|only|fixme|slow))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;

// Matches: { tag: '@critical' }  or  { tag: ['@critical', '@smoke'] }
const INLINE_TAG_RE = /\{\s*tag\s*:\s*(?:(['"`])([@\w\-/]+)\2|\[([^\]]+)\])/g;

// ─── Public API ───────────────────────────────────────────────────────────────

export function parsePlaywrightSpec(
  filePath: string,
  content: string,
  projectRoot: string
): SpecFile {
  const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
  const describeBlocks = findDescribeBlocks(content);
  const tests: TestCase[] = [];

  let match: RegExpExecArray | null;
  TEST_RE.lastIndex = 0;

  while ((match = TEST_RE.exec(content)) !== null) {
    const testName = match[2];
    const matchIndex = match.index;
    const line = lineNumberAt(content, matchIndex);

    const parentDescribe = resolveParentDescribe(describeBlocks, matchIndex);
    const tags = extractInlineTags(content, matchIndex);
    
    // Check if this is a parameterized test (test.each())
    const isParameterized = isParameterizedTest(content, matchIndex);
    if (isParameterized) {
      tags.push({ name: '@parameterized' });
    }

    const id = hashId(`${relativePath}::${parentDescribe ?? ''}::${testName}`);

    tests.push({
      id,
      name: testName,
      fullName: parentDescribe ? `${parentDescribe} > ${testName}` : testName,
      describe: parentDescribe,
      tags,
      line,
    });
  }

  return {
    id: hashId(relativePath),
    path: relativePath,
    name: path.basename(filePath),
    framework: 'playwright',
    tests,
    testCount: tests.length,
    lastModified: new Date().toISOString(),
  };
}

/** Extracts only the test names from content without building a full SpecFile. */
export function extractTestNames(content: string): string[] {
  const names: string[] = [];
  const describeBlocks = findDescribeBlocks(content);

  let match: RegExpExecArray | null;
  TEST_RE.lastIndex = 0;

  while ((match = TEST_RE.exec(content)) !== null) {
    const testName = match[2];
    const parentDescribe = resolveParentDescribe(describeBlocks, match.index);
    names.push(parentDescribe ? `${parentDescribe} > ${testName}` : testName);
  }

  return names;
}

// ─── Describe block tracking ──────────────────────────────────────────────────

interface DescribeBlock {
  name: string;
  /** Index of the opening brace of the callback */
  start: number;
  /** Index of the matching closing brace */
  end: number;
}

function findDescribeBlocks(content: string): DescribeBlock[] {
  const blocks: DescribeBlock[] = [];

  let match: RegExpExecArray | null;
  DESCRIBE_RE.lastIndex = 0;

  while ((match = DESCRIBE_RE.exec(content)) !== null) {
    const matchEnd = match.index + match[0].length;
    const afterMatch = content.substring(matchEnd);

    // Walk forward to find the opening brace of the callback arrow/function
    const braceOffset = afterMatch.indexOf('{');
    if (braceOffset === -1) continue;

    const braceStart = matchEnd + braceOffset;
    const braceEnd = findMatchingBrace(content, braceStart);

    if (braceEnd !== -1) {
      blocks.push({ name: match[2], start: braceStart, end: braceEnd });
    }
  }

  return blocks;
}

/**
 * Finds the innermost describe block that contains `index`.
 * Returns undefined when the test is at the top level.
 */
function resolveParentDescribe(blocks: DescribeBlock[], index: number): string | undefined {
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

// ─── Tag extraction ───────────────────────────────────────────────────────────

/**
 * Looks ahead from `testIndex` for an inline `{ tag: ... }` options object.
 * Only scans the next 200 characters to avoid false positives.
 */
function extractInlineTags(content: string, testIndex: number): TestTag[] {
  const window = content.substring(testIndex, testIndex + 300);
  const tags: TestTag[] = [];

  let match: RegExpExecArray | null;
  INLINE_TAG_RE.lastIndex = 0;

  while ((match = INLINE_TAG_RE.exec(window)) !== null) {
    if (match[2]) {
      // Single tag: { tag: '@critical' }
      tags.push({ name: match[2] });
    } else if (match[3]) {
      // Array of tags: { tag: ['@critical', '@smoke'] }
      const tagList = match[3]
        .split(',')
        .map((t) => t.trim().replace(/^['"`]|['"`]$/g, ''))
        .filter((t) => t.length > 0);
      tagList.forEach((t) => tags.push({ name: t }));
    }
  }

  return tags;
}

/**
 * Check if this test matches the `test.each(...)` pattern
 */
function isParameterizedTest(content: string, testIndex: number): boolean {
  const window = content.substring(Math.max(0, testIndex - 50), testIndex);
  return /\.each\s*\(/.test(window);
}
