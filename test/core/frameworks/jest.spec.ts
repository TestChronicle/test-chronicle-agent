import { describe, it, expect } from 'vitest';
import { parseJestSpec } from '../../../src/core/frameworks/jest';
import { JEST } from '../../fixtures';

const ROOT = '/project';
const FILE = '/project/src/auth.test.ts';

describe('Jest parser - basic extraction', () => {
    it('detects test() calls', () => {
        const spec = parseJestSpec(FILE, JEST.testCall, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('returns true');
    });

    it('detects it() calls inside describe blocks', () => {
        const spec = parseJestSpec(FILE, JEST.withDescribe, ROOT);
        expect(spec.tests[0].fullName).toBe('AuthService > logs in');
        expect(spec.tests[0].describe).toBe('AuthService');
    });

    it('detects concurrent and failing modifiers', () => {
        const spec = parseJestSpec(FILE, JEST.modifiers, ROOT);
        expect(spec.tests.map((test) => test.name)).toEqual(['runs in parallel', 'known failure']);
    });
});

describe('Jest parser - modifiers and parameterization', () => {
    it('assigns @todo to test.todo calls', () => {
        const spec = parseJestSpec(FILE, JEST.todo, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: '@todo' }]);
    });

    it('tags test.each calls as parameterized', () => {
        const spec = parseJestSpec(FILE, JEST.each, ROOT);
        expect(spec.tests[0].name).toBe('adds %i and %i');
        expect(spec.tests[0].tags).toContainEqual({ name: '@parameterized' });
    });

    it('detects tests inside describe.each blocks', () => {
        const spec = parseJestSpec(FILE, JEST.describeEach, ROOT);
        expect(spec.tests[0].fullName).toBe('role $role > can sign in');
    });
});
