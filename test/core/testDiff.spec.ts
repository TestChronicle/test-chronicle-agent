import { describe, it, expect } from 'vitest';
import {
    levenshteinDistance,
    normalizeTestName,
    calculateSimilarity,
    isSameTest,
    findBestMatch,
} from '../../src/core/frameworks/testDiff';

describe('levenshteinDistance', () => {
    it('returns 0 for identical strings', () => {
        expect(levenshteinDistance('hello', 'hello')).toBe(0);
    });

    it('returns full length for empty vs non-empty string', () => {
        expect(levenshteinDistance('', 'abc')).toBe(3);
        expect(levenshteinDistance('abc', '')).toBe(3);
    });

    it('returns 0 for two empty strings', () => {
        expect(levenshteinDistance('', '')).toBe(0);
    });

    it('returns correct distance for known pairs', () => {
        expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
        expect(levenshteinDistance('login', 'logout')).toBe(3);
        expect(levenshteinDistance('test', 'text')).toBe(1);
    });
});

describe('normalizeTestName', () => {
    it('lowercases the name', () => {
        expect(normalizeTestName('Should Login')).toBe('should login');
    });

    it('collapses underscores, hyphens, and spaces into a single space', () => {
        expect(normalizeTestName('should_validate-email address')).toBe('should validate email address');
    });

    it('trims leading and trailing whitespace', () => {
        expect(normalizeTestName('  hello world  ')).toBe('hello world');
    });

    it('handles multiple consecutive separators', () => {
        expect(normalizeTestName('foo___bar---baz')).toBe('foo bar baz');
    });
});

describe('calculateSimilarity', () => {
    it('returns 1.0 for identical strings', () => {
        expect(calculateSimilarity('should login', 'should login')).toBe(1.0);
    });

    it('returns 1.0 for strings that are identical after normalization', () => {
        expect(calculateSimilarity('should_login', 'should login')).toBe(1.0);
    });

    it('returns 0.0 or very low for completely different strings', () => {
        expect(calculateSimilarity('aaa', 'zzzzzzzzz')).toBeLessThan(0.1);
    });

    it('returns a meaningful mid-range score for similar strings', () => {
        const score = calculateSimilarity('should validate email', 'should validate email address');
        expect(score).toBeGreaterThan(0.7);
        expect(score).toBeLessThan(1.0);
    });
});

describe('isSameTest', () => {
    it('returns true for identical names', () => {
        expect(isSameTest('should login', 'should login')).toBe(true);
    });

    it('returns true for names with different separators (above 85%)', () => {
        expect(isSameTest('should_validate_email', 'should validate email')).toBe(true);
    });

    it('returns false for clearly different names', () => {
        expect(isSameTest('login', 'logout')).toBe(false);
        expect(isSameTest('should handle authentication', 'completely unrelated test name here')).toBe(false);
    });
});

describe('findBestMatch', () => {
    it('returns the best matching candidate above the threshold', () => {
        // 'should login' vs 'should log in': edit distance 1, max 13, similarity ~0.92
        const result = findBestMatch('should login', ['should log in', 'completely different', 'another thing']);
        expect(result).not.toBeNull();
        expect(result!.index).toBe(0);
        expect(result!.similarity).toBeGreaterThan(0.85);
    });

    it('returns null when no candidate exceeds the threshold', () => {
        const result = findBestMatch('login test', ['completely different', 'nothing matches here', 'xyz abc']);
        expect(result).toBeNull();
    });

    it('returns the highest similarity candidate when multiple exceed the threshold', () => {
        // index 1: 'user should see dashboards' — dist 1, sim 0.96 (best)
        // index 0: 'user should see the dashboard' — dist 4, sim 0.86
        const removed = 'user should see dashboard';
        const added = ['user should see the dashboard', 'user should see dashboards', 'logout user'];
        const result = findBestMatch(removed, added);
        expect(result).not.toBeNull();
        expect(result!.index).toBe(1);
        expect(result!.similarity).toBeGreaterThan(0.85);
    });
});
