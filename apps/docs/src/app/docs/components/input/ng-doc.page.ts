import { NgDocPage } from '@ng-doc/core';

import { BeeInput } from '@flebee/ui/input';

import ComponentsCategory from '../ng-doc.category';

const InputPage: NgDocPage = {
  title: 'Input',
  mdFile: './index.md',
  category: ComponentsCategory,
  playgrounds: {
    Input: {
      target: BeeInput,
      template: ` <bee-input /> `,
      controls: {
        label: { type: 'string' },
        disabled: { type: 'boolean' },
        endContent: { type: 'string' },
        description: { type: 'string' },
        startContent: { type: 'string' },
        type: { type: 'BeeInputType', options: ['text', 'password', 'number', 'date', 'datetime-local', 'month'] }
      }
    }
  }
};

export default InputPage;
