import { NgDocPage } from '@ng-doc/core';

import FormsCategory from '../ng-doc.category';
import { FormsDemoComponent } from './forms-demo.component';

const DemoPage: NgDocPage = {
  order: 4,
  title: 'Demo',
  mdFile: './index.md',
  category: FormsCategory,
  demos: { FormsDemoComponent }
};

export default DemoPage;
