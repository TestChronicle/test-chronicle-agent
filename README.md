# test-chronicle-agent

Keep your test suite visible. Sync test specs and history to your dashboard automatically.

## Installation

```bash
npm install test-chronicle-agent
```

## Quick Start

### 1. Initialize

```bash
test-chronicle-agent init
```

Your test framework will be detected automatically. You'll get a **Project ID** to use next.

### 2. Configure

Add to `.env.local` in your project:

```bash
CHRONICLE_API_KEY=<your-api-key>
CHRONICLE_PROJECT_ID=<id-from-init>
```

Get your API key from your dashboard account settings.

### 3. Sync

```bash
test-chronicle-agent sync
```

Done! Your tests are now on your dashboard. Run sync again anytime you update your tests.

## Full Guide

For detailed setup, configuration, and CI/CD integration, see [SYNC_WORKFLOW.md](./docs/SYNC_WORKFLOW.md).

## Supported Frameworks

- **Vitest** - Modern JavaScript unit testing
- **Playwright** - End-to-end testing
- **Cypress** - End-to-end testing
- **Jest** - JavaScript unit testing
- **TestNG** - Java testing
- **JUnit** - Java testing

Framework detection is automatic. No configuration needed.

## Configuration

Create `.env.local` with:

```bash
CHRONICLE_API_KEY=<your-api-key>              # Required - get from dashboard
CHRONICLE_PROJECT_ID=<project-id>             # Required - from init command
CHRONICLE_DASHBOARD_URL=http://localhost:3000 # Optional
```

## What Gets Synced

- Test specifications (names, paths, structure)
- Test file changes from git history
- Author information
- Timestamps

This gives you a complete view of your test suite on the dashboard.

## Keep Tests Updated

**Local**: Run `test-chronicle-agent sync` after writing tests

**Automated**: Add to your CI/CD to sync automatically after every commit

## License

MIT - See [LICENSE](./LICENSE) file for details.
