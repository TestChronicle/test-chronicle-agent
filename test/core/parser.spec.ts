import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { extractTestNamesFromContent, extractTestsWithLinesFromContent, parseAllSpecs } from '../../src/core/parser';
import { PARSER, PARSER_TEMP_FILES } from '../fixtures';

describe('extractTestNamesFromContent', () => {
    it('extracts names from Playwright content', () => {
        const names = extractTestNamesFromContent(PARSER.playwright, 'playwright');
        expect(names).toEqual(['Suite > loads the page', 'Suite > submits the form']);
    });

    it('extracts names from Vitest content', () => {
        const names = extractTestNamesFromContent(PARSER.vitest, 'vitest');
        expect(names).toEqual(['Math > adds numbers', 'Math > subtracts numbers']);
    });

    it('extracts names from Jest content', () => {
        const names = extractTestNamesFromContent(PARSER.jest, 'jest');
        expect(names).toEqual(['Cart > adds items', 'Cart > removes items']);
    });

    it('extracts names from pytest content', () => {
        const names = extractTestNamesFromContent(PARSER.pytest, 'pytest');
        expect(names).toEqual(['TestCart > test_adds_items', 'TestCart > test_removes_items']);
    });

    it('extracts names from Cypress content', () => {
        const names = extractTestNamesFromContent(PARSER.cypress, 'cypress');
        expect(names).toEqual(['Login > shows the form', 'Login > accepts valid credentials']);
    });

    it('extracts names from TestNG content', () => {
        const names = extractTestNamesFromContent(PARSER.testng, 'testng');
        expect(names).toEqual(['LoginTest > shouldLogin']);
    });

    it('extracts names from JUnit content', () => {
        const names = extractTestNamesFromContent(PARSER.junit, 'junit');
        expect(names).toEqual(['AuthTest > verifyLogin']);
    });

    it('returns [] for an unknown framework', () => {
        const names = extractTestNamesFromContent(PARSER.lineNumbers, 'unknown' as any);
        expect(names).toEqual([]);
    });
});

describe('extractTestsWithLinesFromContent', () => {
    it('returns line numbers matching actual content positions', () => {
        const tests = extractTestsWithLinesFromContent(PARSER.lineNumbers, 'playwright');
        expect(tests).toHaveLength(3);
        expect(tests[0].line).toBe(1);
        expect(tests[1].line).toBe(2);
        expect(tests[2].line).toBe(3);
    });

    it('never returns line 1 for tests that are not on line 1', () => {
        const tests = extractTestsWithLinesFromContent(PARSER.lineNumbersDeep, 'playwright');
        expect(tests).toHaveLength(1);
        expect(tests[0].line).toBeGreaterThan(1);
    });
});

describe('parseAllSpecs', () => {
    it('parses Playwright tests in nested subfolders without reading directories', () => {
        const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-parser-'));

        try {
            const testsRoot = path.join(projectRoot, 'playwright', 'tests');
            fs.mkdirSync(path.join(testsRoot, 'components', 'auth'), { recursive: true });
            fs.writeFileSync(
                path.join(testsRoot, 'components', 'auth', 'login.spec.ts'),
                PARSER_TEMP_FILES.playwrightLogin,
                'utf-8',
            );

            const specs = parseAllSpecs(projectRoot, [
                { framework: 'playwright', testDir: './playwright/tests', confidence: 'high' },
            ]);

            expect(specs).toHaveLength(1);
            expect(specs[0].path).toBe('playwright/tests/components/auth/login.spec.ts');
            expect(specs[0].tests).toHaveLength(1);
            expect(specs[0].tests[0].name).toBe('logs in');
        } finally {
            fs.rmSync(projectRoot, { recursive: true, force: true });
        }
    });

    it('routes overlapping spec filenames by the configured testDir', () => {
        const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-parser-'));

        try {
            const jestRoot = path.join(projectRoot, 'packages', 'web', '__tests__');
            const vitestRoot = path.join(projectRoot, 'packages', 'lib', 'src');
            fs.mkdirSync(jestRoot, { recursive: true });
            fs.mkdirSync(vitestRoot, { recursive: true });
            fs.writeFileSync(path.join(jestRoot, 'auth.spec.ts'), PARSER_TEMP_FILES.jestLogin, 'utf-8');
            fs.writeFileSync(path.join(vitestRoot, 'auth.spec.ts'), PARSER_TEMP_FILES.vitestToken, 'utf-8');

            const specs = parseAllSpecs(projectRoot, [
                { framework: 'jest', testDir: './packages/web', confidence: 'high' },
                { framework: 'vitest', testDir: './packages/lib', confidence: 'high' },
            ]);

            expect(specs).toHaveLength(2);
            expect(specs.find((spec) => spec.framework === 'jest')?.tests[0].name).toBe('renders login');
            expect(specs.find((spec) => spec.framework === 'vitest')?.tests[0].name).toBe('validates token');
        } finally {
            fs.rmSync(projectRoot, { recursive: true, force: true });
        }
    });

    it('parses Vitest tests under wildcard framework override directories', () => {
        const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-parser-'));

        try {
            const authRoot = path.join(projectRoot, 'libs', 'auth', 'src');
            const cartRoot = path.join(projectRoot, 'libs', 'cart', 'src');
            fs.mkdirSync(authRoot, { recursive: true });
            fs.mkdirSync(cartRoot, { recursive: true });
            fs.writeFileSync(path.join(authRoot, 'auth.spec.ts'), PARSER_TEMP_FILES.vitestToken, 'utf-8');
            fs.writeFileSync(path.join(cartRoot, 'cart.test.ts'), PARSER_TEMP_FILES.vitestToken, 'utf-8');

            const specs = parseAllSpecs(projectRoot, [
                { framework: 'vitest', testDir: './libs/*', confidence: 'high' },
            ]);

            expect(specs.map((spec) => spec.path).sort()).toEqual([
                'libs/auth/src/auth.spec.ts',
                'libs/cart/src/cart.test.ts',
            ]);
            expect(specs.every((spec) => spec.framework === 'vitest')).toBe(true);
        } finally {
            fs.rmSync(projectRoot, { recursive: true, force: true });
        }
    });

    it('deduplicates overlapping literal and wildcard override directories using the most specific match', () => {
        const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-parser-'));

        try {
            const authRoot = path.join(projectRoot, 'libs', 'auth', 'src');
            const cartRoot = path.join(projectRoot, 'libs', 'cart', 'src');
            fs.mkdirSync(authRoot, { recursive: true });
            fs.mkdirSync(cartRoot, { recursive: true });
            fs.writeFileSync(path.join(authRoot, 'auth.spec.ts'), PARSER_TEMP_FILES.jestLogin, 'utf-8');
            fs.writeFileSync(path.join(cartRoot, 'cart.spec.ts'), PARSER_TEMP_FILES.vitestToken, 'utf-8');

            const specs = parseAllSpecs(projectRoot, [
                { framework: 'vitest', testDir: './libs/*', confidence: 'high' },
                { framework: 'jest', testDir: './libs/auth', confidence: 'high' },
            ]);

            expect(specs).toHaveLength(2);
            expect(specs.find((spec) => spec.path === 'libs/auth/src/auth.spec.ts')?.framework).toBe('jest');
            expect(specs.find((spec) => spec.path === 'libs/cart/src/cart.spec.ts')?.framework).toBe('vitest');
        } finally {
            fs.rmSync(projectRoot, { recursive: true, force: true });
        }
    });
});
