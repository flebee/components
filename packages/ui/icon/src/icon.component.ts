import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, mergeMap } from 'rxjs';

import { BeeIconService } from './icon.service';
import { BeeIconOptions } from './provide-icon';
import type { BeeIconName, BeeIconSize, BeeIconType, GetIcon, GetIconResponse, IsNever } from './types';

@Component({
  selector: 'bee-icon',
  host: { class: 'contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.width]="safeWidth()" [attr.height]="safeHeight()" [attr.viewBox]="viewBox()">
      @if (id(); as id) {
        <use [attr.href]="id" />
      }
    </svg>
  `
})
export class BeeIcon<Type extends BeeIconType> {
  private _viewBoxHeight = computed(() => (this._autoSize() ? this.icon().height : null));
  private _viewBoxWidth = computed(() => (this._autoSize() ? this.icon().width : null));
  private _autoSize = computed(() => this.size() === 'auto');
  private _beeIconSvc = inject(BeeIconService);
  private _options = inject(BeeIconOptions);

  public name = input.required<IsNever<BeeIconName<Type>> extends true ? string : BeeIconName<Type>>();
  public type = input.required<IsNever<Type> extends true ? string : Type>();
  public size = input<BeeIconSize>(this._options.defaultSize);
  public height = input<BeeIconSize>();
  public width = input<BeeIconSize>();

  public safeHeight = computed(() => this._viewBoxHeight() ?? this.height() ?? (this.width() ? 'auto' : this.size()));
  public safeWidth = computed(() => this._viewBoxWidth() ?? this.width() ?? (this.height() ? 'auto' : this.size()));
  public icon = toSignal(
    combineLatest({ name: toObservable(this.name), type: toObservable(this.type) }).pipe(
      mergeMap((options) => this._beeIconSvc.geIcon(options as GetIcon))
    ),
    { initialValue: { id: '', viewBox: null, height: null, width: null } satisfies GetIconResponse }
  );
  public id = computed(() => (this.icon().id ? `#${this.icon().id}` : ''));
  public viewBox = computed(() => this.icon().viewBox || '0 0 24 24');
}
