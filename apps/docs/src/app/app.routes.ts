import type { Route } from '@angular/router';

import { NG_DOC_ROUTING } from '@ng-doc/generated';

export const appRoutes: Route[] = [
  { path: '', loadComponent: () => import('./home/home.component') },
  { path: 'docs', loadComponent: () => import('./docs/layout.component'), children: NG_DOC_ROUTING }
];
