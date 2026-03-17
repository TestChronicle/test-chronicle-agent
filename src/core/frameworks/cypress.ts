import path from 'path';
import { TestCase, SpecFile } from '../../types';
import { hashId, lineNumberAt, findDescribeBlocks, resolveParentDescribe } from './common';
import { extractParameterizedDataFromForEach, generateParameterizedTestName } from './parameterized';

const DESCRIBE_RE = /describe\s*\(\s*(['"`])([\s\S]*?)\1/g;

const TEST_RE = /(?:^|[ \t]+)(?:it|specify|test)\s*(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;

export function parseCypressSpec(filePath: string, content: string, projectRoot: string): SpecFile {
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

        // Check if this is a parameterized test (forEach loop)
        const paramData = extractParameterizedDataFromForEach(content, testName);
        if (paramData?.hasParameters && paramData.count > 0) {
            // Expand to individual test cases
            for (let i = 0; i < paramData.count; i++) {
                const id = hashId(`${relativePath}::${parentDescribe ?? ''}::${testName}::${i}`);
                const expandedName = generateParameterizedTestName(testName, i, paramData.count);

                tests.push({
                    id,
                    name: expandedName,
                    fullName: parentDescribe ? `${parentDescribe} > ${expandedName}` : expandedName,
                    describe: parentDescribe,
                    tags: [{ name: '@parameterized' }],
                    line,
                });
            }
            continue; // Skip adding the base test
        }

        const id = hashId(`${relativePath}::${parentDescribe ?? ''}::${testName}`);

        tests.push({
            id,
            name: testName,
            fullName: parentDescribe ? `${parentDescribe} > ${testName}` : testName,
            describe: parentDescribe,
            tags: [],
            line,
        });
    }

    return {
        id: hashId(relativePath),
        path: relativePath,
        name: path.basename(filePath),
        framework: 'cypress',
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
