import { type ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { of, throwError } from 'rxjs';

import { globSync } from 'fast-glob';
import { readFileSync } from 'node:fs';

import { provideBeeIcon } from '@flebee/ui/icon';

import { appConfig } from './app.config';

const paths = [
  'browser', // Assets in production
  'apps/docs/public', // Assets in development mode and build process
  'node_modules/@tabler/icons' // Assets in development mode and build process
];
const icons = new Map(globSync(`{${paths.join()}}/**/*.svg`).map((url) => [url.split('/').slice(-3).join('/'), url]));

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideBeeIcon({
      getUrl: ({ name, type }) => `icons/${type}/${name}.svg`,
      load: (url) => {
        const iconPath = icons.get(url);

        if (!iconPath) return throwError(() => 'Icon does not exist');

        return of(readFileSync(iconPath, 'utf8'));
      }
    })
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
