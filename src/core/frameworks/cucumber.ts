import path from 'path';
import { TestCase, SpecFile } from '../../types';
import { hashId } from './common';
import { generateParameterizedTestName } from './parameterized';
import { IFrameworkParser } from '../base';

// ─── Regex Patterns ───────────────────────────────────────────────────────────

const FEATURE_RE = /^Feature:\s*(.+)/i;
const SCENARIO_RE = /^\s*(?:Scenario|Example):\s*(.+)/i;
const OUTLINE_RE = /^\s*(?:Scenario Outline|Scenario Template):\s*(.+)/i;
const EXAMPLES_RE = /^\s*(?:Examples|Scenarios)\s*:/i;
const TAG_LINE_RE = /^\s*(@\S+(?:\s+@\S+)*)\s*$/;
const DATA_ROW_RE = /^\s*\|/;

// ─── Public API ───────────────────────────────────────────────────────────────

export function parseCucumberSpec(filePath: string, content: string, projectRoot: string): SpecFile {
    const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
    const tests: TestCase[] = [];
    const lines = content.split('\n');

    let featureName: string | undefined;
    let featureTags: string[] = [];
    let pendingTags: string[] = [];

    // Track outline state
    let currentOutlineName: string | undefined;
    let currentOutlineTags: string[] = [];
    let currentOutlineLine = 0;
    let inOutline = false;
    let inExamplesBlock = false;
    let examplesHeaderSeen = false;
    let outlineRows: number[] = []; // line numbers of data rows

    const flushOutline = () => {
        if (!currentOutlineName || !inOutline) return;

        const rowCount = outlineRows.length;
        if (rowCount === 0) {
            // No data rows found — emit a single un-expanded test
            const id = hashId(`${relativePath}::${featureName ?? ''}::${currentOutlineName}`);
            const fullName = featureName ? `${featureName} > ${currentOutlineName}` : currentOutlineName;
            tests.push({
                id,
                name: currentOutlineName,
                fullName,
                describe: featureName,
                tags: currentOutlineTags.map((t) => ({ name: t })),
                line: currentOutlineLine,
            });
        } else {
            for (let i = 0; i < rowCount; i++) {
                const name = generateParameterizedTestName(currentOutlineName, i, rowCount);
                const id = hashId(`${relativePath}::${featureName ?? ''}::${name}`);
                const fullName = featureName ? `${featureName} > ${name}` : name;
                tests.push({
                    id,
                    name,
                    fullName,
                    describe: featureName,
                    tags: currentOutlineTags.map((t) => ({ name: t })),
                    line: outlineRows[i],
                });
            }
        }

        inOutline = false;
        inExamplesBlock = false;
        examplesHeaderSeen = false;
        outlineRows = [];
        currentOutlineName = undefined;
        currentOutlineTags = [];
    };

    for (let i = 0; i < lines.length; i++) {
        const rawLine = lines[i];
        const trimmed = rawLine.trim();

        // ── Tag collection ──
        const tagMatch = TAG_LINE_RE.exec(rawLine);
        if (tagMatch) {
            const tokens = tagMatch[1]
                .trim()
                .split(/\s+/)
                .filter((t) => t.startsWith('@'));
            pendingTags.push(...tokens);
            continue;
        }

        // ── Feature ──
        const featureMatch = FEATURE_RE.exec(trimmed);
        if (featureMatch) {
            // If we were mid-outline, flush it
            flushOutline();
            featureName = featureMatch[1].trim();
            featureTags = [...pendingTags];
            pendingTags = [];
            continue;
        }

        // ── Scenario Outline / Scenario Template ──
        const outlineMatch = OUTLINE_RE.exec(trimmed);
        if (outlineMatch) {
            flushOutline();
            currentOutlineName = outlineMatch[1].trim();
            currentOutlineTags = [...featureTags, ...pendingTags];
            currentOutlineLine = i + 1; // 1-based
            inOutline = true;
            inExamplesBlock = false;
            examplesHeaderSeen = false;
            outlineRows = [];
            pendingTags = [];
            continue;
        }

        // ── Examples / Scenarios table (inside Outline) ──
        if (inOutline && EXAMPLES_RE.test(trimmed)) {
            // Collect tags above the Examples block into the outline tags
            // (pendingTags was reset on the Outline line; tags between Outline and Examples
            //  are gathered in pendingTags naturally since they aren't non-tag lines)
            currentOutlineTags = [...currentOutlineTags, ...pendingTags];
            pendingTags = [];
            inExamplesBlock = true;
            examplesHeaderSeen = false; // next data row is the header
            continue;
        }

        // ── Data table rows inside Examples block ──
        if (inOutline && inExamplesBlock && DATA_ROW_RE.test(rawLine)) {
            if (!examplesHeaderSeen) {
                examplesHeaderSeen = true; // first row is the column header
            } else {
                outlineRows.push(i + 1); // 1-based line of data row
            }
            continue;
        }

        // ── Scenario / Example ──
        const scenarioMatch = SCENARIO_RE.exec(trimmed);
        if (scenarioMatch) {
            flushOutline(); // close any open outline
            const name = scenarioMatch[1].trim();
            const mergedTags = [...featureTags, ...pendingTags];
            const id = hashId(`${relativePath}::${featureName ?? ''}::${name}`);
            const fullName = featureName ? `${featureName} > ${name}` : name;
            const line = i + 1; // 1-based
            tests.push({
                id,
                name,
                fullName,
                describe: featureName,
                tags: mergedTags.map((t) => ({ name: t })),
                line,
            });
            pendingTags = [];
            continue;
        }

        // ── Non-blank, non-tag, non-keyword line resets pending tags ──
        // (Only reset if we're not inside an Examples block — table rows aren't tags)
        if (trimmed.length > 0 && !trimmed.startsWith('#')) {
            pendingTags = [];
        }
    }

    // Flush any trailing outline
    flushOutline();

    return {
        id: hashId(relativePath),
        path: relativePath,
        name: path.basename(filePath),
        framework: 'cucumber',
        tests,
        testCount: tests.length,
        lastModified: new Date().toISOString(),
    };
}

