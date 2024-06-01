import { NgDocPage } from '@ng-doc/core';

import { NumberFormatPipe } from '@flebee/ui/intl';

import PipesCategory from '../ng-doc.category';

const NumberFormatPage: NgDocPage = {
  order: 1,
  mdFile: './index.md',
  title: 'Number Format',
  category: PipesCategory,
  playgrounds: {
    NumberFormat: {
      hideSidePanel: true,
      target: NumberFormatPipe,
      template: `{{ 600000 | numberFormat }}`
    }
  }
};

export default NumberFormatPage;
