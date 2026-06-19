import { describe, it, expect } from 'vitest';
import { parseJestSpec } from '../../../src/core/frameworks/jest';

const ROOT = '/project';
const FILE = '/project/src/auth.test.ts';

describe('Jest parser - basic extraction', () => {
    it('detects test() calls', () => {
        const spec = parseJestSpec(FILE, `test('returns true', () => {})`, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('returns true');
    });

    it('detects it() calls inside describe blocks', () => {
        const content = [`describe('AuthService', () => {`, `    it('logs in', () => {})`, `})`].join('\n');
        const spec = parseJestSpec(FILE, content, ROOT);
        expect(spec.tests[0].fullName).toBe('AuthService > logs in');
        expect(spec.tests[0].describe).toBe('AuthService');
    });

    it('detects concurrent and failing modifiers', () => {
        const content = [`test.concurrent('runs in parallel', () => {})`, `test.failing('known failure', () => {})`].join(
            '\n',
        );
        const spec = parseJestSpec(FILE, content, ROOT);
        expect(spec.tests.map((test) => test.name)).toEqual(['runs in parallel', 'known failure']);
    });
});

describe('Jest parser - modifiers and parameterization', () => {
    it('assigns @todo to test.todo calls', () => {
        const spec = parseJestSpec(FILE, `test.todo('not implemented')`, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: '@todo' }]);
    });

    it('tags test.each calls as parameterized', () => {
        const content = [
            `test.each([`,
            `    [1, 2, 3],`,
            `    [2, 3, 5],`,
            `])('adds %i and %i', (a, b, expected) => {})`,
        ].join('\n');
        const spec = parseJestSpec(FILE, content, ROOT);
        expect(spec.tests[0].name).toBe('adds %i and %i');
        expect(spec.tests[0].tags).toContainEqual({ name: '@parameterized' });
    });

    it('detects tests inside describe.each blocks', () => {
        const content = [
            `describe.each([{ role: 'admin' }])('role $role', ({ role }) => {`,
            `    test('can sign in', () => {})`,
            `})`,
        ].join('\n');
        const spec = parseJestSpec(FILE, content, ROOT);
        expect(spec.tests[0].fullName).toBe('role $role > can sign in');
    });
});
