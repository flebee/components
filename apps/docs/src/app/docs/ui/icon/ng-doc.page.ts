import { NgDocPage } from '@ng-doc/core';

import UiCategory from '../ng-doc.category';
import { IconDemoComponent } from './icon-demo.component';

const IconPage: NgDocPage = {
  title: 'Icon',
  mdFile: './index.md',
  category: UiCategory,
  demos: { IconDemoComponent }
};

export default IconPage;
