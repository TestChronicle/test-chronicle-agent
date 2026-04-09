import { describe, it, expect } from 'vitest';
import { parseCypressSpec } from '../../../src/core/frameworks/cypress';
import { CYPRESS } from '../../fixtures';

const ROOT = '/project';
const FILE = '/project/cypress/e2e/login.cy.ts';

describe('Cypress parser — basic extraction', () => {
    it('detects it() calls', () => {
        const spec = parseCypressSpec(FILE, CYPRESS.itCall, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('should display the form');
    });

    it('detects specify() calls', () => {
        const spec = parseCypressSpec(FILE, CYPRESS.specifyCall, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('logs in with valid credentials');
    });

    it('detects test() calls', () => {
        const spec = parseCypressSpec(FILE, CYPRESS.testCall, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('submits the form');
    });

    it('uses > separator for tests inside a describe block', () => {
        const spec = parseCypressSpec(FILE, CYPRESS.withDescribe, ROOT);
        expect(spec.tests[0].fullName).toBe('Login page > shows an error for invalid credentials');
        expect(spec.tests[0].describe).toBe('Login page');
    });
});

describe('Cypress parser — modifiers', () => {
    it('detects it.skip', () => {
        const spec = parseCypressSpec(FILE, CYPRESS.skip, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('skipped test');
    });

    it('detects it.only', () => {
        const spec = parseCypressSpec(FILE, CYPRESS.only, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('focused test');
    });
});

describe('Cypress parser — tags', () => {
    it('tests have an empty tags array by default', () => {
        const spec = parseCypressSpec(FILE, CYPRESS.plain, ROOT);
        expect(spec.tests[0].tags).toEqual([]);
    });
});
