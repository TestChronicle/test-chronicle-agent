import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { syncProject } from '../src/sync';
import * as core from '../src/core';
import * as git from '../src/git';
import * as client from '../src/sync-client';
import { CommitHistory } from '../src/types';

vi.mock('../src/core');
vi.mock('../src/git');
vi.mock('../src/sync-client');

const options = { projectId: 'project', apiKey: 'token', dashboardUrl: 'https://example.com' };
const commits: CommitHistory[] = Array.from({ length: 205 }, (_, i) => ({
    commit: { hash: `commit-${i}`, shortHash: `${i}`, message: 'test', author: 'author', date: '2026-01-01', changes: [] },
    specs: [],
}));

beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.mocked(core.detectFrameworks).mockReturnValue([{ framework: 'vitest', testDir: 'tests', confidence: 'high' }]);
    vi.mocked(core.parseAllSpecs).mockReturnValue([]);
    vi.mocked(git.getDefaultBranch).mockResolvedValue('main');
    vi.mocked(git.getCurrentBranch).mockResolvedValue('main');
    vi.mocked(git.getRemoteBranchTip).mockResolvedValue('tip');
    vi.mocked(client.fetchProjectConfig).mockResolvedValue({});
    vi.mocked(client.getSyncMarker).mockResolvedValue(null);
    vi.mocked(git.buildHistory).mockResolvedValue({ entries: commits, errors: [], warnings: [] });
});
afterEach(() => vi.restoreAllMocks());

describe('syncProject', () => {
    it('uploads oldest-first chunks and saves their newest commit for resuming', async () => {
        await syncProject(options);
        const uploads = vi.mocked(client.syncToDashboard).mock.calls.map((call) => call[2]);
        expect(uploads.map((p) => p.history.length)).toEqual([100, 100, 5]);
        expect(uploads.flatMap((p) => p.history).map((c: any) => c.commitHash)).toEqual(commits.map((c) => c.commit.hash));
        expect(uploads[0]).toMatchObject({ commitRangeStart: 'commit-0', commitRangeEnd: 'commit-204', expectedChunkCount: 3 });
        expect(vi.mocked(client.saveSyncMarker).mock.calls.map((call) => call[3])).toEqual(['commit-99', 'commit-199', 'tip']);
    });

    it.each([
        { entries: [], errors: [], warnings: ['Git log failed'] },
        { entries: commits, errors: [{ commit: 'bad', file: 'test.ts', reason: 'unreadable' }], warnings: [] },
    ])('does not upload or advance markers after incomplete history', async (history) => {
        vi.mocked(git.buildHistory).mockResolvedValue(history);
        await expect(syncProject(options)).rejects.toThrow('Git history could not be read completely');
        expect(client.syncToDashboard).not.toHaveBeenCalled();
        expect(client.saveSyncMarker).not.toHaveBeenCalled();
    });

    it('propagates rejected marker authentication', async () => {
        vi.mocked(client.getSyncMarker).mockRejectedValue(new Error('Invalid API key'));
        await expect(syncProject(options)).rejects.toThrow('Invalid API key');
        expect(git.buildHistory).not.toHaveBeenCalled();
    });

    it('excludes directory boundaries without excluding similarly named siblings', async () => {
        vi.mocked(core.detectFrameworks).mockReturnValue([
            { framework: 'vitest', testDir: './tests', confidence: 'high' },
            { framework: 'jest', testDir: './tests-legacy', confidence: 'high' },
        ]);
        vi.mocked(client.fetchProjectConfig).mockResolvedValue({ testDirExcludes: ['tests/'] });
        await syncProject(options);
        expect(core.parseAllSpecs).toHaveBeenCalledWith(expect.any(String), [
            { framework: 'jest', testDir: './tests-legacy', confidence: 'high' },
        ]);
    });
});
