// @ts-check
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    files: ['**/*.{ts,js}'],
    plugins: { perfectionist },
    ignores: ['apps/docs/ng-doc/**'],
    settings: { perfectionist: { type: 'natural' } },
    extends: [eslint.configs.recommended, ...tsEslint.configs.stylistic, ...tsEslint.configs.recommended],
    rules: {
      'no-empty-function': 'error',
      'perfectionist/sort-enums': 'error',
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-union-types': 'error',
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-named-exports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      'no-duplicate-imports': ['error', { includeExports: true }],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      'perfectionist/sort-imports': [
        'error',
        {
          newlinesBetween: 'always',
          internalPattern: ['@flebee/.+'],
          groups: ['angular', ['builtin', 'external'], 'internal'],
          customGroups: { value: { angular: ['@angular/.+', 'rxjs', 'rxjs/.'] } }
        }
      ]
    }
  },
  {
    files: ['**/*.ts'],
    ignores: ['apps/docs/ng-doc/**'],
    extends: angular.configs.tsRecommended,
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-class-suffix': 'off',
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/no-host-metadata-property': 'off'
    }
  },
  {
    files: ['**/*.html'],
    ignores: ['apps/docs/ng-doc/**'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/attributes-order': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error',
      '@angular-eslint/template/conditional-complexity': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/eqeqeq': ['error', { allowNullOrUndefined: true }],
      '@angular-eslint/template/no-inline-styles': ['error', { allowBindToStyle: true }]
    }
  }
);
