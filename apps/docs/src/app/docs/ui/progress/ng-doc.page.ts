import { NgDocPage } from '@ng-doc/core';

import { BeeProgress } from '@flebee/ui/progress';

import UiCategory from '../ng-doc.category';

const ProgressPage: NgDocPage = {
  title: 'Progress',
  mdFile: './index.md',
  category: UiCategory,
  playgrounds: {
    Progress: {
      target: BeeProgress,
      template: `<bee-progress />`,
      hiddenInputs: ['formatOptions'],
      controls: { label: { type: 'string' }, value: { type: 'number' } }
    }
  }
};

export default ProgressPage;
