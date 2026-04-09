import { describe, it, expect } from 'vitest';
import { parsePlaywrightSpec } from '../../src/core/frameworks/playwright';
import { parseVitestSpec } from '../../src/core/frameworks/vitest';
import { parseCypressSpec } from '../../src/core/frameworks/cypress';
import { parseTestNGSpec } from '../../src/core/frameworks/testng';
import { parseJUnitSpec } from '../../src/core/frameworks/junit';
import type { SpecFile } from '../../src/types';

const ROOT = '/project';

const fixtures: Array<{ label: string; spec: SpecFile }> = [
    {
        label: 'playwright',
        spec: parsePlaywrightSpec(
            '/project/tests/login.spec.ts',
            `test.describe('Auth', () => {
    test('should login', async () => {})
    test('should logout', async () => {})
})`,
            ROOT,
        ),
    },
    {
        label: 'vitest',
        spec: parseVitestSpec(
            '/project/src/math.spec.ts',
            `describe('Math', () => {
    it('adds', () => {})
    it('subtracts', () => {})
})`,
            ROOT,
        ),
    },
    {
        label: 'cypress',
        spec: parseCypressSpec(
            '/project/cypress/e2e/home.cy.ts',
            `describe('Home', () => {
    it('loads', () => {})
    specify('has title', () => {})
})`,
            ROOT,
        ),
    },
    {
        label: 'testng',
        spec: parseTestNGSpec(
            '/project/src/test/HomeTest.java',
            `public class HomeTest {
    @Test
    public void loadsPage() {}
    @Test
    public void hasTitle() {}
}`,
            ROOT,
        ),
    },
    {
        label: 'junit',
        spec: parseJUnitSpec(
            '/project/src/test/HomeTest.java',
            `public class HomeTest {
    @Test
    public void loadsPage() {}
    @Test
    public void hasTitle() {}
}`,
            ROOT,
        ),
    },
];

describe('SpecFile output contract — shared across all parsers', () => {
    it('id is exactly 8 hex characters', () => {
        for (const { label, spec } of fixtures) {
            expect(spec.id, `${label}: spec.id`).toMatch(/^[0-9a-f]{8}$/);
        }
    });

    it('testCount equals tests.length', () => {
        for (const { label, spec } of fixtures) {
            expect(spec.testCount, `${label}: testCount`).toBe(spec.tests.length);
        }
    });

    it('path uses forward slashes only', () => {
        for (const { label, spec } of fixtures) {
            expect(spec.path, `${label}: path`).not.toContain('\\');
        }
    });

    it('name is the basename only (no directory prefix)', () => {
        for (const { label, spec } of fixtures) {
            expect(spec.name, `${label}: name`).not.toContain('/');
            expect(spec.name, `${label}: name`).not.toContain('\\');
        }
    });

    it('framework field matches the parser used', () => {
        expect(fixtures.find((f) => f.label === 'playwright')!.spec.framework).toBe('playwright');
        expect(fixtures.find((f) => f.label === 'vitest')!.spec.framework).toBe('vitest');
        expect(fixtures.find((f) => f.label === 'cypress')!.spec.framework).toBe('cypress');
        expect(fixtures.find((f) => f.label === 'testng')!.spec.framework).toBe('testng');
        expect(fixtures.find((f) => f.label === 'junit')!.spec.framework).toBe('junit');
    });

    it('tests[].id values are unique within each spec file', () => {
        for (const { label, spec } of fixtures) {
            const ids = spec.tests.map((t) => t.id);
            const unique = new Set(ids);
            expect(unique.size, `${label}: duplicate test ids`).toBe(ids.length);
        }
    });

    it('each test id is exactly 8 hex characters', () => {
        for (const { label, spec } of fixtures) {
            for (const test of spec.tests) {
                expect(test.id, `${label}: test "${test.name}" id`).toMatch(/^[0-9a-f]{8}$/);
            }
        }
    });
});
