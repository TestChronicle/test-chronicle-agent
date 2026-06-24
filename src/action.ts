/**
 * GitHub Action entrypoint for Test Chronicle Agent
 * Runs the sync function with inputs provided by GitHub Actions
 */

import { syncProject, SyncOptions } from './sync';

async function run() {
    try {
        // Get inputs from GitHub Actions
        // GitHub automatically sets INPUT_<INPUT_NAME> for each input (with hyphens replaced by underscores)
        const apiKey = process.env['INPUT_API_KEY']?.trim();
        const projectId = process.env['INPUT_PROJECT_ID']?.trim();
        const dashboardUrl = process.env['INPUT_DASHBOARD_URL']?.trim();

        if (!apiKey) {
            throw new Error('API_KEY input is required');
        }

        if (!projectId) {
            throw new Error('PROJECT_ID input is required');
        }

        console.log('[action] Starting Test Chronicle Agent.');
        console.log(`[action] Project ID: ${projectId}`);

        const options: SyncOptions = {
            projectId,
            apiKey,
            dashboardUrl: dashboardUrl || 'https://www.testchronicle.com',
        };

        await syncProject(options);
        console.log('[action] Sync completed.');
        process.exit(0);
    } catch (error) {
        console.error('[action] Sync failed:', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}

run();