/** Lightweight extraction of test full names from Gherkin content. */
export function extractTestNames(content: string): string[] {
    const lines = content.split('\n');
    const names: string[] = [];

    let featureName: string | undefined;
    let pendingTags: string[] = [];
    let inOutline = false;
    let outlineName: string | undefined;
    let inExamplesBlock = false;
    let examplesHeaderSeen = false;
    let rowCount = 0;

    const flushOutline = () => {
        if (!outlineName) return;
        if (rowCount === 0) {
            names.push(featureName ? `${featureName} > ${outlineName}` : outlineName);
        } else {
            for (let i = 0; i < rowCount; i++) {
                const name = generateParameterizedTestName(outlineName, i, rowCount);
                names.push(featureName ? `${featureName} > ${name}` : name);
            }
        }
        inOutline = false;
        inExamplesBlock = false;
        examplesHeaderSeen = false;
        rowCount = 0;
        outlineName = undefined;
    };

    for (const rawLine of lines) {
        const trimmed = rawLine.trim();

        if (TAG_LINE_RE.test(rawLine)) {
            pendingTags.push(
                ...rawLine
                    .trim()
                    .split(/\s+/)
                    .filter((t) => t.startsWith('@')),
            );
            continue;
        }

        const featureMatch = FEATURE_RE.exec(trimmed);
        if (featureMatch) {
            flushOutline();
            featureName = featureMatch[1].trim();
            pendingTags = [];
            continue;
        }

        const outlineMatch = OUTLINE_RE.exec(trimmed);
        if (outlineMatch) {
            flushOutline();
            outlineName = outlineMatch[1].trim();
            inOutline = true;
            inExamplesBlock = false;
            examplesHeaderSeen = false;
            rowCount = 0;
            pendingTags = [];
            continue;
        }

        if (inOutline && EXAMPLES_RE.test(trimmed)) {
            pendingTags = [];
            inExamplesBlock = true;
            examplesHeaderSeen = false;
            continue;
        }

        if (inOutline && inExamplesBlock && DATA_ROW_RE.test(rawLine)) {
            if (!examplesHeaderSeen) {
                examplesHeaderSeen = true;
            } else {
                rowCount++;
            }
            continue;
        }

        const scenarioMatch = SCENARIO_RE.exec(trimmed);
        if (scenarioMatch) {
            flushOutline();
            const name = scenarioMatch[1].trim();
            names.push(featureName ? `${featureName} > ${name}` : name);
            pendingTags = [];
            continue;
        }

        if (trimmed.length > 0 && !trimmed.startsWith('#')) {
            pendingTags = [];
        }
    }

    flushOutline();
    return names;
}

// ─── Parser export ────────────────────────────────────────────────────────────

export const cucumberParser: IFrameworkParser = {
    parseFile: parseCucumberSpec,
    extractTestNames,
    filePatterns: ['**/*.feature'],
    supportedFeatures: {
        tags: true,
        describes: true,
        parameterized: true,
        lineNumbers: true,
        asyncTests: false,
    },
};
