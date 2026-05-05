import path from 'path';
import { TestCase, TestTag, SpecFile } from '../../types';
import { hashId, lineNumberAt, findDescribeBlocks, resolveParentDescribe } from './common';
import { detectParameterizedLoop, isLikelyParameterizedTest } from './parameterized';
import { IFrameworkParser } from '../base';

// ─── Regex patterns ───────────────────────────────────────────────────────────
//
// These patterns are intentionally permissive to handle common Playwright
// variants: test.describe.serial, test.only, test.skip, test.fixme, etc.

const DESCRIBE_RE = /test\.describe(?:\.(?:serial|parallel|skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;

const TEST_RE = /(?:^|[ \t]+)test(?:\.(?:skip|only|fixme|slow))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;

// Matches: { tag: '@critical' }  or  { tag: ['@critical', '@smoke'] }
const INLINE_TAG_RE = /\{\s*tag\s*:\s*(?:(['"`])([@\w\-/]+)\1|\[([^\]]+)\])/g;

// How many characters ahead of a test() call to scan for an inline { tag: ... } object.
const TAG_SEARCH_WINDOW_CHARS = 300;

// ─── Public API ───────────────────────────────────────────────────────────────

export function parsePlaywrightSpec(filePath: string, content: string, projectRoot: string): SpecFile {
    const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
    const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE);
    const tests: TestCase[] = [];

    let match: RegExpExecArray | null;
    TEST_RE.lastIndex = 0;

    while ((match = TEST_RE.exec(content)) !== null) {
        const testName = match[2];
        const matchIndex = match.index;
        const line = lineNumberAt(content, matchIndex);

        const parentDescribe = resolveParentDescribe(describeBlocks, matchIndex);
        const tags = extractInlineTags(content, matchIndex);

        const isParameterized = detectParameterizedLoop(content, matchIndex) || isLikelyParameterizedTest(testName);
        if (isParameterized && !tags.some((t) => t.name === '@parameterized')) {
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
    const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE);

    let match: RegExpExecArray | null;
    TEST_RE.lastIndex = 0;

    while ((match = TEST_RE.exec(content)) !== null) {
        const testName = match[2];
        const parentDescribe = resolveParentDescribe(describeBlocks, match.index);
        names.push(parentDescribe ? `${parentDescribe} > ${testName}` : testName);
    }

    return names;
}

// ─── Tag extraction ───────────────────────────────────────────────────────────

/**
 * Looks ahead from `testIndex` for an inline `{ tag: ... }` options object.
 * Only scans the next TAG_SEARCH_WINDOW_CHARS characters to avoid false positives.
 */
function extractInlineTags(content: string, testIndex: number): TestTag[] {
    const window = content.substring(testIndex, testIndex + TAG_SEARCH_WINDOW_CHARS);
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

export const playwrightParser: IFrameworkParser = {
    parseFile: parsePlaywrightSpec,
    extractTestNames,
    filePatterns: ['**/*.spec.ts', '**/*.spec.js', '**/*.spec.mjs'],
    supportedFeatures: {
        tags: true,
        describes: true,
        parameterized: true,
        lineNumbers: true,
        asyncTests: true,
    },
};
