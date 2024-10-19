import { provideHttpClient, withFetch } from '@angular/common/http';
import { type ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withViewTransitions } from '@angular/router';

import {
  NG_DOC_DEFAULT_PAGE_PROCESSORS,
  NG_DOC_DEFAULT_PAGE_SKELETON,
  NgDocDefaultSearchEngine,
  provideMainPageProcessor,
  provideNgDocApp,
  providePageSkeleton,
  provideSearchEngine
} from '@ng-doc/app';
import { provideNgDocContext } from '@ng-doc/generated';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgDocContext(),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideSearchEngine(NgDocDefaultSearchEngine),
    providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
    provideNgDocApp({
      shiki: {
        themes: [import('shiki/themes/github-dark.mjs')],
        theme: { dark: 'github-dark', light: 'github-dark' }
      },
      uiKit: { assetsPath: 'assets/ng-doc', customIconsPath: 'assets/ng-doc' }
    }),
    provideRouter(
      appRoutes,
      withPreloading(PreloadAllModules),
      withViewTransitions({ skipInitialTransition: true }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    )
  ]
};
