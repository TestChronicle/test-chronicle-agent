import { describe, it, expect } from 'vitest';
import {
    hashId,
    lineNumberAt,
    findMatchingBrace,
    findDescribeBlocks,
    resolveParentDescribe,
} from '../../src/core/frameworks/common';
import { COMMON } from '../fixtures';

describe('hashId', () => {
    it('always produces exactly 8 hex characters', () => {
        expect(hashId('hello')).toMatch(/^[0-9a-f]{8}$/);
        expect(hashId('')).toMatch(/^[0-9a-f]{8}$/);
        expect(hashId('some/path::describe::test name')).toMatch(/^[0-9a-f]{8}$/);
    });

    it('is deterministic — same input yields same output', () => {
        expect(hashId('foo')).toBe(hashId('foo'));
        expect(hashId('test::login flow')).toBe(hashId('test::login flow'));
    });

    it('produces different output for different inputs', () => {
        expect(hashId('foo')).not.toBe(hashId('bar'));
    });
});

describe('lineNumberAt', () => {
    it('returns 1 for position 0', () => {
        expect(lineNumberAt('first line\nsecond line', 0)).toBe(1);
    });

    it('increments line number after each newline', () => {
        const blocks = COMMON.lineNumberAt;
        expect(lineNumberAt(blocks, 9)).toBe(2); // start of "line two"
        expect(lineNumberAt(blocks, 18)).toBe(3); // start of "line three"
    });

    it('returns 1 for a single-line string at any position', () => {
        expect(lineNumberAt('abcdef', 3)).toBe(1);
    });
});

describe('findMatchingBrace', () => {
    it('finds the closing brace of a simple block', () => {
        expect(findMatchingBrace(COMMON.simpleBrace, 0)).toBe(8);
    });

    it('handles nested braces correctly', () => {
        expect(findMatchingBrace(COMMON.nestedBrace, 0)).toBe(22);
    });

    it('returns -1 when there is no matching closing brace', () => {
        expect(findMatchingBrace(COMMON.unclosedBrace, 0)).toBe(-1);
    });

    it('starts scanning from openPos, not from the beginning', () => {
        expect(findMatchingBrace(COMMON.prefixBrace, 7)).toBe(15);
    });
});

describe('findDescribeBlocks', () => {
    const DESCRIBE_RE = /test\.describe\s*\(\s*(['"`])([\s\S]*?)\1/g;

    it('extracts describe block name and brace positions', () => {
        const blocks = findDescribeBlocks(COMMON.describeWithTest, DESCRIBE_RE);
        expect(blocks).toHaveLength(1);
        expect(blocks[0].name).toBe('Login');
        expect(blocks[0].start).toBeLessThan(blocks[0].end);
    });

    it('finds multiple describe blocks', () => {
        const blocks = findDescribeBlocks(COMMON.twoDescribes, DESCRIBE_RE);
        expect(blocks).toHaveLength(2);
        expect(blocks.map((b) => b.name)).toEqual(['Suite A', 'Suite B']);
    });

    it('returns empty array when no describe blocks exist', () => {
        expect(findDescribeBlocks(COMMON.noDescribe, DESCRIBE_RE)).toHaveLength(0);
    });
});

describe('resolveParentDescribe', () => {
    const DESCRIBE_RE = /test\.describe\s*\(\s*(['"`])([\s\S]*?)\1/g;

    it('returns the innermost containing describe name', () => {
        const blocks = findDescribeBlocks(COMMON.nestedDescribes, DESCRIBE_RE);
        const testIndex = COMMON.nestedDescribes.indexOf("test('deep'");
        expect(resolveParentDescribe(blocks, testIndex)).toBe('Inner');
    });

    it('returns undefined when the index is outside all describe blocks', () => {
        const blocks = findDescribeBlocks(COMMON.outerAndTopLevel, DESCRIBE_RE);
        const outsideIndex = COMMON.outerAndTopLevel.indexOf("test('outside'");
        expect(resolveParentDescribe(blocks, outsideIndex)).toBeUndefined();
    });
});
