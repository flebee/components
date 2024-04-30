import { NgDocPage } from '@ng-doc/core';

import { BeeTag } from '@flebee/ui/tag';

import ComponentsCategory from '../ng-doc.category';

const TagPage: NgDocPage = {
  title: 'Tag',
  mdFile: './index.md',
  category: ComponentsCategory,
  playgrounds: {
    Tag: {
      target: BeeTag,
      hiddenInputs: ['class'],
      template: `<bee-tag> Tag </bee-tag>`
    }
  }
};

export default TagPage;
