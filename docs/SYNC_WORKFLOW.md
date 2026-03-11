# Getting Started: Syncing Your Tests to the Dashboard

This guide walks you through setting up test syncing for your project. Once configured, your tests will automatically sync to the dashboard, giving you a complete view of your test coverage and history.

## 5-Minute Quick Start

### 1. Initialize Your Project

Run this command in your project directory:

```bash
test-chronicle-agent init
```

The tool will:
- ✅ Detect your test framework automatically (Vitest, Playwright, Jest, etc.)
- ✅ Create a new project on your dashboard
- ✅ Give you a **Project ID**

You'll see output like:

```
📝 Initializing project
  Framework: vitest
  Name: my-app
  Test directory: ./tests
  Creating project... done

✓ Project created successfully!

Project ID: abc123def456

Next: Add to .env.local and run sync
  CHRONICLE_PROJECT_ID=abc123def456
  test-chronicle-agent sync
```

### 2. Save Your Project ID

Create or update `.env.local` in your project root:

```bash
CHRONICLE_API_KEY=your-api-key-from-dashboard
CHRONICLE_PROJECT_ID=abc123def456
```

(You get your API key from your dashboard account settings.)

### 3. Sync Your Tests

Run this command:

```bash
test-chronicle-agent sync
```

Your tests are now on the dashboard! You'll see:

```
🔍 Detecting framework...
✓ Detected framework: vitest

📝 Parsing test specifications...
✓ Found 45 spec files
  Total tests: 230

📊 Summary
  Specs: 45
  Tests: 230

🚀 Syncing to dashboard...
✓ Sync successful!
  Synced 45 specs with 230 tests
```

**That's it!** Your tests are now visible on your dashboard.

## What Happens When You Sync?

When you run `sync`, the tool:

1. **Finds your test files** - Automatically locates all tests in your project
2. **Extracts test details** - Gets test names, descriptions, and structure
3. **Captures test history** - Records when tests were added, modified, or removed (from git)
4. **Uploads everything** - Sends it all to your dashboard

### On Your Dashboard You'll See

- **Test Count** - Total number of tests in your project
- **Test Directory Structure** - Organized by file and test suite
- **Test Names** - Each individual test case
- **Test History** - Timeline of when tests were added or changed
- **Author Info** - Who made changes to tests

This gives you visibility into:
- 📊 Your total test coverage
- 📈 How your test suite is growing
- 🔍 Which tests are new vs. maintained
- 👥 Who on your team is writing tests

## Supported Frameworks

The tool automatically detects and works with these frameworks:

- ✅ **Vitest** - Modern, fast unit testing
- ✅ **Playwright** - End-to-end testing
- ✅ **Cypress** - End-to-end testing
- ✅ **Jest** - JavaScript unit testing
- ✅ **TestNG** - Java testing
- ✅ **JUnit** - Java testing

**No configuration needed** - just run `init` and it will detect your framework automatically.

## Configuration

### Your Project's `.env.local` File

Create a `.env.local` file in your project root with:

```bash
# Your API key (get this from your dashboard account settings)
CHRONICLE_API_KEY=your-api-key-here

# Your project ID (from running test-chronicle-agent init)
CHRONICLE_PROJECT_ID=project-id-here

# Optional: Dashboard URL (defaults to http://localhost:3000)
CHRONICLE_DASHBOARD_URL=https://your-dashboard-url
```

That's all you need to configure. Everything else is detected automatically.

## Keep Your Dashboard Updated

### Local Development

After writing or updating tests, sync them to the dashboard:

```bash
# Run your tests
npm test

# Sync to dashboard
test-chronicle-agent sync
```

### Automatic Syncing (CI/CD)

Set up automatic syncing in your CI/CD pipeline so tests are always up-to-date:

**GitHub Actions Example:**

```yaml
name: Sync Tests

on: [push]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Sync tests to dashboard
        run: npx test-chronicle-agent sync
        env:
          CHRONICLE_API_KEY: ${{ secrets.CHRONICLE_API_KEY }}
          CHRONICLE_PROJECT_ID: ${{ secrets.CHRONICLE_PROJECT_ID }}
```

This ensures your dashboard always reflects your latest tests.

## Common Questions & Troubleshooting

### I ran `init` but the dashboard didn't recognize my project

Make sure you have a valid `CHRONICLE_API_KEY` in your `.env.local`. You can get this from your dashboard account settings.

### Sync says "Found 0 spec files"

Your tests might not be in an expected location. Check:

- Are your test files named `*.spec.ts`, `*.spec.js`, `*.test.ts`, or `*.test.js`?
- Are they in one of these common locations?
  - `./tests/` or `./test/`
  - `./src/` (works for Vitest)
  - `./e2e/` (for E2E tests)

If tests are in an unusual location, you can create `test-chronicle.config.json`:

```json
{
  "testDir": "./custom/test/directory"
}
```

### "Network error - failed to reach dashboard"

Check:
- Your `CHRONICLE_DASHBOARD_URL` is correct
- The dashboard is running and accessible
- Try `http://` instead of `https://` if you're running locally

### Tests sync but I don't see them on the dashboard

After syncing:
1. Reload your dashboard
2. Make sure you're looking at the right project
3. Check that no errors appeared during sync

### How often should I sync?

There's no limit! Sync:
- After merging test changes
- Before important meetings or reviews
- In your CI/CD pipeline automatically

The more frequently you sync, the more accurate your dashboard view.
