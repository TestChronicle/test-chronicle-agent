import simpleGit from 'simple-git';
import path from 'path';
import { Framework, GitFileChange, CommitHistory, SpecHistoryEntry, TestChange } from '../types';
import { extractTestNamesFromContent } from '../core/parser';

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the hash of the most recent commit, or null if no history exists.
 */
export async function getLatestCommitHash(projectPath: string): Promise<string | null> {
  const git = simpleGit(projectPath);
  try {
    const log = await git.log({ maxCount: 1 });
    return log.latest?.hash ?? null;
  } catch {
    return null;
  }
}

/**
 * Builds the full commit history for the given test directory.
 * If `sinceCommit` is provided, only commits after that hash are returned.
 */
/**
 * Builds the full commit history for the given test directory.
 * If `sinceCommit` is provided, only commits after that hash are returned.
 * If `fullHistory` is true, scans all commits in the repo (for projects that moved tests).
 */
export async function buildHistory(
  projectPath: string,
  testDir: string,
  framework: Framework,
  sinceCommit?: string,
  fullHistory?: boolean
): Promise<CommitHistory[]> {
  const git = simpleGit(projectPath);
  const relativeTestDir = testDir.replace(/^\.\//, '');

  let logArgs: string[];
  
  if (sinceCommit) {
    // For incremental sync: explicitly specify range and path
    logArgs = [`${sinceCommit}..HEAD`, '--', relativeTestDir];
  } else if (fullHistory) {
    // For full history scan: get ALL commits in the repo
    // The filtering by test files will happen in buildSpecChanges
    logArgs = ['--all'];
  } else {
    // For standard full sync: get all commits affecting the path
    logArgs = ['--all', '--', relativeTestDir];
  }

  let logResult;
  try {
    logResult = await git.log(logArgs);
  } catch (error) {
    // Log the error for debugging
    if (error instanceof Error) {
      console.error(`[DEBUG] Git log error: ${error.message} with args: ${JSON.stringify(logArgs)}`);
    }
    return [];
  }

  const commits = [...logResult.all].reverse(); // oldest first for timeline ordering
  const history: CommitHistory[] = [];

  for (const commit of commits) {
    // When doing full history, don't filter by testDir in getCommitFileChanges
    // Instead let buildSpecChanges filter to only test files
    const fileChanges = await getCommitFileChanges(
      git,
      commit.hash,
      fullHistory ? undefined : relativeTestDir
    );
    const specChanges = await buildSpecChanges(
      git,
      commit.hash,
      fileChanges,
      framework,
      projectPath
    );

    if (specChanges.length === 0) continue;

    history.push({
      commit: {
        hash: commit.hash,
        shortHash: commit.hash.substring(0, 7),
        message: commit.message,
        author: commit.author_name,
        date: new Date(commit.date).toISOString(),
        changes: fileChanges,
      },
      specs: specChanges,
    });
  }

  return history;
}

// ─── File change detection ────────────────────────────────────────────────────

async function getCommitFileChanges(
  git: ReturnType<typeof simpleGit>,
  hash: string,
  testDir?: string
): Promise<GitFileChange[]> {
  try {
    // Use diff-tree to get the file status for this commit
    const raw = await git.raw([
      'diff-tree',
      '--no-commit-id',
      '-r',
      '--name-status',
      '-M', // detect renames
      hash,
    ]);

    const changes: GitFileChange[] = [];

    for (const line of raw.trim().split('\n')) {
      if (!line) continue;
      const parts = line.split('\t');
      const status = parts[0];

      if (status.startsWith('R')) {
        // Rename: R<score>\t<old>\t<new>
        const oldPath = parts[1];
        const newPath = parts[2];
        // If testDir is specified, filter by directory; otherwise include all renames
        if (!testDir || isInTestDir(newPath, testDir) || isInTestDir(oldPath, testDir)) {
          changes.push({ path: newPath, oldPath, status: 'renamed' });
        }
      } else {
        const filePath = parts[1];
        // If testDir is specified, filter by directory; otherwise include all files
        if (testDir && !isInTestDir(filePath, testDir)) continue;

        const mapped = mapGitStatus(status);
        if (mapped) changes.push({ path: filePath, status: mapped });
      }
    }

    return changes;
  } catch {
    return [];
  }
}

function isInTestDir(filePath: string, testDir: string): boolean {
  return filePath.startsWith(testDir) || path.dirname(filePath) === testDir;
}

function mapGitStatus(status: string): GitFileChange['status'] | null {
  switch (status[0]) {
    case 'A':
      return 'added';
    case 'D':
      return 'deleted';
    case 'M':
      return 'modified';
    default:
      return null;
  }
}

// ─── Test-level change detection ──────────────────────────────────────────────

async function buildSpecChanges(
  git: ReturnType<typeof simpleGit>,
  hash: string,
  fileChanges: GitFileChange[],
  framework: Framework,
  projectPath: string
): Promise<SpecHistoryEntry[]> {
  const entries: SpecHistoryEntry[] = [];

  for (const change of fileChanges) {
    if (!isSpecFile(change.path)) continue;

    try {
      const entry = await buildSpecEntry(git, hash, change, framework, projectPath);
      if (entry) entries.push(entry);
    } catch {
      // Skip files that can't be retrieved (e.g. very old history)
    }
  }

  return entries;
}

async function buildSpecEntry(
  git: ReturnType<typeof simpleGit>,
  hash: string,
  change: GitFileChange,
  framework: Framework,
  _projectPath: string
): Promise<SpecHistoryEntry | null> {
  if (change.status === 'added') {
    const content = await getFileAtCommit(git, hash, change.path);
    const tests = extractTestNamesFromContent(content, framework);
    return {
      specPath: change.path,
      fileStatus: 'added',
      changes: tests.map((name) => ({ type: 'added', name })),
    };
  }

  if (change.status === 'deleted') {
    const content = await getFileAtCommit(git, `${hash}^`, change.path);
    const tests = extractTestNamesFromContent(content, framework);
    return {
      specPath: change.path,
      fileStatus: 'deleted',
      changes: tests.map((name) => ({ type: 'removed', name })),
    };
  }

  if (change.status === 'renamed' && change.oldPath) {
    const [currentContent, previousContent] = await Promise.all([
      getFileAtCommit(git, hash, change.path),
      getFileAtCommit(git, `${hash}^`, change.oldPath).catch(() => ''),
    ]);

    const currentTests = new Set(extractTestNamesFromContent(currentContent, framework));
    const previousTests = new Set(extractTestNamesFromContent(previousContent, framework));

    const testChanges = diffTestNames(previousTests, currentTests);

    return {
      specPath: change.path,
      fileStatus: 'renamed',
      changes: testChanges,
    };
  }

  // Modified file — diff test names between current and parent
  const [current, previous] = await Promise.all([
    getFileAtCommit(git, hash, change.path),
    getFileAtCommit(git, `${hash}^`, change.path).catch(() => ''),
  ]);

  const currentTests = new Set(extractTestNamesFromContent(current, framework));
  const previousTests = new Set(extractTestNamesFromContent(previous, framework));

  const changes = diffTestNames(previousTests, currentTests);
  if (changes.length === 0) return null;

  return {
    specPath: change.path,
    fileStatus: 'modified',
    changes,
  };
}

// ─── Utilities ────────────────────────────────────────────────────────────────

async function getFileAtCommit(
  git: ReturnType<typeof simpleGit>,
  ref: string,
  filePath: string
): Promise<string> {
  return git.show([`${ref}:${filePath}`]);
}

function isSpecFile(filePath: string): boolean {
  return /\.(spec|test)\.[jt]s$/.test(filePath);
}

/**
 * Diffs two sets of test names.
 * Applies a simple rename heuristic: if a removed and added name share
 * more than half their words, treat it as a rename rather than remove+add.
 */
function diffTestNames(previous: Set<string>, current: Set<string>): TestChange[] {
  const added = [...current].filter((t) => !previous.has(t));
  const removed = [...previous].filter((t) => !current.has(t));
  const changes: TestChange[] = [];

  const matchedAdded = new Set<string>();

  for (const removedName of removed) {
    const renameCandidate = added.find(
      (addedName) => !matchedAdded.has(addedName) && similarNames(removedName, addedName)
    );

    if (renameCandidate) {
      changes.push({ type: 'modified', name: renameCandidate, oldName: removedName });
      matchedAdded.add(renameCandidate);
    } else {
      changes.push({ type: 'removed', name: removedName });
    }
  }

  for (const addedName of added) {
    if (!matchedAdded.has(addedName)) {
      changes.push({ type: 'added', name: addedName });
    }
  }

  return changes;
}

/** Word-overlap similarity — returns true when >50% of words are shared. */
function similarNames(a: string, b: string): boolean {
  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = [...wordsA].filter((w) => wordsB.has(w)).length;
  const union = new Set([...wordsA, ...wordsB]).size;
  return union > 0 && intersection / union > 0.5;
}
