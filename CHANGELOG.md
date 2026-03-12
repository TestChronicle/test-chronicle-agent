# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-03-12

### Added
- **Incremental syncing**: Sync only new test commits since the last sync, dramatically reducing duplicate data
- Dashboard-backed sync markers: Last synced commit hash is now persisted on the dashboard
- New API endpoints for sync marker management:
  - `GET /api/projects/{projectId}/sync-marker` - Retrieve last synced commit
  - `POST /api/projects/{projectId}/sync-marker` - Save last synced commit
- 2 new tests for sync marker functionality (86 total tests)
- Enhanced logging for sync marker operations

### Changed
- Sync workflow now uses `sinceCommit` parameter to fetch only new commits from git
- Improved error handling for sync marker operations with graceful fallback to full history

### Fixed
- Removed unused fs imports in sync command

## [0.2.0] - 2026-03-11

### Added
- Phase 1 test implementation complete: 69 new tests across 3 test files
- Comprehensive test coverage for sync functionality
- Framework detection tests
- Git history tracking tests

### Changed
- Test coverage increased from 17% to 65%

## [0.1.0] - Initial Release

### Added
- Initial sync CLI implementation
- Framework detection (Vitest, Playwright, Cypress, TestNG, JUnit)
- Test spec file parsing
- Git history tracking
- Dashboard sync API integration
