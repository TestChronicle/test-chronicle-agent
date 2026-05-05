import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { Framework, DetectionResult } from '../types';

interface FrameworkSignature {
    configFiles: string[];
    packageDeps: string[];
}

const SIGNATURES: Record<Exclude<Framework, 'unknown'>, FrameworkSignature> = {
    playwright: {
        configFiles: ['playwright.config.ts', 'playwright.config.js', 'playwright.config.mjs'],
        packageDeps: ['@playwright/test', 'playwright'],
    },
    cypress: {
        configFiles: ['cypress.config.ts', 'cypress.config.js', 'cypress.json'],
        packageDeps: ['cypress'],
    },
    testng: {
        configFiles: ['testng.xml'],
        packageDeps: ['org.testng:testng'],
    },
    junit: {
        configFiles: [],
        packageDeps: ['junit:junit'],
    },
    vitest: {
        configFiles: ['vitest.config.ts', 'vitest.config.js'],
        packageDeps: ['vitest'],
    },
    cucumber: {
        configFiles: ['cucumber.properties', 'cucumber.yml', 'cucumber.yaml'],
        packageDeps: ['@cucumber/cucumber', 'io.cucumber:cucumber-java'],
    },
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Detects all test frameworks present in the project.
 * Returns one DetectionResult per framework found, ordered by confidence.
 * Falls back to a single unknown result if nothing is detected.
 */
export function detectFrameworks(projectPath: string): DetectionResult[] {
    const results: DetectionResult[] = [];
    const seen = new Set<Framework>();

    // 1. Check for config files at the project root (high confidence)
    for (const [framework, sig] of Object.entries(SIGNATURES) as [
        Exclude<Framework, 'unknown'>,
        FrameworkSignature,
    ][]) {
        for (const configFile of sig.configFiles) {
            const fullPath = path.join(projectPath, configFile);
            if (existsSync(fullPath)) {
                if (seen.has(framework)) break;
                seen.add(framework);
                results.push({
                    framework,
                    testDir: extractTestDir(framework, fullPath, projectPath),
                    confidence: 'high',
                });
                break; // found a config for this framework, move to next framework
            }
        }
    }

    // 2. Search nested directories for frameworks not yet found (monorepo support)
    const nestedConfigGlobs: Partial<Record<Exclude<Framework, 'unknown'>, string>> = {
        playwright: '**/playwright.config.{ts,js,mjs}',
        cypress: '**/cypress.config.{ts,js}',
        vitest: '**/vitest.config.{ts,js}',
        cucumber: '**/*.feature',
    };

    for (const [framework, glob] of Object.entries(nestedConfigGlobs) as [Exclude<Framework, 'unknown'>, string][]) {
        if (seen.has(framework)) continue;

        const matches = globSync(glob, {
            cwd: projectPath,
            ignore: ['**/node_modules/**', '**/dist/**'],
            absolute: true,
        });

        if (matches.length > 0) {
            seen.add(framework);

            if (framework === 'cucumber') {
                // Cucumber: find all distinct "features" root directories so that
                // monorepos with multiple projects (e.g. ios + android) and multiple
                // subdirectories (productDiscovery, confidenceToBy, …) are all captured.
                const testDirs = findCucumberTestDirs(matches, projectPath);
                for (const testDir of testDirs) {
                    results.push({ framework, testDir, confidence: 'high' });
                }
            } else {
                const configPath = matches[0];
                results.push({
                    framework,
                    testDir: extractTestDir(framework, configPath, projectPath),
                    confidence: 'high',
                });
            }
        }
    }

    // 3. Fall back to package.json dependency inspection for remaining frameworks
    const pkgResults = detectAllFromPackageJson(projectPath, seen);
    results.push(...pkgResults);

    if (results.length === 0) {
        return [{ framework: 'unknown', testDir: './tests', confidence: 'low' }];
    }

    return results;
}

// ─── Helpers ────────────────────────────────────────────────────────

/**
 * Dispatch to the framework-specific testDir extractor.
 * Called from both root-level and nested config detection paths.
 */
function extractTestDir(framework: Exclude<Framework, 'unknown'>, configPath: string, projectPath: string): string {
    switch (framework) {
        case 'playwright':
            return extractPlaywrightTestDir(configPath, projectPath);
        case 'cypress':
            return extractCypressTestDir(configPath, projectPath);
        case 'vitest':
            return extractVitestTestDir(configPath, projectPath);
        case 'cucumber':
            return extractCucumberTestDir(configPath, projectPath);
        default:
            return guessTestDir(projectPath);
    }
}

function extractPlaywrightTestDir(configPath: string, projectPath: string): string {
    try {
        const content = readFileSync(configPath, 'utf-8');

        // testDir: './path' or testDir: "path"
        const match = content.match(/testDir\s*:\s*['"`]([^'"`]+)['"`]/);
        if (match) {
            // Return as a path relative to the project root
            const configDir = path.dirname(configPath);
            const absoluteTestDir = path.resolve(configDir, match[1]);
            return './' + path.relative(projectPath, absoluteTestDir);
        }
    } catch {
        // Unparseable config — fall through
    }

    return guessTestDir(projectPath);
}

function extractCypressTestDir(configPath: string, projectPath: string): string {
    try {
        const content = readFileSync(configPath, 'utf-8');
        // specPattern: 'path/**/*.cy.ts' or e2e: { specPattern: ... }
        const specPattern = content.match(/specPattern\s*:\s*['"\`]([^'"\`]+)['"\`]/);
        if (specPattern) {
            // Extract the directory portion of the glob pattern
            const dir = specPattern[1].replace(/\*.*$/, '').replace(/\/$/, '');
            if (dir) return './' + dir;
        }
    } catch {
        // Unparseable config — fall through
    }

    // Cypress default: cypress/e2e
    const defaultDir = './cypress/e2e';
    if (existsSync(path.join(projectPath, defaultDir))) return defaultDir;

    // Fallback to legacy cypress/integration
    const legacyDir = './cypress/integration';
    if (existsSync(path.join(projectPath, legacyDir))) return legacyDir;

    return defaultDir;
}

/**
 * Given an absolute path to a .feature file, returns the "features" root directory
 * by walking up the path to find the deepest directory named "features".
 * Falls back to the file's direct parent directory.
 */
function findCucumberFeaturesDir(featureFilePath: string, projectPath: string): string {
    const relDir = path.relative(projectPath, path.dirname(featureFilePath));
    const parts = relDir.split(path.sep);

    // Find the deepest directory segment named "features"
    let lastFeaturesIdx = -1;
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === 'features') lastFeaturesIdx = i;
    }

    if (lastFeaturesIdx >= 0) {
        return path.join(projectPath, ...parts.slice(0, lastFeaturesIdx + 1));
    }

    return path.dirname(featureFilePath);
}

/**
 * Given a list of absolute .feature file paths, returns unique testDir strings
 * (relative to projectPath) by grouping files by their "features" root directory.
 * This allows a monorepo with e.g. ios/features/ and android/features/ to produce
 * two separate DetectionResults instead of collapsing to a single common ancestor.
 */
function findCucumberTestDirs(featureFiles: string[], projectPath: string): string[] {
    const dirs = new Set<string>();
    for (const file of featureFiles) {
        const featuresDir = findCucumberFeaturesDir(file, projectPath);
        const relative = path.relative(projectPath, featuresDir);
        dirs.add(relative ? './' + relative.replace(/\\/g, '/') : '.');
    }
    return [...dirs];
}

function extractCucumberTestDir(featureFilePath: string, projectPath: string): string {
    // For root-level config files (cucumber.properties etc.), glob for .feature files
    // to discover where they live. For nested detection the caller now uses
    // findCucumberTestDirs() directly, so this path handles root-config only.
    const isFeatureFile = featureFilePath.endsWith('.feature');

    const featureFiles = isFeatureFile
        ? [featureFilePath]
        : globSync('**/*.feature', {
              cwd: projectPath,
              ignore: ['**/node_modules/**', '**/dist/**'],
              absolute: true,
          });

    if (featureFiles.length === 0) {
        const featuresDir = path.join(projectPath, 'features');
        if (existsSync(featuresDir)) return './features';
        return '.';
    }

    // Use the same grouping logic and return the first dir found
    return findCucumberTestDirs(featureFiles, projectPath)[0];
}

function extractVitestTestDir(_configPath: string, _projectPath: string): string {
    // Vitest is designed for co-located tests scattered throughout the project.
    // Using '.' (project root) lets the **/*.test.ts glob find them all regardless
    // of where they live — next to components, inside __tests__ folders, etc.
    return '.';
}

function guessTestDir(projectPath: string): string {
    const candidates = [
        './tests',
        './test',
        './e2e',
        './cypress/e2e',
        './cypress/integration',
        './src',
        './playwright/e2e/tests',
        './playwright/tests',
        './src/tests',
        './src/test',
    ];

    for (const candidate of candidates) {
        if (existsSync(path.join(projectPath, candidate))) {
            return candidate;
        }
    }

    return './tests';
}

function detectAllFromPackageJson(projectPath: string, alreadySeen: Set<Framework>): DetectionResult[] {
    const pkgPath = path.join(projectPath, 'package.json');
    if (!existsSync(pkgPath)) return [];

    const results: DetectionResult[] = [];
    try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        const allDeps: Record<string, string> = {
            ...pkg.dependencies,
            ...pkg.devDependencies,
        };

        for (const [framework, sig] of Object.entries(SIGNATURES) as [
            Exclude<Framework, 'unknown'>,
            FrameworkSignature,
        ][]) {
            if (alreadySeen.has(framework)) continue;
            if (sig.packageDeps.some((dep) => dep in allDeps)) {
                alreadySeen.add(framework);
                results.push({
                    framework,
                    testDir: guessTestDir(projectPath),
                    confidence: 'medium',
                });
            }
        }
    } catch {
        // Malformed package.json
    }

    return results;
}
