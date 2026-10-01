import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { afterEach, describe, expect, it } from 'vitest';
import { buildHistory } from '../../src/git/history';

const directories: string[] = [];
afterEach(() => {
    for (const dir of directories.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

describe('git history moves', () => {
    it.each(['outside/example.spec.ts', 'tests/example.txt'])('tracks deletion when a spec moves to %s', async (destination) => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-history-'));
        directories.push(dir);
        const git = (...args: string[]) => execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
        const commit = (message: string) => {
            git('add', '.');
            git('-c', 'user.name=Test', '-c', 'user.email=test@example.com', 'commit', '-m', message);
            return git('rev-parse', 'HEAD');
        };
        git('init');
        fs.mkdirSync(path.join(dir, 'tests'));
        fs.writeFileSync(path.join(dir, 'tests/example.spec.ts'), "test('example', () => {});\n");
        const first = commit('add test');
        fs.mkdirSync(path.dirname(path.join(dir, destination)), { recursive: true });
        git('mv', 'tests/example.spec.ts', destination);
        const second = commit('move test');
        git('update-ref', 'refs/remotes/origin/main', second);
        const result = await buildHistory(dir, [{ framework: 'vitest', testDir: 'tests', confidence: 'high' }], 'main');
        expect(result.errors).toEqual([]);
        expect(result.warnings).toEqual([]);
        expect(result.entries.map((entry) => entry.commit.hash)).toEqual([first, second]);
        expect(result.entries[1].specs[0]).toMatchObject({
            specPath: 'tests/example.spec.ts', fileStatus: 'deleted', changes: [{ type: 'deleted', name: 'example' }],
        });
    });
});
