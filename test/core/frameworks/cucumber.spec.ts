import { describe, it, expect } from 'vitest';
import { parseCucumberSpec, extractTestNames } from '../../../src/core/frameworks/cucumber';
import { CUCUMBER } from '../../fixtures';

const ROOT = '/project';
const FILE = '/project/features/addToBag.feature';

// ─── Basic extraction ─────────────────────────────────────────────────────────

describe('Cucumber parser — basic extraction', () => {
    it('extracts a single Scenario name', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.simpleScenario, ROOT);
        expect(spec.tests).toHaveLength(1);
        expect(spec.tests[0].name).toBe('Successful login');
    });

    it('sets fullName as "Feature > Scenario"', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.simpleScenario, ROOT);
        expect(spec.tests[0].fullName).toBe('Login > Successful login');
    });

    it('sets describe to the Feature name', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.simpleScenario, ROOT);
        expect(spec.tests[0].describe).toBe('Login');
    });

    it('sets line number to the Scenario line (1-based)', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.simpleScenario, ROOT);
        // Line 5 in simpleScenario: "  Scenario: Successful login"
        expect(spec.tests[0].line).toBe(5);
    });

    it('extracts multiple Scenarios from one feature', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.multipleScenarios, ROOT);
        expect(spec.tests).toHaveLength(2);
        expect(spec.tests.map((t) => t.name)).toEqual(['View profile', 'Edit profile']);
    });

    it('returns correct testCount', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.multipleScenarios, ROOT);
        expect(spec.testCount).toBe(2);
    });

    it('sets framework to "cucumber"', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.simpleScenario, ROOT);
        expect(spec.framework).toBe('cucumber');
    });

    it('sets path relative to projectRoot', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.simpleScenario, ROOT);
        expect(spec.path).toBe('features/addToBag.feature');
    });

    it('sets name to the file basename', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.simpleScenario, ROOT);
        expect(spec.name).toBe('addToBag.feature');
    });
});

// ─── Tags ─────────────────────────────────────────────────────────────────────

describe('Cucumber parser — Feature-level tag inheritance', () => {
    it('inherits feature tags on all child Scenarios', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.withFeatureTags, ROOT);
        const tags = spec.tests[0].tags.map((t) => t.name);
        expect(tags).toContain('@smoke');
        expect(tags).toContain('@regression');
    });

    it('stores tags with @ prefix', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.withFeatureTags, ROOT);
        for (const tag of spec.tests[0].tags) {
            expect(tag.name).toMatch(/^@/);
        }
    });
});

describe('Cucumber parser — Scenario-level tags', () => {
    it('extracts tags from directly above the Scenario', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.withScenarioTags, ROOT);
        const tags = spec.tests[0].tags.map((t) => t.name);
        expect(tags).toContain('@smoke');
        expect(tags).toContain('@critical');
    });

    it('has no feature tags when Feature has none', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.withScenarioTags, ROOT);
        expect(spec.tests[0].tags).toHaveLength(2);
    });
});

describe('Cucumber parser — mixed tag inheritance', () => {
    it('merges feature and scenario tags', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.mixedTagInheritance, ROOT);
        const tags = spec.tests[0].tags.map((t) => t.name);
        expect(tags).toContain('@feature-tag');
        expect(tags).toContain('@scenario-tag');
        expect(tags).toContain('@SEVERITY=Critical');
    });

    it('feature tag comes first in merged list', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.mixedTagInheritance, ROOT);
        expect(spec.tests[0].tags[0].name).toBe('@feature-tag');
    });
});

// ─── Scenario Outline (parameterized) ────────────────────────────────────────

