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
};

// ─── Public API ───────────────────────────────────────────────────────────────

export function detectFramework(projectPath: string): DetectionResult {
  // 1. Check for config files at the project root
  for (const [framework, sig] of Object.entries(SIGNATURES) as [
    Exclude<Framework, 'unknown'>,
    FrameworkSignature,
  ][]) {
    for (const configFile of sig.configFiles) {
      const fullPath = path.join(projectPath, configFile);
      if (existsSync(fullPath)) {
        let testDir: string;
        
        // Extract testDir from framework-specific config files
        if (framework === 'playwright') {
          testDir = extractPlaywrightTestDir(fullPath, projectPath);
        } else if (framework === 'vitest') {
          testDir = extractVitestTestDir(fullPath, projectPath);
        } else {
          testDir = guessTestDir(projectPath);
        }
        
        return { framework, testDir, confidence: 'high' };
      }
    }
  }

  // 2. Search nested directories (monorepo support)
  const nestedPlaywright = globSync('**/playwright.config.{ts,js,mjs}', {
    cwd: projectPath,
    ignore: ['**/node_modules/**', '**/dist/**'],
    absolute: true,
  });

  if (nestedPlaywright.length > 0) {
    const configPath = nestedPlaywright[0];
    const testDir = extractPlaywrightTestDir(configPath, projectPath);
    return { framework: 'playwright', testDir, confidence: 'high' };
  }

  // 3. Fall back to package.json dependency inspection
  const depsResult = detectFromPackageJson(projectPath);
  if (depsResult) return depsResult;

  return { framework: 'unknown', testDir: './tests', confidence: 'low' };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function extractVitestTestDir(_configPath: string, projectPath: string): string {
  // Vitest tests can be scattered throughout the project matching *.spec.ts or *.test.ts
  // For now, just use guessTestDir since we don't parse the vitest config
  return guessTestDir(projectPath);
}

function guessTestDir(projectPath: string): string {
  const candidates = [
    './tests',
    './test',
    './e2e',
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

function detectFromPackageJson(projectPath: string): DetectionResult | null {
  const pkgPath = path.join(projectPath, 'package.json');
  if (!existsSync(pkgPath)) return null;

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
      if (sig.packageDeps.some((dep) => dep in allDeps)) {
        return {
          framework,
          testDir: guessTestDir(projectPath),
          confidence: 'medium',
        };
      }
    }
  } catch {
    // Malformed package.json
  }

  return null;
}
