import path from 'path';
import { TestCase, SpecFile } from '../../types';
import { hashId } from './common';
import { IFrameworkParser } from '../base';

interface ClassScope {
    name: string;
    indent: number;
}

export function parsePytestSpec(filePath: string, content: string, projectRoot: string): SpecFile {
    const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
    const tests: TestCase[] = [];
    const lines = content.split('\n');
    const classStack: ClassScope[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const indent = leadingWhitespace(line);
        while (classStack.length > 0 && indent <= classStack[classStack.length - 1].indent) {
            classStack.pop();
        }

        const classMatch = /^\s*class\s+([A-Za-z_]\w*)\b/.exec(line);
        if (classMatch) {
            classStack.push({ name: classMatch[1], indent });
            continue;
        }

        const testMatch = /^\s*(?:async\s+)?def\s+(test_[A-Za-z0-9_]+)\s*\(/.exec(line);
        if (!testMatch) continue;

        const testName = testMatch[1];
        const parentClass = classStack[classStack.length - 1]?.name;
        const decoratorBlock = getDecoratorBlock(lines, i);
        const tags = extractPytestTags(decoratorBlock);

        if (/@pytest\.mark\.parametrize\b/.test(decoratorBlock) && !tags.some((t) => t.name === '@parameterized')) {
            tags.push({ name: '@parameterized' });
        }

        const id = hashId(`${relativePath}::${parentClass ?? ''}::${testName}`);

        tests.push({
            id,
            name: testName,
            fullName: parentClass ? `${parentClass} > ${testName}` : testName,
            describe: parentClass,
            tags,
            line: i + 1,
        });
    }

    return {
        id: hashId(relativePath),
        path: relativePath,
        name: path.basename(filePath),
        framework: 'pytest',
        tests,
        testCount: tests.length,
        lastModified: new Date().toISOString(),
    };
}

export function extractTestNames(content: string): string[] {
    const spec = parsePytestSpec('/__pytest__/test_sample.py', content, '/__pytest__');
    return spec.tests.map((test) => test.fullName);
}

function leadingWhitespace(line: string): number {
    return line.match(/^\s*/)?.[0].length ?? 0;
}

function getDecoratorBlock(lines: string[], functionLine: number): string {
    const contiguous: string[] = [];

    for (let i = functionLine - 1; i >= 0; i--) {
        const trimmed = lines[i].trim();
        if (!trimmed) break;
        contiguous.unshift(lines[i]);
    }

    const firstDecorator = contiguous.findIndex((line) => line.trim().startsWith('@'));
    return firstDecorator === -1 ? '' : contiguous.slice(firstDecorator).join('\n');
}

function extractPytestTags(decoratorBlock: string): Array<{ name: string }> {
    const tags: Array<{ name: string }> = [];
    const seen = new Set<string>();
    const markerRe = /@pytest\.mark\.([A-Za-z_]\w*)/g;

    let match: RegExpExecArray | null;
    while ((match = markerRe.exec(decoratorBlock)) !== null) {
        const marker = match[1];
        if (marker === 'parametrize') continue;
        if (seen.has(marker)) continue;
        seen.add(marker);
        tags.push({ name: marker });
    }

    return tags;
}

export const pytestParser: IFrameworkParser = {
    parseFile: parsePytestSpec,
    extractTestNames,
    filePatterns: ['**/test_*.py', '**/*_test.py'],
    supportedFeatures: {
        tags: true,
        describes: true,
        parameterized: true,
        lineNumbers: true,
        asyncTests: true,
    },
};
