// @ts-check
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dirname = import.meta.dirname;

/** Defines the workspace directories with their respective emoji and optional validation file. */
const WORKSPACE_FOLDERS = {
  apps: { emoji: '🎯', checkFile: false },
  packages: { emoji: '📚', checkFile: 'ng-package.json' }
};

/**
 * Recursively find workspace directories up to 3 levels deep.
 * @param {string} basePath - Base workspace directory.
 * @param {boolean|string} checkFile - If `false`, returns only directory names; if a string, searches for that file.
 * @param {string} prefix - Scope prefix for nested directories.
 * @param {number} depth - Current depth level.
 * @returns {string[]} Formatted scope entries.
 */
const getWorkspaceScopes = (basePath, checkFile, prefix = '', depth = 0) => {
  if (depth > 2) return []; // Limit search to 3 levels deep

  return readdirSync(basePath, { withFileTypes: true }).flatMap((dirent) => {
    const fullPath = join(basePath, dirent.name);
    const scope = prefix ? `${prefix}/${dirent.name}` : dirent.name;

    if (typeof checkFile === 'string' && dirent.isDirectory()) {
      const hasCheckFile = existsSync(join(fullPath, checkFile));

      // Recursively search in subdirectories
      return [...(hasCheckFile ? [scope] : []), ...getWorkspaceScopes(fullPath, checkFile, scope, depth + 1)];
    }

    return checkFile === false ? [scope] : [];
  });
};

/**
 * Generates the available commit scopes based on the workspace configuration.
 */
const workspaceScopes = Object.entries(WORKSPACE_FOLDERS).flatMap(([baseDir, { emoji, checkFile }]) => {
  const directoryPath = join(dirname, baseDir);

  if (!existsSync(directoryPath)) return [];

  return getWorkspaceScopes(directoryPath, checkFile).map((scope) => ({ name: `${emoji} ${scope}`, value: scope }));
});

/** @type {import('cz-git').TypesOption[]} */
const COMMIT_TYPES = [
  { value: 'feat', name: '✨ New feature' },
  { value: 'fix', name: '🩹 Bug fix' },
  { value: 'perf', name: '⚡️ Performance improvement' },
  { value: 'refactor', name: '♻️ Code refactoring' },
  { value: 'docs', name: '📖 Documentation' },
  { value: 'style', name: '🎨 Code style/formatting' },
  { value: 'revert', name: '⏪️ Revert changes' },
  { value: 'test', name: '🧪 Tests' },
  { value: 'build', name: '👷 Build system/CI' },
  { value: 'chore', name: '📦 Maintenance' }
];

/** @type {import('cz-git').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'type-enum': [2, 'always', COMMIT_TYPES.map(({ value }) => value)],
    'scope-enum': [2, 'always', [...workspaceScopes.map(({ value }) => value), 'security', 'deps', 'release']]
  },
  prompt: {
    themeColorCode: '1;5;35',
    allowCustomScopes: false,
    allowCustomIssuePrefix: false,
    scopes: [
      ...workspaceScopes,
      { value: 'security', name: '🔒 Security' },
      { value: 'deps', name: '📦 Dependencies' },
      { value: 'release', name: '🚀 Release' }
    ],
    messages: {
      type: 'Select commit type:',
      scope: 'Select scope (required):',
      subject: 'Commit title (max 72 chars):\n> ',
      body: 'Commit details (optional):\n> ',
      confirmCommit: 'Confirm commit?'
    },
    issuePrefixes: [
      { value: 'link', name: '🔗 Link: Related issues' },
      { value: 'closed', name: '✅ Closed: Resolved issues' }
    ],
    types: COMMIT_TYPES.map(({ value, name }) => ({ value, name: `${value.padEnd(8)} ${name}` }))
  }
};
