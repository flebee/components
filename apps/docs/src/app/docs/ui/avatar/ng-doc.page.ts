import { NgDocPage } from '@ng-doc/core';

import { BeeAvatar, BeeAvatarFallback, BeeAvatarImage } from '@flebee/ui/avatar';
import { BeeIcon } from '@flebee/ui/icon';

import UiCategory from '../ng-doc.category';

const AvatarPage: NgDocPage = {
  title: 'Avatar',
  mdFile: './index.md',
  category: UiCategory,
  imports: [BeeAvatar, BeeIcon, BeeAvatarImage, BeeAvatarFallback],
  playgrounds: {
    Basic: {
      target: BeeAvatar,
      hiddenInputs: ['class'],
      template: `<bee-avatar />`,
      controls: { fallback: { type: 'string' }, src: { type: 'string' } }
    },
    CustomFallback: {
      target: BeeAvatar,
      hiddenInputs: ['class'],
      template: `
        <bee-avatar>
          <bee-icon beeAvatarFallback type="filled" name="user" />
        </bee-avatar>
      `
    },
    CustomImage: {
      target: BeeAvatar,
      hiddenInputs: ['class'],
      template: `
        <bee-avatar>
          <img beeAvatarImage src="https://i.pravatar.cc/300" />
        </bee-avatar>
      `
    },
    CustomFallbackAndImage: {
      target: BeeAvatar,
      hiddenInputs: ['class'],
      template: `
        <bee-avatar>
          <img beeAvatarImage src="https://i.pravatar.cc/300" />
          <bee-icon beeAvatarFallback type="filled" name="user" />
        </bee-avatar>
      `
    }
  }
};

export default AvatarPage;
