import type { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BeeIconTypes {}

type Unit = '' | 'em' | 'px' | 'rem';

export type BeeIconSize = 'auto' | `${number}${Unit}`;

export type IsNever<T> = [T] extends [never] ? true : false;

export type BeeIconType = keyof BeeIconTypes;

export type BeeIconName<Type extends BeeIconType = BeeIconType> = {
  [Key in BeeIconType]: [BeeIconTypes[Key]] extends string ? string & NonNullable<unknown> : BeeIconTypes[Key];
}[Type];

export interface GetIcon {
  name: BeeIconName;
  type: BeeIconType;
}

export interface GetIconResponse {
  id: string;
  width: null | number;
  height: null | number;
  viewBox: null | string;
}

export interface ProvideBeeIconOptions {
  /**
   * @default '1.25em'
   */
  defaultSize: BeeIconSize;
  /**
   * @default ```ts
   *  ({ name, type }) => `/assets/icons/${type}/${name}.svg`
   * ```
   */
  getUrl: (options: GetIcon) => string;
  /**
   * @default ```ts
   *  (url) => inject(HttpClient).get(url, { responseType: 'text' })
   * ```
   */
  load(url: string): Observable<string>;
}
