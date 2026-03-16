# test-chronicle-agent

Keep your test suite visible. Sync test specs and history to your dashboard automatically.

## 🚀 GitHub Action

Use test-chronicle-agent as a GitHub Action to automatically sync your tests on every push:

```yaml
name: 🔄 Sync Tests to Chronicle

on:
  push:
    branches: [main]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - uses: TestChronicle/test-chronicle-agent@v0.1.0
        with:
          api-key: ${{ secrets.CHRONICLE_API_KEY }}
          project-id: ${{ secrets.CHRONICLE_PROJECT_ID }}
```

### Setup Instructions

1. **Create a project on the dashboard**
   - Go to your Test Chronicle dashboard
   - Create a new project and copy the Project ID

2. **Get your API key**
   - From your Test Chronicle dashboard settings
   - Copy your personal API key

3. **Add secrets to GitHub**
   - Go to Settings → Secrets and variables → Actions
   - Add `CHRONICLE_API_KEY` with your API key
   - Add `CHRONICLE_PROJECT_ID` with your project ID

4. **Add the workflow** to your repository

That's it! Your tests will sync automatically on every push.

### Using Full History on First Sync

If you've reorganized your test structure during development (e.g., moved tests between directories), use the `full-history` flag on your first sync to capture the complete history:

```yaml
- uses: TestChronicle/test-chronicle-agent@v1
  with:
    api-key: ${{ secrets.CHRONICLE_API_KEY }}
    project-id: ${{ secrets.CHRONICLE_PROJECT_ID }}
    full-history: true  # Scan all repo commits for test changes
```

## 🎯 Supported Frameworks

| Framework | Test Names | Specs | Tags | Parameterized |
|-----------|:----------:|:-----:|:----:|:-------------:|
| Playwright | ✅ | ✅ | ✅ | ✅ |
| Cypress | ✅ | ✅ | ❌ | ❌ |
| Vitest | ✅ | ✅ | ❌ | ❌ |
| TestNG | ✅ | 🟡 | ✅ | ❌ |
| JUnit | ✅ | 🟡 | 🟡 | ❌ |

**Note:** 🟡 = Partial support (class names instead of describe blocks for Java frameworks)

Framework detection is automatic. No configuration needed.

## ⚙️ Configuration

**For GitHub Actions:**
Use the action inputs as documented above.

**For CLI:**
Set environment variables in `.env.local`:

```bash
CHRONICLE_API_KEY          # Required - get from dashboard
CHRONICLE_PROJECT_ID       # Required - from dashboard
CHRONICLE_DASHBOARD_URL    # Optional - defaults to production
```

Or use command-line flags:

```bash
npx test-chronicle-agent sync \
  --project-id <project-id> \
  --dashboard-url <url> \
  --path <project-path> \
  --full-history  # Optional - for test reorganizations
```

## 📊 What Gets Synced

- Test specifications (names, paths, structure)
- Test file changes from git history
- Author information
- Timestamps

This gives you a complete view of your test suite on the dashboard.

## 🔄 How It Works

Once installed as a GitHub Action, test-chronicle-agent automatically syncs your test suite on every push. Your tests are parsed, changes are tracked from git history, and everything is sent to your dashboard for visualization and analysis.

## 📄 License

MIT - See [LICENSE](./LICENSE) file for details.
