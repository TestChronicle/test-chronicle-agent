import { describe, it, expect } from 'vitest';
import { parsePytestSpec } from '../../../src/core/frameworks/pytest';
import { PYTEST } from '../../fixtures';

const ROOT = '/project';
const FILE = '/project/tests/test_auth.py';

describe('pytest parser - basic extraction', () => {
    it('detects test_ functions', () => {
        const spec = parsePytestSpec(FILE, PYTEST.functionTest, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('test_login');
    });

    it('uses class names as describe groups', () => {
        const spec = parsePytestSpec(FILE, PYTEST.classTest, ROOT);
        expect(spec.tests[0].fullName).toBe('TestAuth > test_login');
        expect(spec.tests[0].describe).toBe('TestAuth');
    });

    it('detects async test functions', () => {
        const spec = parsePytestSpec(FILE, PYTEST.asyncTest, ROOT);
        expect(spec.tests[0].name).toBe('test_async_login');
    });
});

describe('pytest parser - marks and parameterization', () => {
    it('maps pytest markers to tags', () => {
        const spec = parsePytestSpec(FILE, PYTEST.markers, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: 'smoke' }, { name: 'regression' }]);
    });

    it('tags parametrize decorators as parameterized', () => {
        const spec = parsePytestSpec(FILE, PYTEST.parametrize, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: '@parameterized' }]);
    });

    it('detects multi-line parametrize decorators', () => {
        const spec = parsePytestSpec(FILE, PYTEST.multilineParametrize, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: '@parameterized' }]);
    });

    it('reports the function line number', () => {
        const spec = parsePytestSpec(FILE, PYTEST.lineNumber, ROOT);
        expect(spec.tests[0].line).toBe(4);
    });
});
