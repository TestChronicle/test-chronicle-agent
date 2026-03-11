/**
 * Base framework parser interface
 *
 * All framework-specific parsers implement this interface.
 * This defines the contract for detecting and parsing test specifications
 * across different test frameworks.
 *
 * See: docs/FRAMEWORK_ARCHITECTURE.md
 */

import { SpecFile } from '../../types';

/**
 * Feature support matrix for a framework
 *
 * Frameworks may not support all features. For example:
 * - Java frameworks may not have "describe" blocks
 * - Some frameworks may not support inline tags
 * - Parameterization syntax varies widely
 *
 * This allows the UI/reporting to adapt based on framework capabilities.
 */
export interface FrameworkFeatures {
  /**
   * Can extract inline tags from test definitions?
   * E.g., @smoke, @critical, @slow
   */
  tags: boolean;

  /**
   * Supports describe/context/suite grouping?
   * E.g., describe() blocks in JS/TS
   */
  describes: boolean;

  /**
   * Supports parameterized/data-driven tests?
   * E.g., test.each() in Playwright, @Parameters in TestNG
   */
  parameterized: boolean;

  /**
   * Can accurately locate tests by line number?
   */
  lineNumbers: boolean;

  /**
   * Native async/promise-based test support?
   */
  asyncTests: boolean;
}

/**
 * Framework parser interface
 *
 * Implement this interface for each test framework to enable
 * test discovery and parsing in test-chronicle.
 */
export interface IFrameworkParser {
  /**
   * Parse a single test file and extract test specifications
   *
   * @param filePath - Absolute path to the test file
   * @param content - File content as string
   * @param projectRoot - Project root path (for calculating relative paths)
   * @returns SpecFile with all discovered tests
   */
  parseFile(
    filePath: string,
    content: string,
    projectRoot: string
  ): SpecFile;

  /**
   * Extract test names from file content (lightweight operation)
   *
   * Used by git history tracking to quickly identify which tests
   * were added/removed in a commit without full parsing.
   *
   * @param content - File content as string
   * @returns Array of test names (or full names if describes are supported)
   */
  extractTestNames(content: string): string[];

  /**
   * Framework capabilities and feature support
   *
   * Allows the system to know what metadata is available for this framework
   */
  supportedFeatures: FrameworkFeatures;
}

/**
 * Helper type for framework parser registry
 *
 * Usage:
 * ```typescript
 * const parsers: FrameworkParserRegistry = {
 *   playwright: playwrightParser,
 *   cypress: cypressParser,
 *   vitest: vitestParser,
 *   testng: testngParser,
 *   junit: junitParser,
 * };
 * ```
 */
export type FrameworkParserRegistry = Record<string, IFrameworkParser>;

/**
 * Common utilities for framework parsers
 *
 * These functions are implemented in common.ts and imported by all framework parsers:
 * - `hashId()` - Generate deterministic 8-char MD5 IDs
 * - `lineNumberAt()` - Calculate 1-based line numbers from position
 * - `findMatchingBrace()` - Find closing brace/bracket for nesting
 *
 * See common.ts for implementations.
 */

/**
 * Framework-specific pattern definitions
 *
 * Each framework module should define these patterns and use them
 * to locate and extract test information from source files.
 *
 * Example for Playwright:
 * ```typescript
 * const patterns = {
 *   describe: /test\.describe(?:\.(?:serial|parallel|skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g,
 *   test: /test(?:\.(?:skip|only|fixme))?\s*\(\s*(['"`])([\s\S]*?)\1/gm,
 *   tags: /\{\s*tag\s*:\s*(?:(['"`])([@\w\-/]+)\2|\[([^\]]+)\])/g,
 * };
 * ```
 */
export interface FrameworkPatterns {
  /**
   * Pattern to find describe/context/suite blocks
   *
   * Capture groups:
   *   - Group 1-2: The describe block name (including quotes)
   */
  describe?: RegExp;

  /**
   * Main pattern to find individual test definitions
   *
   * Capture groups:
   *   - Group 1-2: The test name (including quotes)
   */
  test: RegExp;

  /**
   * Pattern to find tags/labels within test context
   *
   * Supports multiple tag formats depending on framework
   */
  tags?: RegExp;

  /**
   * Pattern for parameterization markers
   *
   * Helps identify parameterized tests
   */
  parameterized?: RegExp;
}

/**
 * Detection result for a discovered test framework
 *
 * Returned by the detector module after analyzing a project
 */
export interface DetectionResult {
  /**
   * The detected framework name
   */
  framework: string;

  /**
   * Detected test directory (relative to project root)
   */
  testDir: string;

  /**
   * Confidence level of detection
   * - 'high': Found config file or multiple signatures
   * - 'medium': Found package dependency
   * - 'low': Found some indicators but uncertain
   */
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Framework signatures for detection
 *
 * Used by the detector module to identify frameworks
 */
export interface FrameworkSignature {
  /**
   * Config file names that uniquely identify this framework
   *
   * E.g., ['playwright.config.ts', 'playwright.config.js']
   */
  configFiles: string[];

  /**
   * NPM package names that indicate this framework
   *
   * E.g., ['@playwright/test', 'playwright']
   */
  packageDeps: string[];
}
