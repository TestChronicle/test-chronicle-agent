import { describe, expect, it } from 'vitest';
import { parseCypressSpec, extractTestNames } from '../../../src/core/frameworks/cypress';
import { parseJUnitSpec } from '../../../src/core/frameworks/junit';
import { parseTestNGSpec } from '../../../src/core/frameworks/testng';

describe('parser regressions', () => {
    it('uses the same expanded Cypress names for current specs and history', () => {
        const content = "const users = [{name: 'a'}, {name: 'b'}];\nusers.forEach(user => {\n  it('greets user', () => {});\n});";
        const spec = parseCypressSpec('/tests/sample.cy.ts', content, '/tests');
        expect(spec.testCount).toBe(2);
        expect(extractTestNames(content)).toEqual(spec.tests.map((test) => test.fullName));
    });

    it('reads JUnit tags placed after the Test annotation', () => {
        const spec = parseJUnitSpec('/tests/SampleTest.java', 'class SampleTest { @Test @Tag("smoke") public void example() {} }', '/tests');
        expect(spec.tests[0].tags).toEqual([{ name: 'smoke' }]);
    });

    it.each(['{"smoke", "login"}', '"smoke"'])('reads TestNG groups %s', (groups) => {
        const spec = parseTestNGSpec('/tests/SampleTest.java', `class SampleTest { @Test(groups = ${groups}) public void example() {} }`, '/tests');
        expect(spec.tests[0].tags).toEqual(groups.startsWith('{') ? [{ name: 'smoke' }, { name: 'login' }] : [{ name: 'smoke' }]);
    });
});
