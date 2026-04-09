# Contributing to test-chronicle-agent

## Getting Started

```bash
git clone https://github.com/TestChronicle/test-chronicle-agent.git
cd test-chronicle-agent
npm install
npm run build
npm test
```

## Development Workflow

1. **Create a branch**: `git checkout -b feature/your-feature-name`

2. **Develop and test**:

    ```bash
    npm run test:watch   # watch mode during development
    npm run build        # check for TypeScript errors
    npm test             # run all tests before committing
    ```

3. **Commit** using [conventional commits](#commit-messages) and open a PR.

## Repository Structure

```
test-chronicle-agent/
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── action.ts           # GitHub Action entry point
│   ├── index.ts            # Library exports
│   ├── types.ts            # Type definitions
│   ├── sync.ts             # Core sync logic
│   ├── sync-client.ts      # Dashboard API client
│   ├── core/               # Test parsing
│   │   ├── detector.ts     # Framework detection
│   │   ├── parser.ts       # Parser dispatcher
│   │   └── frameworks/     # Per-framework parsers (playwright, cypress, vitest, testng, junit)
│   └── git/                # Git history tracking
├── test/                   # Test suite
├── action.yml              # GitHub Action manifest
└── package.json
```

## Adding a Framework

1. **Create parser** in `src/core/frameworks/{framework}.ts` implementing `IFrameworkParser` from `../base`:

    ```typescript
    import type { IFrameworkParser } from '../base';

    export const myFrameworkParser: IFrameworkParser = {
        parseFile(filePath, content, projectRoot) {
            // Return a SpecFile with discovered tests
        },
        extractTestNames(content) {
            // Lightweight extraction used by git history diffing
        },
        supportedFeatures: {
            tags: true,
            describes: true,
            parameterized: false,
            lineNumbers: true,
            asyncTests: true,
        },
    };
    ```

2. **Register** the framework in `src/core/detector.ts`.

3. **Add tests** in `test/core/frameworks/{framework}.spec.ts`.

4. **Update** the supported frameworks list in [README.md](./README.md).

## Commit Messages

Follow [conventional commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `test:` — test additions/changes
- `chore:` — build, dependencies, configuration
- `refactor:` — code restructuring without behavior change

## Release Process

1. Update the version in `package.json`
2. Create and push a tag: `git tag v0.x.0 && git push origin v0.x.0`
3. GitHub Actions builds and publishes the release automatically

## License

By contributing, you agree that your contributions will be licensed under the MIT License (see [LICENSE](./LICENSE)).
