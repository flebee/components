import { ChangeDetectionStrategy, Component, type TemplateRef, booleanAttribute, computed, inject, input } from '@angular/core';

import type { BooleanInput } from '@flebee/ui/core';
import { BeeStringTemplate } from '@flebee/ui/string-template';

import { BeeRadioGroup } from './radio-group.component';
import { base, control, description, label, labelWrapper, wrapper } from './styles';

@Component({
  standalone: true,
  selector: 'bee-radio',
  imports: [BeeStringTemplate],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [class]="baseClass">
      <input
        type="radio"
        [name]="name()"
        [value]="value()"
        (input)="onInput()"
        [checked]="isSelected()"
        [disabled]="isDisabled()"
        class="sr-only peer"
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
  public description = input<TemplateRef<void> | string>();
  public value = input.required<string>();

  public labelWrapperClass = computed(() => labelWrapper({ size: this._size() }));
  public descriptionClass = computed(() => description({ size: this._size() }));
  public isDisabled = computed(() => this._group.disabled() || this.disabled());
  public isSelected = computed(() => this._group.value() === this.value());
  public wrapperClass = computed(() => wrapper({ size: this._size() }));
  public controlClass = computed(() => control({ size: this._size() }));
  public name = computed(() => this._group.name() || this._group.id);
  public labelClass = computed(() => label({ size: this._size() }));
  public baseClass = base();

  onInput(): void {
    this._group.value.set(this.value());
  }
}
