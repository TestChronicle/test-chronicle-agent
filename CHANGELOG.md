# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-03-13

### Added

- **GitHub Action** - Drop-in action for any workflow to sync tests automatically
- **CLI agent** - Run locally with `test-chronicle-agent sync`
- **Multi-framework support**:
    - Vitest - Modern JavaScript unit testing
    - Playwright - End-to-end testing
    - Cypress - End-to-end testing
    - Jest - JavaScript unit testing
    - TestNG - Java testing
    - JUnit - Java testing
- **Automatic framework detection** - No configuration needed
- **Test specification parsing** - Extracts test names, paths, and structure
- **Git history tracking** - Tracks test changes across commits
- **Incremental syncing** - Only syncs new commits since last sync
- **Dashboard integration** - Fully synced with Test Chronicle dashboard
- **Type definitions** - Full TypeScript support included
- **Comprehensive testing** - 86 tests with 65% coverage
