import type { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component') },
  { path: 'docs', loadChildren: () => import('./docs/docs.routing') }
];
