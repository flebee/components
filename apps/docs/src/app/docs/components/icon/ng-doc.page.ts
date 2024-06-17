import { NgDocPage } from '@ng-doc/core';

import ComponentsCategory from '../ng-doc.category';
import { IconDemoComponent } from './icon-demo.component';

const IconPage: NgDocPage = {
  title: 'Icon',
  mdFile: './index.md',
  demos: { IconDemoComponent },
  category: ComponentsCategory
};

export default IconPage;
