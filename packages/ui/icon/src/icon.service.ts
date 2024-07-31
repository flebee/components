import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { catchError, finalize, map, type Observable, of, share } from 'rxjs';

import { BeeIconOptions } from './provide-icon';
import type { GetIcon, GetIconResponse } from './types';

const removeAttributes = ['width', 'height', 'class'];

@Injectable({ providedIn: 'root' })
export class BeeIconService {
  private _document = inject(DOCUMENT);
  private _injector = inject(Injector);
  private _options = inject(BeeIconOptions);
  private _cacheDocument = this._getCacheDocument();
  private _inProgressLoads = new Map<string, Observable<string>>();

  geIcon({ name, type }: GetIcon): Observable<GetIconResponse> {
    const id = `bee-icon-${type}-${name}`;
    const cacheIcon = this._cacheDocument.querySelector<SVGMarkerElement>(`#${id}`);

    if (cacheIcon) return of(this._getIconResponse(id, cacheIcon));

    return this._loadIcon({ name, type }).pipe(
      map((response) => {
        const div = this._document.createElement('div');
        div.innerHTML = response;

        const iconSvg = div.querySelector<SVGMarkerElement>('svg');

        if (!iconSvg) throw new Error('<svg> tag not found.');

        removeAttributes.forEach((attribute) => iconSvg.removeAttribute(attribute));
        iconSvg.setAttribute('id', id);

        this._cacheDocument.appendChild(iconSvg);

        return this._getIconResponse(id, iconSvg);
      }),
      catchError(() => {
        console.error(`Icon ${name} does not exist or is not registered.`);

        return of(this._getIconResponse(id, null));
      })
    );
  }

  private _getCacheDocument(): HTMLElement {
    const key = 'bee-icon-state';
    const cacheDocument = this._document.querySelector<HTMLElement>(key);

    if (cacheDocument) return cacheDocument;

    const newCacheDocument = this._document.createElement(key);
    newCacheDocument.classList.value = 'fixed size-0 overflow-hidden -top-full -left-full';

    this._document.body.appendChild(newCacheDocument);

    return newCacheDocument;
  }

  private _getIconResponse(id: string, svg: null | SVGMarkerElement): GetIconResponse {
    const viewBox = svg?.getAttribute('viewBox') ?? null;
    const size = viewBox?.split(' ')?.splice(2) || [];
    const height = Number(size[1]);
    const width = Number(size[0]);

    return { id, viewBox, height: isNaN(height) ? null : height, width: isNaN(width) ? width : null };
  }

  private _loadIcon(options: GetIcon): Observable<string> {
    const url = this._options.getUrl(options);
    const inProgress = this._inProgressLoads.get(url);

    if (inProgress) return inProgress;

    const newInProgress = runInInjectionContext(this._injector, () => this._options.load(url)).pipe(
      finalize(() => this._inProgressLoads.delete(url)),
      share()
    );

    this._inProgressLoads.set(url, newInProgress);

    return newInProgress;
  }
}
