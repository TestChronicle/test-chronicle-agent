import { describe, it, expect } from 'vitest';
import { parseCypressSpec } from '../../../src/core/frameworks/cypress';

const ROOT = '/project';
const FILE = '/project/cypress/e2e/login.cy.ts';

describe('Cypress parser — basic extraction', () => {
    it('detects it() calls', () => {
        const content = `it('should display the form', () => {})`;
        const spec = parseCypressSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('should display the form');
    });

    it('detects specify() calls', () => {
        const content = `specify('logs in with valid credentials', () => {})`;
        const spec = parseCypressSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('logs in with valid credentials');
    });

    it('detects test() calls', () => {
        const content = `test('submits the form', () => {})`;
        const spec = parseCypressSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('submits the form');
    });

    it('uses > separator for tests inside a describe block', () => {
        const content = `
describe('Login page', () => {
    it('shows an error for invalid credentials', () => {})
})`;
        const spec = parseCypressSpec(FILE, content, ROOT);
        expect(spec.tests[0].fullName).toBe('Login page > shows an error for invalid credentials');
        expect(spec.tests[0].describe).toBe('Login page');
    });
});

describe('Cypress parser — modifiers', () => {
    it('detects it.skip', () => {
        const content = `it.skip('skipped test', () => {})`;
        const spec = parseCypressSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('skipped test');
    });

    it('detects it.only', () => {
        const content = `it.only('focused test', () => {})`;
        const spec = parseCypressSpec(FILE, content, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('focused test');
    });
});

describe('Cypress parser — tags', () => {
    it('tests have an empty tags array by default', () => {
        const content = `it('plain test', () => {})`;
        const spec = parseCypressSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toEqual([]);
    });
});
