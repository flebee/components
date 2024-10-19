import { HttpClient } from '@angular/common/http';
import { type EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders } from '@angular/core';

import type { ProvideBeeIconOptions } from './types';

const defaultOptions: ProvideBeeIconOptions = {
  defaultSize: '1.25em',
  getUrl: ({ type, name }) => `/icons/${type}/${name}.svg`,
  load: (url) => inject(HttpClient).get(url, { responseType: 'text' })
};

export const BeeIconOptions = new InjectionToken('BeeIconOptionsToken', { providedIn: 'root', factory: () => defaultOptions });

/**
 * @description
 * Use this function to register the BeeIcon providers in your application.
 *
 * @example
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *  providers: [
 *   provideBeeIcon({
 *     getUrl: ({ type, name }) => `/icons/${type}/${name}.svg`,
 *     load: (url) => inject(HttpClient).get(url, { responseType: 'text' })
 *   })
 * ]});
 * ```
 */
export const provideBeeIcon = (options?: Partial<ProvideBeeIconOptions>): EnvironmentProviders => {
  return makeEnvironmentProviders([{ provide: BeeIconOptions, useValue: { ...defaultOptions, ...options } }]);
};
