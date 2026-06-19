import path from 'path';
import { TestCase, SpecFile } from '../../types';
import {
    hashId,
    lineNumberAt,
    findDescribeBlocks,
    resolveParentDescribe,
    DescribeBlock,
    findMatchingBrace,
} from './common';
import { detectParameterizedLoop, isLikelyParameterizedTest } from './parameterized';
import { IFrameworkParser } from '../base';

const DESCRIBE_RE = /describe(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;
const DESCRIBE_EACH_RE = /describe(?:\.(?:skip|only))?\.each\s*(?:\([\s\S]*?\)|`[\s\S]*?`)\s*\(\s*(['"`])([\s\S]*?)\1/g;

const TEST_RE = /(?:^|[ \t]+)(?:test|it)(?:\.(?:concurrent|skip|only|failing|todo))*\s*\(\s*(['"`])([\s\S]*?)\1/gm;
const TEST_EACH_RE = /(?:^|[ \t]+)(?:test|it)(?:\.(?:concurrent|skip|only|failing))*\.each\s*(?:\([\s\S]*?\)|`[\s\S]*?`)\s*\(\s*(['"`])([\s\S]*?)\1/gm;

interface JestMatch {
    name: string;
    index: number;
    raw: string;
    parameterized: boolean;
}

export function parseJestSpec(filePath: string, content: string, projectRoot: string): SpecFile {
    const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
    const describeBlocks = findJestDescribeBlocks(content);
    const tests: TestCase[] = [];

    for (const match of findJestTests(content)) {
        const parentDescribe = resolveParentDescribe(describeBlocks, match.index);
        const tags = [];

        if (/\.todo\s*\(/.test(match.raw)) {
            tags.push({ name: '@todo' });
        }

        const isParameterized =
            match.parameterized || detectParameterizedLoop(content, match.index) || isLikelyParameterizedTest(match.name);
        if (isParameterized) {
            tags.push({ name: '@parameterized' });
        }

        const id = hashId(`${relativePath}::${parentDescribe ?? ''}::${match.name}`);

        tests.push({
            id,
            name: match.name,
            fullName: parentDescribe ? `${parentDescribe} > ${match.name}` : match.name,
            describe: parentDescribe,
            tags,
            line: lineNumberAt(content, match.index),
        });
    }

    return {
        id: hashId(relativePath),
        path: relativePath,
        name: path.basename(filePath),
        framework: 'jest',
        tests,
        testCount: tests.length,
        lastModified: new Date().toISOString(),
    };
}

export function extractTestNames(content: string): string[] {
    const describeBlocks = findJestDescribeBlocks(content);
    return findJestTests(content).map((test) => {
        const parentDescribe = resolveParentDescribe(describeBlocks, test.index);
        return parentDescribe ? `${parentDescribe} > ${test.name}` : test.name;
    });
}

function findJestDescribeBlocks(content: string): DescribeBlock[] {
    return [...findDescribeBlocks(content, DESCRIBE_RE), ...findDescribeEachBlocks(content)].sort(
        (a, b) => a.start - b.start,
    );
}

function findJestTests(content: string): JestMatch[] {
    const matches: JestMatch[] = [];
    collectMatches(content, TEST_RE, false, matches);
    collectMatches(content, TEST_EACH_RE, true, matches);
    return matches.sort((a, b) => a.index - b.index);
}

function collectMatches(content: string, regex: RegExp, parameterized: boolean, matches: JestMatch[]): void {
    let match: RegExpExecArray | null;
    regex.lastIndex = 0;

    while ((match = regex.exec(content)) !== null) {
        matches.push({
            name: match[2],
            index: match.index,
            raw: match[0],
            parameterized,
        });
    }
}

function findDescribeEachBlocks(content: string): DescribeBlock[] {
    const blocks: DescribeBlock[] = [];
    let match: RegExpExecArray | null;
    DESCRIBE_EACH_RE.lastIndex = 0;

    while ((match = DESCRIBE_EACH_RE.exec(content)) !== null) {
        const matchEnd = match.index + match[0].length;
        const afterMatch = content.substring(matchEnd);
        const arrowIndex = afterMatch.indexOf('=>');
        const braceOffset = arrowIndex === -1 ? afterMatch.indexOf('{') : afterMatch.indexOf('{', arrowIndex);
        if (braceOffset === -1) continue;

        const braceStart = matchEnd + braceOffset;
        const braceEnd = findMatchingBrace(content, braceStart);
        if (braceEnd !== -1) {
            blocks.push({ name: match[2], start: braceStart, end: braceEnd });
        }
    }

    return blocks;
}

export const jestParser: IFrameworkParser = {
    parseFile: parseJestSpec,
    extractTestNames,
    filePatterns: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
    ],
    supportedFeatures: {
        tags: true,
        describes: true,
        parameterized: true,
        lineNumbers: true,
        asyncTests: true,
    },
};
