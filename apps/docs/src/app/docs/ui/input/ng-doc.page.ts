import { NgDocPage } from '@ng-doc/core';

import { BeeInput } from '@flebee/ui/input';

import UiCategory from '../ng-doc.category';

const InputPage: NgDocPage = {
  title: 'Input',
  mdFile: './index.md',
  category: UiCategory,
  playgrounds: {
    Input: {
      target: BeeInput,
      template: ` <bee-input /> `,
      controls: {
        label: { type: 'string' },
        disabled: { type: 'boolean' },
        endContent: { type: 'string' },
        description: { type: 'string' },
        errorMessage: { type: 'string' },
        startContent: { type: 'string' },
        type: { type: 'BeeInputType', options: ["'text'", "'password'", "'number'", "'date'", "'datetime-local'", "'month'"] }
      }
    }
  }
};

export default InputPage;
