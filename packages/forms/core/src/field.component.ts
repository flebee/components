import {
  type AfterContentInit,
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
  type OnChanges,
  type OnDestroy,
  type OnInit,
  runInInjectionContext,
  type SimpleChanges
} from '@angular/core';

import { FormlyField } from '@ngx-formly/core';

import type { BeeFieldConfig } from './field-config';

@Component({
  standalone: true,
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

  // @ts-expect-error 'override type'
  @Input() override field!: BeeFieldConfig;

  override ngAfterContentInit() {
    runInInjectionContext(this._injector, () => super.ngAfterContentInit());
  }

  override ngAfterViewInit() {
    runInInjectionContext(this._injector, () => super.ngAfterViewInit());
  }

  override ngOnInit() {
    runInInjectionContext(this._injector, () => super.ngOnInit());
  }

  override ngOnChanges(changes: SimpleChanges) {
    runInInjectionContext(this._injector, () => super.ngOnChanges(changes));
  }

  override ngOnDestroy() {
    runInInjectionContext(this._injector, () => super.ngOnDestroy());
  }
}
