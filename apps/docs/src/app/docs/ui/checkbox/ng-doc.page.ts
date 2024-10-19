import { NgDocPage } from '@ng-doc/core';

import { BeeCheckbox, BeeCheckboxGroup } from '@flebee/ui/checkbox';

import UiCategory from '../ng-doc.category';

const CheckboxPage: NgDocPage = {
  title: 'Checkbox',
  mdFile: './index.md',
  category: UiCategory,
  imports: [BeeCheckboxGroup, BeeCheckbox],
  playgrounds: {
    Checkbox: {
      target: BeeCheckbox,
      hiddenInputs: ['value'],
      controls: { disabled: { type: 'boolean' } },
      template: ` <bee-checkbox> Checkbox </bee-checkbox> `
    },
    CheckboxGroup: {
      target: BeeCheckboxGroup,
      hiddenInputs: ['class', 'name'],
      controls: {
        label: { type: 'string' },
        disabled: { type: 'boolean' },
        description: { type: 'string' },
        errorMessage: { type: 'string' }
      },
      template: `
        <bee-checkbox-group>
          <bee-checkbox value="buenos-aires"> Buenos Aires </bee-checkbox>
          <bee-checkbox value="sydney"> Sydney </bee-checkbox>
          <bee-checkbox value="london"> London </bee-checkbox>
          <bee-checkbox value="tokyo"> Tokyo </bee-checkbox>
        </bee-checkbox-group>
      `
    }
  }
};

export default CheckboxPage;
