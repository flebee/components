import { NgDocPage } from '@ng-doc/core';

import { NumberFormatPipe } from '@flebee/ui/intl';

import UiCategory from '../ng-doc.category';

const PipesPage: NgDocPage = {
  title: 'Pipes',
  category: UiCategory,
  mdFile: ['./index.md', './number-format.md'],
  playgrounds: {
    NumberFormat: {
      hideSidePanel: true,
      target: NumberFormatPipe,
      hiddenInputs: ['options', 'locale'],
      template: `{{ 600000 | numberFormat }}`
    }
  }
};

export default PipesPage;
