/**
 * GitHub Action entrypoint for Test Chronicle Agent
 * Runs the sync function with inputs provided by GitHub Actions
 */

import { syncProject, SyncOptions } from './sync';

async function run() {
    try {
        // Get inputs from GitHub Actions
        // GitHub automatically sets <INPUT_NAME> for each input
        const apiKey = process.env['API_KEY'];
        const projectId = process.env['PROJECT_ID'];
        const dashboardUrl = process.env['DASHBOARD_URL'];

        if (!apiKey) {
            throw new Error('API_KEY input is required');
        }

        if (!projectId) {
            throw new Error('PROJECT_ID input is required');
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
