import path from 'path';
import { TestCase, SpecFile } from '../../types';
import { hashId, lineNumberAt, findMatchingBrace } from './common';

// ─── Regex patterns ───────────────────────────────────────────────────────────
//
// Vitest uses Mocha-style describe/test and it/test syntax.
// Patterns handled: describe(), test(), it()
// Modifiers: .skip, .only, .todo

const DESCRIBE_RE = /describe\s*(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;

const TEST_RE = /(?:^|[ \t]+)(?:test|it)\s*(?:\.(?:skip|only|todo))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;

// ─── Public API ───────────────────────────────────────────────────────────────

export function parseVitestSpec(
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

    // Check if this is a .todo() test and mark it
    const isTodo = /\.todo\s*\(/.test(content.substring(matchIndex, matchIndex + 50));
    const tags = isTodo ? [{ name: '@todo' }] : [];

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
    framework: 'vitest',
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
