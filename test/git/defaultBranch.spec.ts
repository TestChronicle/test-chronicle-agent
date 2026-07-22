import { describe, it, expect } from 'vitest';
import {
    getCurrentBranch,
    getDefaultBranch,
    getRemoteBranchTip,
    isCommitReachableFromBranch,
} from '../../src/git/history';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

describe('getDefaultBranch', () => {
    it('returns a non-empty string for the current repo', async () => {
        const branch = await getDefaultBranch(process.cwd());
        expect(typeof branch).toBe('string');
        expect(branch.length).toBeGreaterThan(0);
    });

    it('returns the resolved branch name without the refs/remotes/origin/ prefix', async () => {
        const branch = await getDefaultBranch(process.cwd());
        expect(branch).not.toMatch(/^refs\//);
        expect(branch).not.toContain('origin/');
    });

    it('returns "main" as a safe fallback for a directory with no git remote', async () => {
        // Create a bare local repo with no remotes
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-no-remote-'));
        try {
            execSync('git init', { cwd: tmpDir, stdio: 'ignore' });
            const branch = await getDefaultBranch(tmpDir);
            expect(branch).toBe('main');
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});

describe('getRemoteBranchTip', () => {
    it('returns a 40-character hex commit hash for a known remote branch', async () => {
        const branch = await getDefaultBranch(process.cwd());
        const hash = await getRemoteBranchTip(process.cwd(), branch);
        if (hash !== null) {
            expect(hash).toMatch(/^[0-9a-f]{40}$/);
        }
    });

    it('returns null for a branch that does not exist on the remote', async () => {
        const hash = await getRemoteBranchTip(process.cwd(), 'this-branch-definitely-does-not-exist-tc');
        expect(hash).toBeNull();
    });

    it('returns null for a directory with no git remote', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-no-remote-'));
        try {
            execSync('git init', { cwd: tmpDir, stdio: 'ignore' });
            const hash = await getRemoteBranchTip(tmpDir, 'main');
            expect(hash).toBeNull();
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});

describe('getCurrentBranch', () => {
    it('returns the current branch name when the repository is on a branch', async () => {
        const branch = await getCurrentBranch(process.cwd());
        if (branch !== null) {
            expect(branch.length).toBeGreaterThan(0);
            expect(branch).not.toBe('HEAD');
        }
    });

    it('returns null for a detached HEAD checkout', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-detached-head-'));
        try {
            execSync('git init', { cwd: tmpDir, stdio: 'ignore' });
            execSync('git -c user.email=test@example.com -c user.name=Test commit --allow-empty -m init', {
                cwd: tmpDir,
                stdio: 'ignore',
            });
            const hash = execSync('git rev-parse HEAD', { cwd: tmpDir, encoding: 'utf8' }).trim();
            execSync(`git checkout --detach ${hash}`, { cwd: tmpDir, stdio: 'ignore' });

            await expect(getCurrentBranch(tmpDir)).resolves.toBeNull();
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});

describe('isCommitReachableFromBranch', () => {
    it('returns true for the remote default branch tip when it is available locally', async () => {
        const branch = await getDefaultBranch(process.cwd());
        const hash = await getRemoteBranchTip(process.cwd(), branch);
        if (hash !== null) {
            await expect(isCommitReachableFromBranch(process.cwd(), hash, branch)).resolves.toBe(true);
        }
    });

    it('returns false for an unknown commit hash', async () => {
        const branch = await getDefaultBranch(process.cwd());

        await expect(
            isCommitReachableFromBranch(process.cwd(), '0000000000000000000000000000000000000000', branch),
        ).resolves.toBe(false);
    });
});
