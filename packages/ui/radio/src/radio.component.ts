import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, type TemplateRef } from '@angular/core';

import type { BooleanInput } from '@flebee/ui/core';
import { BeeStringTemplate } from '@flebee/ui/string-template';

import { BeeRadioGroup } from './radio-group.component';
import { base, control, description, label, labelWrapper, wrapper } from './styles';

@Component({
  selector: 'bee-radio',
  imports: [BeeStringTemplate],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [class]="baseClass">
      <input
        type="radio"
        class="sr-only peer"
        [name]="name()"
        [value]="value()"
        [checked]="isSelected()"
        [disabled]="isDisabled()"
        (input)="onInput()"
        (blur)="cva.markAsTouched()"
      />

      <span aria-hidden="true" [class]="wrapperClass()">
        <span [class]="controlClass()"></span>
      </span>

      <div [class]="labelWrapperClass()">
        <span [class]="labelClass()">
          <ng-content />
        </span>

        @if (description(); as description) {
          <bee-string-template [class]="descriptionClass()" [content]="description" />
        }
      </div>
    </label>
  `
})
export class BeeRadio {
  private _group = inject(BeeRadioGroup);
  private _size = this._group.size;

  public disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public description = input<string | TemplateRef<void>>();
  public value = input.required<number | string>();

  public descriptionClass = computed(() => description({ size: this._size(), invalid: this._group.invalid() }));
  public wrapperClass = computed(() => wrapper({ size: this._size(), invalid: this._group.invalid() }));
  public controlClass = computed(() => control({ size: this._size(), invalid: this._group.invalid() }));
  public labelClass = computed(() => label({ size: this._size(), invalid: this._group.invalid() }));
  public labelWrapperClass = computed(() => labelWrapper({ size: this._size() }));
  public isDisabled = computed(() => this.cva.disabled() || this.disabled());
  public isSelected = computed(() => this.cva.value() === this.value());
  public name = computed(() => this._group.name() || this._group.id);
  public cva = this._group.cva;
  public baseClass = base();

  onInput(): void {
    this.cva.value.set(this.value());
  }
}
