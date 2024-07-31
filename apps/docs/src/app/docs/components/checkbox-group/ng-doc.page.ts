import { NgDocPage } from '@ng-doc/core';

import { BeeCheckbox, BeeCheckboxGroup } from '@flebee/ui/checkbox';

import ComponentsCategory from '../ng-doc.category';

const CheckboxGroupPage: NgDocPage = {
  mdFile: './index.md',
  title: 'Checkbox Group',
  category: ComponentsCategory,
  imports: [BeeCheckboxGroup, BeeCheckbox],
  playgrounds: {
    CheckboxGroup: {
      target: BeeCheckboxGroup,
      hiddenInputs: ['class', 'name'],
      controls: {
        label: { type: 'string' },
        invalid: { type: 'boolean' },
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

export default CheckboxGroupPage;
