import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  inject,
  Injector,
  input,
  isSignal,
  type OnInit,
  runInInjectionContext,
  type Signal,
  signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { isObservable } from 'rxjs';

import { type BeeFieldConfigWithoutFieldGroup, BeeFieldType, BeeValidation } from '@flebee/forms/core';
import { BeeRadio, BeeRadioGroup } from '@flebee/ui/radio';

import type {
  BeeOptionContext,
  BeeOptionsArray,
  BeeOptionsSource,
  BeeOptionValue,
  BeeRadioGroupProps,
  BeeRadioOption
} from './with-radio';

@Directive({ selector: '[beeWithCustomRadio]' })
export class BeeWithCustomRadio<T extends BeeOptionValue> {
  public beeWithCustomRadio = input<T>();

  static ngTemplateContextGuard<T extends BeeOptionValue>(dir: BeeWithCustomRadio<T>, ctx: unknown): ctx is BeeOptionContext<T> {
    return true;
  }
}

@Component({
  selector: 'bee-field-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BeeValidation, ReactiveFormsModule, BeeRadio, BeeRadioGroup, NgTemplateOutlet],
  template: `
    <bee-radio-group
      [invalid]="showError"
      [label]="props.label"
      [size]="props.size ?? 'md'"
      [formControl]="formControl"
      [description]="props.description"
      [errorMessage]="beeValidation.message()"
      [orientation]="props.orientation ?? 'vertical'"
    >
      @for (option of valueOptions(); track option.value) {
        <bee-radio
          [class]="className()"
          [value]="option.value"
          [disabled]="option.disabled()"
          [description]="description() ? descriptionTpl : option.description()"
        >
          <ng-template #descriptionTpl>
            @if (description(); as description) {
              <ng-container *ngTemplateOutlet="description; context: { $implicit: option }" />
            }
          </ng-template>

          @if (label(); as label) {
            <ng-container *ngTemplateOutlet="label; context: { $implicit: option }" />
          } @else {
            {{ option.label() }}
          }
        </bee-radio>
      }
    </bee-radio-group>

    <bee-validation #beeValidation="beeValidation" [field]="beeField" />
  `
})
export class BeeRadioGroupField
  extends BeeFieldType<BeeFieldConfigWithoutFieldGroup<string, BeeRadioGroupProps>>
  implements OnInit
{
  private _allOptions = signal<ReturnType<BeeRadioGroupField['_resolveOptions']>>(signal([]));
  private _injector = inject(Injector);

  public valueOptions = computed(() => this._allOptions()().map((option) => this._parseOption(option)));
  public description = computed(() => this._getValueSignal(this.props.customOptionRender?.description));
  public className = computed(() => this._getValueSignal(this.props.customOptionRender?.class));
  public label = computed(() => this._getValueSignal(this.props.customOptionRender?.label));

  ngOnInit(): void {
    this._allOptions.set(this._resolveOptions(this.props.options));
  }

  private _resolveOptions(allOptions: BeeOptionsSource): Signal<BeeOptionsArray> {
    if (isObservable(allOptions)) return toSignal(allOptions, { injector: this._injector, initialValue: [] });

    if (!isSignal(allOptions) && typeof allOptions === 'function')
      return this._resolveOptions(runInInjectionContext(this._injector, () => allOptions()));

    return computed(() => this._getValueSignal(allOptions) || []);
  }

  private _parseOption(option: BeeRadioOption) {
    const description = computed(() => this._getValueSignal(option.description));
    const disabled = computed(() => this._getValueSignal(option.disabled));
    const label = computed(() => this._getValueSignal(option.label));

    return { label, disabled, description, value: option.value };
  }

  private _getValueSignal = <Value>(value: Signal<Value> | Value): Value => (isSignal(value) ? value() : value);
}
