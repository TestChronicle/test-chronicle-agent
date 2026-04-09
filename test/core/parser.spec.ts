import { describe, it, expect } from 'vitest';
import { extractTestNamesFromContent, extractTestsWithLinesFromContent } from '../../src/core/parser';

describe('extractTestNamesFromContent', () => {
    it('extracts names from Playwright content', () => {
        const content = `
        test.describe('Suite', () => {
            test('loads the page', async () => {})
            test('submits the form', async () => {})
        })`;
        const names = extractTestNamesFromContent(content, 'playwright');
        expect(names).toEqual(['Suite > loads the page', 'Suite > submits the form']);
    });

    it('extracts names from Vitest content', () => {
        const content = `
        describe('Math', () => {
            it('adds numbers', () => {})
            test('subtracts numbers', () => {})
        })`;
        const names = extractTestNamesFromContent(content, 'vitest');
        expect(names).toEqual(['Math > adds numbers', 'Math > subtracts numbers']);
    });

    it('extracts names from Cypress content', () => {
        const content = `
        describe('Login', () => {
            it('shows the form', () => {})
            specify('accepts valid credentials', () => {})
        })`;
        const names = extractTestNamesFromContent(content, 'cypress');
        expect(names).toEqual(['Login > shows the form', 'Login > accepts valid credentials']);
    });

    it('extracts names from TestNG content', () => {
        const content = `
        public class LoginTest {
            @Test
            public void shouldLogin() {}
        }`;
        const names = extractTestNamesFromContent(content, 'testng');
        expect(names).toEqual(['LoginTest > shouldLogin']);
    });

    it('extracts names from JUnit content', () => {
        const content = `
        public class AuthTest {
            @Test
            public void verifyLogin() {}
        }`;
        const names = extractTestNamesFromContent(content, 'junit');
        expect(names).toEqual(['AuthTest > verifyLogin']);
    });

    it('returns [] for an unknown framework', () => {
        const names = extractTestNamesFromContent(`test('x', () => {})`, 'unknown' as any);
        expect(names).toEqual([]);
    });
});

describe('extractTestsWithLinesFromContent', () => {
    it('returns line numbers matching actual content positions', () => {
        const content = `test('first', () => {})
        test('second', () => {})
        test('third', () => {})`;
        const tests = extractTestsWithLinesFromContent(content, 'playwright');
        expect(tests).toHaveLength(3);
        expect(tests[0].line).toBe(1);
        expect(tests[1].line).toBe(2);
        expect(tests[2].line).toBe(3);
    });

    it('never returns line 1 for tests that are not on line 1', () => {
        const content = `
        // some comment

        test.describe('Suite', () => {
            test('deep test', async () => {})
        })`;
        const tests = extractTestsWithLinesFromContent(content, 'playwright');
        expect(tests).toHaveLength(1);
        expect(tests[0].line).toBeGreaterThan(1);
    });
});
