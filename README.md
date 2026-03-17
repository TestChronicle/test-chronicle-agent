# test-chronicle-agent

Keep your test suite visible. Sync test specs and history to your dashboard automatically.

## 🚀 GitHub Action

Use test-chronicle-agent as a GitHub Action to automatically sync your tests on merges to main:

```yaml
name: 🔄 Sync Tests to Chronicle

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

            - uses: TestChronicle/test-chronicle-agent@v0.1.0
              with:
                  API_KEY: ${{ secrets.API_KEY }}
                  PROJECT_ID: ${{ secrets.PROJECT_ID }}
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
    - Add `API_KEY` with your API key
    - Add `PROJECT_ID` with your project ID

4. **Add the workflow** to your repository

That's it! Your tests will sync automatically on merges to main.

## 🎯 Supported Frameworks

| Framework  | Test Names | Specs | Tags | Parameterized |
| ---------- | :--------: | :---: | :--: | :-----------: |
| Playwright |     ✅     |  ✅   |  ✅  |      ✅       |
| Cypress    |     ✅     |  ✅   |  ❌  |      ✅       |
| Vitest     |     ✅     |  ✅   |  ❌  |      ✅       |
| TestNG     |     ✅     |  🟡   |  ✅  |      ❌       |
| JUnit      |     ✅     |  🟡   |  🟡  |      ❌       |

**Note:** 🟡 = Partial support (class names instead of describe blocks for Java frameworks)

Framework detection is automatic. No configuration needed.

## 📊 What Gets Synced

- Test specifications (names, paths, structure)
- Test file changes from git history
- Author information
- Timestamps

This gives you a complete view of your test suite on the dashboard.

## 🔄 How It Works

Once installed as a GitHub Action, test-chronicle-agent automatically syncs your test suite on merges to main. Your tests are parsed, changes are tracked from git history, and everything is sent to your dashboard for visualization and analysis.

## 📄 License

MIT - See [LICENSE](./LICENSE) file for details.
