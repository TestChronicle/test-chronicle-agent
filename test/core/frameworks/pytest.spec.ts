import { describe, it, expect } from 'vitest';
import { parsePytestSpec } from '../../../src/core/frameworks/pytest';

const ROOT = '/project';
const FILE = '/project/tests/test_auth.py';

describe('pytest parser - basic extraction', () => {
    it('detects test_ functions', () => {
        const spec = parsePytestSpec(FILE, `def test_login():\n    assert True`, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('test_login');
    });

    it('uses class names as describe groups', () => {
        const content = [`class TestAuth:`, `    def test_login(self):`, `        assert True`].join('\n');
        const spec = parsePytestSpec(FILE, content, ROOT);
        expect(spec.tests[0].fullName).toBe('TestAuth > test_login');
        expect(spec.tests[0].describe).toBe('TestAuth');
    });

    it('detects async test functions', () => {
        const spec = parsePytestSpec(FILE, `async def test_async_login():\n    assert True`, ROOT);
        expect(spec.tests[0].name).toBe('test_async_login');
    });
});

describe('pytest parser - marks and parameterization', () => {
    it('maps pytest markers to tags', () => {
        const content = [`@pytest.mark.smoke`, `@pytest.mark.regression`, `def test_checkout():`, `    assert True`].join(
            '\n',
        );
        const spec = parsePytestSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: 'smoke' }, { name: 'regression' }]);
    });

    it('tags parametrize decorators as parameterized', () => {
        const content = [
            `@pytest.mark.parametrize("value", [1, 2, 3])`,
            `def test_value(value):`,
            `    assert value`,
        ].join('\n');
        const spec = parsePytestSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: '@parameterized' }]);
    });

    it('detects multi-line parametrize decorators', () => {
        const content = [
            `@pytest.mark.parametrize(`,
            `    "value",`,
            `    [1, 2, 3],`,
            `)`,
            `def test_value(value):`,
            `    assert value`,
        ].join('\n');
        const spec = parsePytestSpec(FILE, content, ROOT);
        expect(spec.tests[0].tags).toEqual([{ name: '@parameterized' }]);
    });

    it('reports the function line number', () => {
        const content = [`import pytest`, ``, `@pytest.mark.smoke`, `def test_line_number():`, `    assert True`].join(
            '\n',
        );
        const spec = parsePytestSpec(FILE, content, ROOT);
        expect(spec.tests[0].line).toBe(4);
    });
});
