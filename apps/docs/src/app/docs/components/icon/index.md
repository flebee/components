# {{ NgDocPage.title }}

### Import Icon

```ts
import { BeeIcon } from '@flebee/ui/icon';
```

### Demo with [Tabler Icons](https://tabler.io/icons)

{{ NgDocActions.demo("IconDemoComponent") }}

### Icon typing

To improve the development experience you can do strict typing of the type and name in a simple way.

You must create a `global.d.ts` file at the same level as `main.ts`

Then declare an interface where the keys will be the types available for icon and the values ​​will be the names. should be as follows

```typescript name="global.d.ts" icon="typescript"
declare global {
  declare module '@flebee/ui/icon' {
    export interface BeeIconTypes {
      filled: 'carousel-horizontal' | 'user' | NonNullable<unknown>;
      outline: 'carousel-horizontal' | 'settings-pin' | 'user';
      regular: string;
    }
  }
}
```

### Global setting

You can change the strategy of loading the default icons already provided for ease of use

#### Default configuration

```typescript
{
  defaultSize: '1.25em',
  getUrl: ({ type, name }) => `/icons/${type}/${name}.svg`,
  load: (url) => inject(HttpClient).get(url, { responseType: 'text' })
}
```

To change the default options you can use `provideBeeIcon` and adjust it to your needs

```typescript name="app.config,ts" icon="typescript"
import { provideHttpClient, withFetch } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideBeeIcon({
      getUrl: ({ type, name }) => `/assets/${type}/${name}.svg`
    })
  ]
};
```

#### Improve SSR performance with custom provider

```typescript name="app.config.server.ts" icon="typescript"
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
```

### Icon Properties

| Properties | Type                                                                                                      | Default  |
| ---------- | --------------------------------------------------------------------------------------------------------- | -------- |
| size       | `auto` \| `number` \| `rem` \| `em` \| `px`                                                               | `1.25em` |
| height     | `auto` \| `number` \| `rem` \| `em` \| `px`                                                               |          |
| width      | `auto` \| `number` \| `rem` \| `em` \| `px`                                                               |          |
| type       | By default it is a `string` but you can infer the [typing dynamically](/docs/components/icon#icon-typing) |          |
| name       | By default it is a `string` but you can infer the [typing dynamically](/docs/components/icon#icon-typing) |          |
