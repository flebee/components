import {
  type AfterContentInit,
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  Injector,
  isSignal,
  type OnChanges,
  type OnDestroy,
  type OnInit,
  runInInjectionContext,
  type Signal,
  type SimpleChanges
} from '@angular/core';

import { FormlyField } from '@ngx-formly/core';

export const ɵFLEBEE_SIGNALS_PROPS = '~[flebee] SIGNALS_PROPS';

@Component({
  selector: 'bee-field',
  styles: `
    :host:empty {
      display: none;
    }
  `,
  template: `<ng-template #container />`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeeField extends FormlyField implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
  private _injector = inject(Injector);

  override ngAfterContentInit() {
    runInInjectionContext(this._injector, () => super.ngAfterContentInit());
  }

  override ngAfterViewInit() {
    runInInjectionContext(this._injector, () => super.ngAfterViewInit());
  }

  override ngOnInit() {
    runInInjectionContext(this._injector, () => super.ngOnInit());
    this._initReactiveSignals();
  }

  override ngOnChanges(changes: SimpleChanges) {
    runInInjectionContext(this._injector, () => super.ngOnChanges(changes));
  }

  private _initReactiveSignals() {
    const props = (this.field as { [ɵFLEBEE_SIGNALS_PROPS]?: Record<string, Signal<unknown>> })[ɵFLEBEE_SIGNALS_PROPS] || {};
    const { hide, template, className, fieldGroupClassName } = this.field;
    const attributes = { hide, template, className, fieldGroupClassName };
    const destroyCallbacks: Array<() => void> = [];

    Object.entries(attributes).forEach(([key, value]) => {
      if (!isSignal(value)) return;

      effect(() => Object.assign(this.field, { [key]: value() }), { injector: this._injector });
      destroyCallbacks.push(() => Object.assign(this.field, { [key]: value }));
    });

    Object.entries(props).forEach(([key, value]) => {
      effect(() => Object.assign(this.field.props!, { [key]: value() }), { injector: this._injector });
    });

    this._injector.get(DestroyRef).onDestroy(() => destroyCallbacks.forEach((callback) => callback()));
  }

  override ngOnDestroy() {
    runInInjectionContext(this._injector, () => super.ngOnDestroy());
  }
}
