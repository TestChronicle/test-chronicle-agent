# Contributing to test-chronicle-agent

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/TestChronicle/test-chronicle-agent.git
cd test-chronicle-agent

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## Development Workflow

### Making Changes

1. **Create a branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and ensure code quality:
   ```bash
   # Run tests while developing
   npm run test:watch

   # Build to check for TypeScript errors
   npm run build

   # Run all tests before committing
   npm test
   ```

3. **Commit with clear messages**:
   ```bash
   git commit -m "feat: description of your change"
   git commit -m "fix: description of your fix"
   git commit -m "docs: update documentation"
   ```

4. **Push and create a Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style

- **TypeScript**: Always use TypeScript, enable `strict: true`
- **Formatting**: The project uses tsup for bundling (no Prettier configured)
- **Testing**: Co-locate tests with source files using `.spec.ts` suffix
- **Comments**: Add JSDoc comments for public APIs
- **No console logs**: Use proper logging or let stderr/stdout speak

### Example TypeScript Structure

```typescript
/**
 * Parse a test file for the given framework
 * @param filePath - Absolute path to test file
 * @param content - File content
 * @returns Parsed test specifications
 */
export function parseTestFile(filePath: string, content: string): SpecFile {
  // Implementation
}
```

## Testing

### Running Tests

```bash
# Run all tests once
npm test

# Run in watch mode (useful during development)
npm run test:watch

# Run a specific test file
npm test src/core/detector.spec.ts
```

### Writing Tests

Use the standard pattern (see `src/**/*.spec.ts` files):

```typescript
import { describe, it, expect, beforeEach } from 'vitest'

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
  })

  it('should do something', () => {
    // Arrange
    const input = 'test'

    // Act
    const result = myFunction(input)

    // Assert
    expect(result).toBe('expected')
  })
})
```

### Test Coverage Goals

- **Phase 1** (DONE): 65% - Core functionality tested
- **Phase 2** (TBD): 75% - Framework-specific parsers tested
- **Phase 3** (TBD): 85%+ - All commands fully tested

See [docs/TEST_COVERAGE_PLAN.md](./docs/TEST_COVERAGE_PLAN.md) for details.

## Repository Structure

```
test-chronicle-agent/
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── action.ts           # GitHub Action entry point
│   ├── index.ts            # Library exports
│   ├── types.ts            # Type definitions
│   ├── commands/           # CLI commands (sync, init)
│   ├── core/               # Core parsing logic
│   │   ├── detector.ts     # Framework detection
│   │   ├── parser.ts       # Test parser dispatcher
│   │   └── frameworks/     # Framework-specific parsers
│   ├── git/                # Git history tracking
│   └── sync-client.ts      # Dashboard API client
├── docs/                   # Documentation
├── .github/workflows/      # CI/CD workflows
├── action.yml              # GitHub Action manifest
├── package.json
└── tsconfig.json
```

## Framework Support

To add support for a new test framework:

1. **Create parser** in `src/core/frameworks/{framework}.ts`:
   ```typescript
   import { IFrameworkParser } from '../base'

   export const myFrameworkParser: IFrameworkParser = {
     parseFile(filePath, content, projectRoot) {
       // Parse and extract test specs
     },
     extractTestNames(content) {
       // Quick extraction for git history
     },
     supportedFeatures: {
       tags: true,
       describes: true,
       parameterized: false,
       lineNumbers: true,
       asyncTests: true,
     },
   }
   ```

2. **Register in detector** at `src/core/detector.ts`:
   ```typescript
   if (packageDeps.includes('my-framework')) {
     return 'myframework'
   }
   ```

3. **Add tests** in `src/core/frameworks/{framework}.spec.ts`

4. **Update docs**: Add to [README.md](./README.md) supported frameworks list

## Commit Message Guidelines

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions/changes
- `chore:` - Build, dependencies, configuration
- `perf:` - Performance improvements
- `refactor:` - Code restructuring without behavior change

Example:
```
feat: add support for Cypress framework

- Implement CypressParser for test detection
- Add framework detection for Cypress config
- Include 8 tests for parser functionality

Closes #42
```

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a commit: `git commit -m "chore: release v0.x.0"`
4. Tag the release: `git tag v0.x.0`
5. Push: `git push origin main --tags`
6. GitHub Actions automatically builds and creates a release

See [PRE_RELEASE.md](./PRE_RELEASE.md) for detailed release checklist.

## Documentation

- **README.md** - User-facing documentation
- **docs/SYNC_WORKFLOW.md** - Setup and usage guide
- **docs/TESTING.md** - Testing guide and coverage plan
- **docs/GITHUB_ACTION_SETUP.md** - Action-specific setup
- **CHANGELOG.md** - Version history

## Issues & Questions

- **Bug reports**: Include reproduction steps and environment info
- **Feature requests**: Describe the use case and expected behavior
- **Questions**: Check existing issues and documentation first

## Code Review

All contributions require code review:

1. Ensure tests pass: `npm test`
2. Ensure build succeeds: `npm run build`
3. Follow code style guidelines
4. Provide clear descriptions for PRs
5. Be open to feedback

## License

By contributing, you agree that your contributions will be licensed under the MIT License (see [LICENSE](./LICENSE)).

---

Thank you for contributing to test-chronicle-agent! 🎉
