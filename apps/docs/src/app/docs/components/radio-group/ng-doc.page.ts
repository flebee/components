import { NgDocPage } from '@ng-doc/core';

import { BeeRadio, BeeRadioGroup } from '@flebee/ui/radio';

import ComponentsCategory from '../ng-doc.category';

const RadioPage: NgDocPage = {
  title: 'Radio Group',
  mdFile: './index.md',
  category: ComponentsCategory,
  imports: [BeeRadio, BeeRadioGroup],
  playgrounds: {
    RadioGroup: {
      target: BeeRadioGroup,
      hiddenInputs: ['class', 'name'],
      controls: { disabled: { type: 'boolean' }, label: { type: 'string' } },
      template: `
        <bee-radio-group>
          <bee-radio value="buenos-aires"> Buenos Aires </bee-radio>
          <bee-radio value="sydney"> Sydney </bee-radio>
          <bee-radio value="london"> London </bee-radio>
          <bee-radio value="tokyo"> Tokyo </bee-radio>
        </bee-radio-group>
      `
    },
    RadioGroupWithDescription: {
      target: BeeRadioGroup,
      hiddenInputs: ['class', 'name'],
      controls: { disabled: { type: 'boolean' }, label: { type: 'string' } },
      template: `
        <bee-radio-group>
          <bee-radio value="buenos-aires" description="Capital city"> Buenos Aires </bee-radio>
          <bee-radio value="sydney" description="Capital city"> Sydney </bee-radio>
          <bee-radio value="london" description="Capital city"> London </bee-radio>
          <bee-radio value="tokyo" description="Capital city"> Tokyo </bee-radio>
        </bee-radio-group>
      `
    }
  }
};

export default RadioPage;
