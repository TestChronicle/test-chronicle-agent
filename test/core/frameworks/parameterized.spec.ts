import { describe, it, expect } from 'vitest';
import {
    extractParameterizedDataFromEach,
    isLikelyParameterizedTest,
    generateParameterizedTestName,
} from '../../../src/core/frameworks/parameterized';

describe('extractParameterizedDataFromEach', () => {
    it('returns correct count for a 2-item object array', () => {
        const content = `
        test.each([
            { user: 'alice', role: 'admin' },
            { user: 'bob',   role: 'viewer' },
        ])('should display role for $user', ({ user, role }) => {})`;
        const result = extractParameterizedDataFromEach(content);
        expect(result).not.toBeNull();
        expect(result!.hasParameters).toBe(true);
        expect(result!.count).toBe(2);
    });

    it('returns correct count for a 3-item object array', () => {
        const content = `
        test.each([
            { id: 1, name: 'alpha' },
            { id: 2, name: 'beta' },
            { id: 3, name: 'gamma' },
        ])('loads item $name', ({ name }) => {})`;
        const result = extractParameterizedDataFromEach(content);
        expect(result).not.toBeNull();
        expect(result!.count).toBe(3);
    });

    it('returns null when no .each() pattern is present', () => {
        const result = extractParameterizedDataFromEach(`test('plain test', () => {})`);
        expect(result).toBeNull();
    });
});

describe('isLikelyParameterizedTest', () => {
    it('returns true for names containing $variable', () => {
        expect(isLikelyParameterizedTest('should greet $name')).toBe(true);
    });

    it('returns true for names containing ${expression}', () => {
        expect(isLikelyParameterizedTest('loads page ${url}')).toBe(true);
    });

    it('returns false for plain test names', () => {
        expect(isLikelyParameterizedTest('should login successfully')).toBe(false);
        expect(isLikelyParameterizedTest('validates the form')).toBe(false);
    });
});

describe('generateParameterizedTestName', () => {
    it('formats the name with 1-based index and total count', () => {
        expect(generateParameterizedTestName('should load user', 0, 3)).toBe('should load user [1/3]');
        expect(generateParameterizedTestName('should load user', 2, 3)).toBe('should load user [3/3]');
    });
});
