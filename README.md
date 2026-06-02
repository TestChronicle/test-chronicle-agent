# testchronicle

Keep your test suite visible. Sync test specs and history to your dashboard automatically.

## Local NPM Usage

Link a local repository to your Test Chronicle account:

```bash
npx testchronicle@latest login
```

The login command opens a browser, lets you select or create a project, writes a non-secret
`testchronicle.config.json` file in the repository, and stores the project-scoped agent token
in your user config directory.

Run a sync locally:

```bash
npx testchronicle@latest sync
```

Check or remove the local link:

```bash
npx testchronicle@latest status
npx testchronicle@latest logout
```

## GitHub Action

Use the GitHub Action to sync tests on merges to main:

```yaml
name: Sync Tests to Chronicle

on:
  push:
    branches: [main]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 0

      - uses: TestChronicle/test-chronicle-agent@v0
        with:
          API_KEY: ${{ secrets.API_KEY }}
          PROJECT_ID: ${{ secrets.PROJECT_ID }}
```

## CI Environment Variables

For CI or scripts, set:

- `API_KEY`: personal or team API key
- `PROJECT_ID`: Test Chronicle project ID

Environment variables take precedence over local login credentials.

## Supported Frameworks

See [Framework Support](https://www.testchronicle.com/#framework-support).

## What Gets Synced

- Test specifications, names, paths, and structure
- Test file changes from git history
- Author information and timestamps

## License

MIT. See [LICENSE](./LICENSE).
