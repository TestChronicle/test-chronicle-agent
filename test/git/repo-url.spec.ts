import { describe, it, expect } from 'vitest';
import { normaliseRemoteUrl, getRepoUrl } from '../../src/git/history';
import os from 'os';

describe('normaliseRemoteUrl', () => {
    describe('SSH remotes', () => {
        it('converts a GitHub SSH URL to HTTPS', () => {
            expect(normaliseRemoteUrl('git@github.com:owner/repo.git')).toBe('https://github.com/owner/repo');
        });

        it('converts a GitLab SSH URL to HTTPS', () => {
            expect(normaliseRemoteUrl('git@gitlab.com:team/project.git')).toBe('https://gitlab.com/team/project');
        });

        it('converts a Bitbucket SSH URL to HTTPS', () => {
            expect(normaliseRemoteUrl('git@bitbucket.org:owner/repo.git')).toBe('https://bitbucket.org/owner/repo');
        });

        it('handles SSH URLs without a .git suffix', () => {
            expect(normaliseRemoteUrl('git@github.com:owner/repo')).toBe('https://github.com/owner/repo');
        });

        it('handles SSH URLs with a nested path', () => {
            expect(normaliseRemoteUrl('git@gitlab.com:group/subgroup/project.git')).toBe(
                'https://gitlab.com/group/subgroup/project',
            );
        });
    });

    describe('HTTPS remotes', () => {
        it('strips a trailing .git from an HTTPS URL', () => {
            expect(normaliseRemoteUrl('https://github.com/owner/repo.git')).toBe('https://github.com/owner/repo');
        });

        it('strips a trailing slash from an HTTPS URL', () => {
            expect(normaliseRemoteUrl('https://github.com/owner/repo/')).toBe('https://github.com/owner/repo');
        });

        it('leaves a clean HTTPS URL unchanged', () => {
            expect(normaliseRemoteUrl('https://github.com/owner/repo')).toBe('https://github.com/owner/repo');
        });

        it('handles http:// URLs', () => {
            expect(normaliseRemoteUrl('http://github.com/owner/repo.git')).toBe('http://github.com/owner/repo');
        });
    });

    describe('whitespace handling', () => {
        it('trims leading and trailing whitespace', () => {
            expect(normaliseRemoteUrl('  git@github.com:owner/repo.git  ')).toBe('https://github.com/owner/repo');
        });
    });

    describe('unrecognised formats', () => {
        it('returns null for an empty string', () => {
            expect(normaliseRemoteUrl('')).toBeNull();
        });

        it('returns null for a plain path', () => {
            expect(normaliseRemoteUrl('/home/user/repos/myrepo')).toBeNull();
        });

        it('returns null for a file:// URL', () => {
            expect(normaliseRemoteUrl('file:///home/user/repos/myrepo')).toBeNull();
        });
    });
});

describe('getRepoUrl', () => {
    it('returns a normalised HTTPS URL (or null) for the current repo', async () => {
        const result = await getRepoUrl(process.cwd());
        if (result !== null) {
            expect(result).toMatch(/^https?:\/\//);
            expect(result).not.toMatch(/\.git$/);
            expect(result).not.toMatch(/\/$/);
        }
    });

    it('returns null for a directory with no git remote', async () => {
        // os.tmpdir() is never a git repository — exercises the catch → null path
        const result = await getRepoUrl(os.tmpdir());
        expect(result).toBeNull();
    });
});
