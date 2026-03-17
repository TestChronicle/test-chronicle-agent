import path from 'path';
import { TestCase, TestTag, SpecFile } from '../../types';
import { hashId, lineNumberAt, findDescribeBlocks, resolveParentDescribe } from './common';
import { extractParameterizedDataFromEach, generateParameterizedTestName } from './parameterized';

// ─── Regex patterns ───────────────────────────────────────────────────────────
//
// These patterns are intentionally permissive to handle common Playwright
// variants: test.describe.serial, test.only, test.skip, test.fixme, etc.

const DESCRIBE_RE = /test\.describe(?:\.(?:serial|parallel|skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;

const TEST_RE = /(?:^|[ \t]+)test(?:\.(?:skip|only|fixme|slow))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;

// Matches: { tag: '@critical' }  or  { tag: ['@critical', '@smoke'] }
const INLINE_TAG_RE = /\{\s*tag\s*:\s*(?:(['"`])([@\w\-/]+)\2|\[([^\]]+)\])/g;

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

        // Check if this is a parameterized test (test.each())
        const paramData = extractParameterizedDataFromEach(content);
        if (paramData?.hasParameters) {
            tags.push({ name: '@parameterized' });

            // If we have a parameter count, expand to individual test cases
            if (paramData.count > 0) {
                for (let i = 0; i < paramData.count; i++) {
                    const id = hashId(`${relativePath}::${parentDescribe ?? ''}::${testName}::${i}`);
                    const expandedName = generateParameterizedTestName(testName, i, paramData.count);

                    tests.push({
                        id,
                        name: expandedName,
                        fullName: parentDescribe ? `${parentDescribe} > ${expandedName}` : expandedName,
                        describe: parentDescribe,
                        tags,
                        line,
                    });
                }
                continue; // Skip adding the base test
            }
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
