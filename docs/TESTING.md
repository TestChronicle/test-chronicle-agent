# Testing Guide

## Test Structure

This project follows industry-standard testing practices with **co-located test files** - tests live next to their source code.

### Directory Layout

```
src/
├── commands/
│   ├── sync.ts
│   ├── sync.spec.ts          ✅ Complete
│   ├── init.ts
│   └── init.spec.ts          ⏳ Phase 3
├── core/
│   ├── parser.ts
│   ├── parser.spec.ts        ✅ Complete (29 tests)
│   ├── detector.ts
│   ├── detector.spec.ts      ✅ Complete
│   ├── frameworks/
│   │   ├── playwright.ts
│   │   ├── playwright.spec.ts ⏳ Phase 2
│   │   ├── cypress.ts
│   │   ├── cypress.spec.ts    ⏳ Phase 2
│   │   ├── vitest.ts
│   │   ├── vitest.spec.ts     ⏳ Phase 2
│   │   ├── testng.ts
│   │   ├── testng.spec.ts     ⏳ Phase 2
│   │   ├── junit.ts
│   │   ├── junit.spec.ts      ⏳ Phase 2
│   │   └── common.ts          (Pure utilities, tested via parsers)
│   └── base.ts                (Interfaces only, no tests needed)
├── git/
│   ├── history.ts
│   └── history.spec.ts        ✅ Complete (19 tests)
└── sync-client.ts
    └── sync-client.spec.ts    ✅ Complete (21 tests)
```

### Test File Conventions

**Naming:**
- Test files use `.spec.ts` suffix
- Located in same directory as source
- Same relative path structure as `src/`

**Example:**
```
src/commands/sync.ts       → src/commands/sync.spec.ts
src/core/parser.ts         → src/core/parser.spec.ts
src/git/history.ts         → src/git/history.spec.ts
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-run on changes)
npm run test:watch

# Run specific test file
npm test sync.spec.ts

# Run with coverage (when implemented)
npm test -- --coverage
```

## Test Structure (Test Anatomy)

All tests follow this proven pattern:

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('Module Name', () => {
  // Setup before each test
  beforeEach(() => {
    // Reset mocks, clear state
    vi.clearAllMocks()
  })

  // Cleanup after each test
  afterEach(() => {
    // Restore original behavior
    vi.clearAllMocks()
  })

  describe('Feature Area', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test data'

      // Act
      const result = myFunction(input)

      // Assert
      expect(result).toBe('expected output')
    })

    it('should handle edge cases', () => {
      expect(() => myFunction(null)).toThrow('Error message')
    })
  })
})
```

## Test Categories

### Unit Tests (Existing + Needed)

Test individual functions in isolation:

**Existing:**
- `sync.spec.ts` - Tests sync command validation, payload building, error handling
- `detector.spec.ts` - Tests framework detection logic

**Needed:**
- `history.spec.ts` - Test git history building, test name extraction, diff logic
- `parser.spec.ts` - Test spec parsing dispatch logic
- `**/frameworks/*.spec.ts` - Framework-specific parsing (7 files)
- `init.spec.ts` - Test init command flow
- `sync-client.spec.ts` - Test API communication

### Integration Tests (Optional - Future)

Test workflows across modules:

```
tests/integration/
├── full-sync.spec.ts        # Full sync workflow
├── history-parsing.spec.ts  # Git + parsing together
└── framework-detection.spec.ts # Detection with parsing
```

### E2E Tests (Optional - Future)

Test against real dashboard (if needed).

## Best Practices

### 1. **Isolation**
Each test should be independent:
```typescript
// ✅ Good - Each test is isolated
it('should parse playwright tests', () => { ... })
it('should parse cypress tests', () => { ... })

// ❌ Bad - Tests depend on each other
it('should parse playwright tests', () => { ... })
it('should verify playwright tests were parsed', () => { ... })
```

### 2. **Clear Test Names**
Use descriptive names that explain the scenario:
```typescript
// ✅ Good
it('should extract test names from Playwright describe blocks')
it('should handle modified files with test removals and additions')
it('should fail gracefully when git history is unavailable')

// ❌ Bad
it('should work')
it('test parser')
it('handles errors')
```

### 3. **Arrange-Act-Assert**
Structure tests with clear phases:
```typescript
it('should deduplicate identical test changes', () => {
  // Arrange - Set up test data
  const changes = [
    { type: 'added', name: 'test1' },
    { type: 'added', name: 'test1' }, // Duplicate
  ]

  // Act - Execute function
  const result = deduplicateChanges(changes)

  // Assert - Verify results
  expect(result).toHaveLength(1)
  expect(result[0].name).toBe('test1')
})
```

### 4. **Mock External Dependencies**
Use `vi.mock()` for external modules:
```typescript
vi.mock('../git', () => ({
  buildHistory: vi.fn(),
}))

// In test:
vi.mocked(buildHistory).mockResolvedValue([])
```

### 5. **Test Error Cases**
Include tests for failures and edge cases:
```typescript
describe('error handling', () => {
  it('should throw on invalid framework', () => {
    expect(() => {
      parseSpecFile('file.ts', 'content', '/root', 'unknown')
    }).toThrow('Framework not supported')
  })

  it('should return empty array for unparseable content', () => {
    const result = extractTestNames('not code', 'playwright')
    expect(result).toEqual([])
  })
})
```

## Coverage Goals

**Current:** ~17% coverage
**Target:** ≥80% coverage

Priority order:
1. **Critical path** (sync, history, parser) - 95%+
2. **Framework parsers** - 85%+ each
3. **Commands** (init, sync) - 80%+
4. **Utilities** - 75%+

## Framework Parser Testing

Each framework parser needs tests for:

```typescript
describe('Playwright Parser', () => {
  describe('parsePlaywrightSpec()', () => {
    it('should extract describe blocks and tests')
    it('should handle nested describe blocks')
    it('should extract inline tags')
    it('should detect parameterized tests')
    it('should handle .skip and .only modifiers')
  })

  describe('extractTestNames()', () => {
    it('should return only test names without full parsing')
    it('should include describe block names')
    it('should handle edge cases and malformed code')
  })
})
```

## CI/CD Integration

Tests should run on every commit (add to GitHub Actions):

```yaml
- name: Run tests
  run: npm test

- name: Generate coverage report
  run: npm test -- --coverage  # Once coverage is set up

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Debugging Tests

```bash
# Run single test file with verbose output
npm test sync.spec.ts -- --reporter=verbose

# Run specific test by name
npm test -- -t "should detect framework"

# Run tests matching pattern
npm test -- -t "parser"

# Debug in VS Code
# Add to launch.json:
{
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
  "args": ["run", "${relativeFile}"],
  "runtimeArgs": ["--inspect-brk"]
}
```

## Resources

- **Vitest Docs**: https://vitest.dev/
- **Testing Best Practices**: https://github.com/goldbergyoni/javascript-testing-best-practices
- **Jest CommonJS Patterns**: https://jestjs.io/docs/getting-started (many patterns apply to Vitest)
