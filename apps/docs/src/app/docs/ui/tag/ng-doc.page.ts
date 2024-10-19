import { NgDocPage } from '@ng-doc/core';

import { BeeTag } from '@flebee/ui/tag';

import UiCategory from '../ng-doc.category';

const TagPage: NgDocPage = {
  title: 'Tag',
  mdFile: './index.md',
  category: UiCategory,
  playgrounds: {
    Tag: {
      target: BeeTag,
      hiddenInputs: ['class'],
      template: `<bee-tag> Tag </bee-tag>`
    }
  }
};

export default TagPage;
