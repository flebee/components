// @ts-check
import tsEslint from 'typescript-eslint';

import rootConfig from '../../eslint.config.mjs';

export default tsEslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'bee', style: 'camelCase' }],
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'bee', style: 'kebab-case' }]
    }
  },
  { files: ['**/*.html'], rules: {} }
);
