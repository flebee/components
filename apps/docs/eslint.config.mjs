// @ts-check
import tsEslint from 'typescript-eslint';

import rootConfig from '../../eslint.config.mjs';

export default tsEslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    ignores: ['apps/docs/ng-doc/**'],
    rules: {
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }]
    }
  },
  { files: ['**/*.html'], rules: {} }
);
