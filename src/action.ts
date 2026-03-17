/**
 * GitHub Action entrypoint for Test Chronicle Agent
 * Runs the sync function with inputs provided by GitHub Actions
 */

import { syncProject, SyncOptions } from './sync';

async function run() {
    try {
        // Get inputs from GitHub Actions
        // GitHub automatically sets INPUT_<INPUT_NAME> for each input (with hyphens replaced by underscores)
        const apiKey = process.env['INPUT_API_KEY'];
        const projectId = process.env['INPUT_PROJECT_ID'];
        const dashboardUrl = process.env['INPUT_DASHBOARD_URL'];

        if (!apiKey) {
            throw new Error('api_key input is required');
        }

        if (!projectId) {
            throw new Error('project_id input is required');
        }

        console.log('[action] Starting Test Chronicle Agent...');
        console.log(`[action] Project ID: ${projectId}`);

        const options: SyncOptions = {
            projectId,
            apiKey,
            dashboardUrl: dashboardUrl || 'http://localhost:3000',
        };

        await syncProject(options);
        console.log('[action] Test Chronicle Agent sync completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('[action] Test Chronicle Agent failed:', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}

run();
