import { NgDocPage } from '@ng-doc/core';

import { BeeCheckbox } from '@flebee/ui/checkbox';

import ComponentsCategory from '../ng-doc.category';

const CheckboxPage: NgDocPage = {
  title: 'Checkbox',
  mdFile: './index.md',
  category: ComponentsCategory,
  playgrounds: {
    Checkbox: {
      target: BeeCheckbox,
      template: ` <bee-checkbox> Checkbox </bee-checkbox> `,
      controls: { disabled: { type: 'boolean' }, indeterminate: { type: 'boolean' } }
    }
  }
};

export default CheckboxPage;
