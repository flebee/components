import { NgDocPage } from '@ng-doc/core';

import { BeeProgress } from '@flebee/ui/progress';

import ComponentsCategory from '../ng-doc.category';

const ProgressPage: NgDocPage = {
  title: 'Progress',
  mdFile: './index.md',
  category: ComponentsCategory,
  playgrounds: {
    Progress: {
      target: BeeProgress,
      template: `<bee-progress />`,
      hiddenInputs: ['formatOptions'],
      controls: {
        min: { type: 'number' },
        max: { type: 'number' },
        value: { type: 'number' },
        label: { type: 'string' },
        disabled: { type: 'boolean' },
        showValue: { type: 'boolean' },
        indeterminate: { type: 'boolean' }
      }
    }
  }
};

export default ProgressPage;
