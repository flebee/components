// @ts-check
import tsEslint from 'typescript-eslint';
import angular from 'angular-eslint';

import rootConfig from '../../eslint.config.mjs';

export default tsEslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }]
    }
  },
  {
    files: ['**/ng-doc/**/*.ts'],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': 'off',
      '@angular-eslint/component-selector': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-irregular-whitespace': 'off',
      'no-useless-escape': 'off'
    }
  },
  {
    files: ['**/ng-doc/**/*.html'],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'off',
      '@angular-eslint/template/button-has-type': 'off',
      '@angular-eslint/template/alt-text': 'off'
    }
  }
);
