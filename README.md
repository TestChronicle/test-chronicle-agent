# test-chronicle-agent

CLI agent for syncing test data to the test-chronicle dashboard.

## Installation

```bash
npm install test-chronicle-agent
```

Or with yarn:

```bash
yarn add test-chronicle-agent
```

## Quick Start

### 1. Register Your Project

```bash
test-chronicle-agent init --path /path/to/your/project
```

This will:
- Auto-detect your test framework (Playwright, Cypress, Vitest, Jest, TestNG, JUnit)
- Create a project in the dashboard
- Output your project ID

### 2. Configure Your Project

Add the generated project ID to your `.env.local`:

```bash
CHRONICLE_API_KEY=<your-api-key>
CHRONICLE_PROJECT_ID=<project-id>
CHRONICLE_DASHBOARD_URL=http://localhost:3000  # optional
```

### 3. Sync Test Data

```bash
test-chronicle-agent sync
```

This will:
- Parse your test files
- Build git history for test changes
- Upload specs and history to the dashboard

## Supported Frameworks

- **JavaScript/TypeScript**
  - Playwright
  - Cypress
  - Vitest
- **Java**
  - TestNG
  - JUnit 4/5

## Environment Variables

- `CHRONICLE_API_KEY` (required) - Your API key from the dashboard
- `CHRONICLE_PROJECT_ID` (required) - Project ID from init command
- `CHRONICLE_DASHBOARD_URL` (optional) - Dashboard URL, defaults to http://localhost:3000

## License

MIT
