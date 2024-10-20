import { NgDocPage } from '@ng-doc/core';

import { BeeButton, BeeButtonGroup } from '@flebee/ui/button';
import { BeeIcon } from '@flebee/ui/icon';

import UiCategory from '../ng-doc.category';

const ButtonPage: NgDocPage = {
  title: 'Button',
  mdFile: './index.md',
  category: UiCategory,
  imports: [BeeButton, BeeIcon, BeeButtonGroup],
  playgrounds: {
    Button: {
      target: BeeButton,
      selectors: 'button[beeButton]',
      hiddenInputs: ['class', 'iconOnly'],
      controls: { disabled: { type: 'boolean' } },
      template: `
        <button beeButton>
          {{ content.icon }}
          Button
        </button>
      `,
      content: { icon: { label: 'Icon', template: `<bee-icon type="filled" name="camera" />` } }
    },
    ButtonIcon: {
      target: BeeButton,
      selectors: 'button[beeButton]',
      hiddenInputs: ['class', 'iconOnly'],
      controls: { disabled: { type: 'boolean' } },
      template: `
        <button beeButton iconOnly>
          <bee-icon type="filled" name="camera" />
        </button>
      `
    },
    ButtonGroup: {
      target: BeeButtonGroup,
      hiddenInputs: ['class'],
      controls: { fullWidth: { type: 'boolean' } },
      template: `
        <bee-button-group>
          <button beeButton> One </button>
          <button beeButton variant="secondary"> Custom </button>
          <button beeButton> Three </button>
        </bee-button-group>
      `
    }
  }
};

export default ButtonPage;
