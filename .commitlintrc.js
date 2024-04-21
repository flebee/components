const { readdirSync } = require('node:fs');
const fg = require('fast-glob');

const { workspaceLayout } = require('./nx.json');

const packages = readdirSync(workspaceLayout.libsDir);
const omitScopes = [workspaceLayout.libsDir, ...packages];

const scopes = fg
  .sync(`${workspaceLayout.libsDir}/**/ng-package.json`)
  .map((filePath) => {
    const scopes = filePath.split('/').slice(-3, -1);

    return scopes.filter((scope) => !omitScopes.includes(scope)).join('/');
  })
  .filter((scope) => !!scope.trim());

/** @type {Array<{ value: string; description: string }>} */
const questions = [
  { value: 'feat', description: '\t ✨ A new feature' },
  { value: 'fix', description: '\t\t 🩹 A bug fix' },
  { value: 'perf', description: '\t ⚡️ A code change that improves performance' },
  { value: 'refactor', description: '\t ♻️ A code change that neither fixes a bug nor adds a feature' },
  { value: 'docs', description: '\t 📚 Documentation only changes' },
  { value: 'style', description: '\t 🎨 Changes that do not affect the meaning of the code (white-space, formatting, etc)' },
  { value: 'revert', description: '\t ⏪️ Reverts a previous commit' },
  { value: 'test', description: '\t 🧪 Adding missing tests or correcting existing tests' },
  { value: 'build', description: '\t 👷 Changes that affect the build system, CI configuration files or external dependencies' },
  { value: 'chore', description: "\t 📦 Other changes that don't modify src or test files" }
];

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'type-enum': [2, 'always', questions.map(({ value }) => value)],
    'scope-enum': [2, 'always', ['docs', 'security', 'deps', 'release', ...packages, ...scopes]]
  },
  prompt: {
    themeColorCode: '1;5;35',
    allowCustomScopes: false,
    allowCustomIssuePrefix: false,
    issuePrefixes: [
      { value: 'link', name: 'link: \tWork in processing to ISSUES' },
      { value: 'closed', name: 'closed: \tISSUES has been processed' }
    ],
    types: questions.map(({ value, description }) => ({ value, name: `${value}: ${description}` }))
  }
};
