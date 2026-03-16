/**
 * CLI entry point for test-chronicle agent
 *
 * Environment variables (set by GitHub Action or user):
 * - CHRONICLE_PROJECT_ID: Project ID
 * - CHRONICLE_API_KEY: API key
 * - CHRONICLE_DASHBOARD_URL: Dashboard URL (optional, default: http://localhost:3000)
 */
declare function main(): Promise<void>;

export { main as cli };
