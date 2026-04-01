import path from 'path';
import { TestCase, SpecFile } from '../../types';
import { hashId, lineNumberAt, findDescribeBlocks, resolveParentDescribe } from './common';

const DESCRIBE_RE = /describe\s*(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;

const TEST_RE = /(?:^|[ \t]+)(?:test|it)\s*(?:\.(?:skip|only|todo))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;

// ─── Public API ───────────────────────────────────────────────────────────────

export function parseVitestSpec(filePath: string, content: string, projectRoot: string): SpecFile {
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
