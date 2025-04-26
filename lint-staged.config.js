/**
 * Generates a Prettier formatting command.
 * @param {string[]} files - List of files to format.
 * @returns {string} Prettier CLI command.
 */
const prettierCommand = (files) => `bun run --bun prettier --write --ignore-unknown ${files.join(' ')}`;

/**
 * Generates an Angular lint command.
 * @param {string} project - Angular project name.
 * @param {string[]} files - List of files to lint.
 * @returns {string} Angular lint CLI command.
 */
const ngLintCommand = (project, files) => `bun run --bun ng lint ${project} --lint-file-patterns ${files.join(' ')}`;

/**
 * Generates an ESLint command.
 * @param {string[]} files - List of files to lint.
 * @returns {string} ESLint CLI command.
 */
const eslintCommand = (files) => `bun run --bun eslint -c eslint.config.mjs --fix ${files.join(' ')}`;

/**
 * Mapping of Angular project directories to their project names.
 * @type {Record<string, string>}
 */
const angularProjects = { 'apps/docs': 'docs', 'packages/forms': 'forms', 'packages/ui': 'ui' };

/**
 * File pattern to match relevant file types for linting and formatting.
 * @type {string}
 */
const pattern = '*.{ts,js,mjs,html}';

/**
 * Generates lint and formatting tasks for each Angular project.
 * @type {import('lint-staged').Configuration}
 */
const angularLintTasks = Object.fromEntries(
  Object.entries(angularProjects).map(([path, project]) => [
    `${path}/**/${pattern}`,
    (files) => [ngLintCommand(project, files), prettierCommand(files)]
  ])
);

/** @type {import('lint-staged').Configuration} */
export default {
  // Lint tasks for Angular projects
  ...angularLintTasks,
  // Lint & Format for standalone files
  [pattern]: (files) => {
    const standaloneFiles = files.filter((file) => !angularProjects[file.split('/').slice(0, 2).join('/')]);

    return standaloneFiles.length ? [eslintCommand(standaloneFiles), prettierCommand(standaloneFiles)] : [];
  },
  // Format all non-JS/MJS/TS/HTML files with Prettier
  '!(*.ts|*.js|*.mjs|*.html)': (files) => prettierCommand(files)
};
