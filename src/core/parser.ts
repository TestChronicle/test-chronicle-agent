import { readFileSync, statSync } from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { Framework, SpecFile } from '../types';
import {
  parsePlaywrightSpec,
  extractTestNames as playwrightExtractNames,
} from './frameworks/playwright';
import {
  parseCypressSpec,
  extractTestNames as cypressExtractNames,
} from './frameworks/cypress';
import {
  parseVitestSpec,
  extractTestNames as vitestExtractNames,
} from './frameworks/vitest';
import {
  parseTestNGSpec,
  extractTestNames as testngExtractNames,
} from './frameworks/testng';
import {
  parseJUnitSpec,
  extractTestNames as junitExtractNames,
} from './frameworks/junit';

// ─── Public API ───────────────────────────────────────────────────────────────

export function parseSpecFile(
  filePath: string,
  content: string,
  projectRoot: string,
  framework: Framework
): SpecFile {
  let spec: SpecFile;

  switch (framework) {
    case 'playwright':
      spec = parsePlaywrightSpec(filePath, content, projectRoot);
      break;
    case 'cypress':
      spec = parseCypressSpec(filePath, content, projectRoot);
      break;
    case 'vitest':
      spec = parseVitestSpec(filePath, content, projectRoot);
      break;
    case 'testng':
      spec = parseTestNGSpec(filePath, content, projectRoot);
      break;
    case 'junit':
      spec = parseJUnitSpec(filePath, content, projectRoot);
      break;
    default:
      throw new Error(`Framework '${framework}' not supported`);
  }

  // Stamp lastModified from the actual file, not parse time
  try {
    spec.lastModified = statSync(filePath).mtime.toISOString();
  } catch {
    // File may not exist if parsing historical content from git — keep default
  }

  return spec;
}

/** Extract test names from raw file content without constructing a full SpecFile. */
export function extractTestNamesFromContent(content: string, framework: Framework): string[] {
  switch (framework) {
    case 'playwright':
      return playwrightExtractNames(content);
    case 'cypress':
      return cypressExtractNames(content);
    case 'vitest':
      return vitestExtractNames(content);
    case 'testng':
      return testngExtractNames(content);
    case 'junit':
      return junitExtractNames(content);
    default:
      return [];
  }
}

/** Resolve all spec files under testDir for the given framework. */
export function findSpecFiles(
  projectRoot: string,
  testDir: string,
  framework: Framework
): string[] {
  // Each framework has different test file patterns
  const patterns = getTestFilePatterns(framework);

  const baseDir = path.resolve(projectRoot, testDir);

  return globSync(patterns, {
    cwd: baseDir,
    absolute: true,
    ignore: ['**/node_modules/**'],
  });
}

/**
 * Get test file patterns for each framework.
 * Frameworks may look for different file naming conventions.
 */
function getTestFilePatterns(framework: Framework): string[] {
  switch (framework) {
    case 'playwright':
      return ['**/*.spec.ts', '**/*.spec.js', '**/*.spec.mjs'];
    case 'cypress':
      return ['**/*.cy.ts', '**/*.cy.js', '**/*.spec.ts', '**/*.spec.js'];
    case 'vitest':
      return ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js'];
    case 'testng':
      return ['**/*Test.java', '**/*Tests.java', '**/*TestCase.java'];
    case 'junit':
      return ['**/*Test.java', '**/*Tests.java', '**/*TestCase.java'];
    default:
      return ['**/*.spec.ts', '**/*.spec.js', '**/*.test.ts', '**/*.test.js'];
  }
}

/** Parse all spec files in a project directory. */
export function parseAllSpecs(
  projectRoot: string,
  testDir: string,
  framework: Framework
): SpecFile[] {
  const files = findSpecFiles(projectRoot, testDir, framework);

  return files.map((filePath) => {
    const content = readFileSync(filePath, 'utf-8');
    return parseSpecFile(filePath, content, projectRoot, framework);
  });
}