describe('Cucumber parser — Scenario Outline', () => {
    it('expands Scenario Outline into one TestCase per data row', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.scenarioOutline, ROOT);
        expect(spec.tests).toHaveLength(3);
    });

    it('generates parameterized names like "base [1/3]"', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.scenarioOutline, ROOT);
        expect(spec.tests[0].name).toBe('Validate email format [1/3]');
        expect(spec.tests[1].name).toBe('Validate email format [2/3]');
        expect(spec.tests[2].name).toBe('Validate email format [3/3]');
    });

    it('sets fullName correctly for each expanded row', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.scenarioOutline, ROOT);
        expect(spec.tests[0].fullName).toBe('Form Validation > Validate email format [1/3]');
    });

    it('each expanded row has the same describe (Feature name)', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.scenarioOutline, ROOT);
        for (const t of spec.tests) {
            expect(t.describe).toBe('Form Validation');
        }
    });
});

describe('Cucumber parser — Scenario Template (synonym)', () => {
    it('treats Scenario Template identically to Scenario Outline', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.scenarioTemplate, ROOT);
        expect(spec.tests).toHaveLength(2);
        expect(spec.tests[0].name).toBe('Check price [1/2]');
        expect(spec.tests[1].name).toBe('Check price [2/2]');
    });
});

describe('Cucumber parser — Outline with Examples block tags', () => {
    it('merges feature, outline and examples-block tags', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.outlineWithExampleTags, ROOT);
        const tags = spec.tests[0].tags.map((t) => t.name);
        expect(tags).toContain('@feature-tag');
        expect(tags).toContain('@outline-tag');
        expect(tags).toContain('@examples-tag');
    });

    it('expands to the correct number of rows', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.outlineWithExampleTags, ROOT);
        expect(spec.tests).toHaveLength(2);
    });
});

// ─── Real-world fixture: AddToBag ─────────────────────────────────────────────

describe('Cucumber parser — AddToBag.feature (real-world)', () => {
    it('extracts exactly 2 Scenarios', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.addToBag, ROOT);
        expect(spec.tests).toHaveLength(2);
    });

    it('extracts correct Scenario names', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.addToBag, ROOT);
        expect(spec.tests[0].name).toBe('Adding sized item to Bag from Product Display Page');
        expect(spec.tests[1].name).toBe('Adding a discounted item to the Bag');
    });

    it('both Scenarios inherit Feature-level tags', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.addToBag, ROOT);
        for (const test of spec.tests) {
            const tagNames = test.tags.map((t) => t.name);
            expect(tagNames).toContain('@AddToBag');
            expect(tagNames).toContain('@OWNER=ConfidenceToBuy');
            expect(tagNames).toContain('@FEATURE=BagV2');
        }
    });

    it('first Scenario has its own tags merged with Feature tags', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.addToBag, ROOT);
        const tagNames = spec.tests[0].tags.map((t) => t.name);
        expect(tagNames).toContain('@TMSLINK=SHOP-1776');
        expect(tagNames).toContain('@SEVERITY=Critical');
    });

    it('second Scenario has its own tags merged with Feature tags', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.addToBag, ROOT);
        const tagNames = spec.tests[1].tags.map((t) => t.name);
        expect(tagNames).toContain('@AddToBag-002');
        expect(tagNames).toContain('@SEVERITY=Critical');
    });

    it('fullNames include the Feature name', () => {
        const spec = parseCucumberSpec(FILE, CUCUMBER.addToBag, ROOT);
        expect(spec.tests[0].fullName).toBe('Add to Bag > Adding sized item to Bag from Product Display Page');
        expect(spec.tests[1].fullName).toBe('Add to Bag > Adding a discounted item to the Bag');
    });
});

// ─── extractTestNames ─────────────────────────────────────────────────────────

describe('Cucumber parser — extractTestNames()', () => {
    it('returns fullName strings for simple scenarios', () => {
        const names = extractTestNames(CUCUMBER.simpleScenario);
        expect(names).toEqual(['Login > Successful login']);
    });

    it('returns multiple fullNames', () => {
        const names = extractTestNames(CUCUMBER.multipleScenarios);
        expect(names).toEqual(['User Profile > View profile', 'User Profile > Edit profile']);
    });

    it('expands Scenario Outline rows in extractTestNames', () => {
        const names = extractTestNames(CUCUMBER.scenarioOutline);
        expect(names).toHaveLength(3);
        expect(names[0]).toBe('Form Validation > Validate email format [1/3]');
    });
});
