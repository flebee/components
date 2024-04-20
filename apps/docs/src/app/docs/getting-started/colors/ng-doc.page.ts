import { NgDocPage } from '@ng-doc/core';

import { BeeColor } from '@flebee/ui';

import GettingStartedCategory from '../ng-doc.category';

const colors: Record<Exclude<BeeColor, 'backdrop'>, string[]> = {
  primary: [
    'bg-primary-50',
    'bg-primary-100',
    'bg-primary-200',
    'bg-primary-300',
    'bg-primary-400',
    'bg-primary-500',
    'bg-primary-600',
    'bg-primary-700',
    'bg-primary-800',
    'bg-primary-900'
  ],
  success: [
    'bg-success-50',
    'bg-success-100',
    'bg-success-200',
    'bg-success-300',
    'bg-success-400',
    'bg-success-500',
    'bg-success-600',
    'bg-success-700',
    'bg-success-800',
    'bg-success-900'
  ],
  warning: [
    'bg-warning-50',
    'bg-warning-100',
    'bg-warning-200',
    'bg-warning-300',
    'bg-warning-400',
    'bg-warning-500',
    'bg-warning-600',
    'bg-warning-700',
    'bg-warning-800',
    'bg-warning-900'
  ],
  danger: [
    'bg-danger-50',
    'bg-danger-100',
    'bg-danger-200',
    'bg-danger-300',
    'bg-danger-400',
    'bg-danger-500',
    'bg-danger-600',
    'bg-danger-700',
    'bg-danger-800',
    'bg-danger-900'
  ],
  neutral: [
    'bg-neutral-50',
    'bg-neutral-100',
    'bg-neutral-200',
    'bg-neutral-300',
    'bg-neutral-400',
    'bg-neutral-500',
    'bg-neutral-600',
    'bg-neutral-700',
    'bg-neutral-800',
    'bg-neutral-900'
  ]
};

const ColorsPage: NgDocPage = {
  title: `Colors`,
  mdFile: './index.md',
  category: GettingStartedCategory,
  data: { ...colors, colors: Object.keys(colors) }
};

export default ColorsPage;
