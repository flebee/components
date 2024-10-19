import type { Routes } from '@angular/router';

import { NG_DOC_ROUTING } from '@ng-doc/generated';

import { DocsLayoutComponent } from './layout.component';

export default <Routes>[
  { path: 'ui', redirectTo: 'ui/installation', pathMatch: 'full' },
  { path: 'forms', redirectTo: 'forms/installation', pathMatch: 'full' },
  { path: '', component: DocsLayoutComponent, children: NG_DOC_ROUTING }
];
