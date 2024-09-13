import type { Routes } from '@angular/router';

import { NG_DOC_ROUTING } from '@ng-doc/generated';

import { DocsLayoutComponent } from './layout.component';

export default <Routes>[
  { path: '', redirectTo: 'components/installation', pathMatch: 'full' },
  { path: '', component: DocsLayoutComponent, children: NG_DOC_ROUTING }
];
