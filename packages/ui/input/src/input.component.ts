import { DatePipe } from '@angular/common';
import { Component, type TemplateRef, booleanAttribute, computed, inject, input, model } from '@angular/core';

import { BeeStringTemplate } from '@flebee/ui/string-template';

import { dateTypes, formatDates } from './constants';
import { baseWrapper, content, description, inputBase, label, wrapper } from './styles';
import type { BeeInputDateType, BeeInputSize, BeeInputType, BeeInputValue } from './types';

@Component({
  standalone: true,
  providers: [DatePipe],
  selector: 'bee-input',
  imports: [BeeStringTemplate],
  template: `
    <label [class]="baseWrapperClass">
      @if (label(); as label) {
        <bee-string-template [content]="label" [class]="labelClass()" />
      }

      <div [class]="wrapperClass()">
        @if (startContent(); as startContent) {
          <bee-string-template [content]="startContent" [class]="contentClass()" />
        }

        <input
          [type]="type()"
          [class]="inputClass()"
          [value]="renderValue()"
          [disabled]="disabled()"
          [placeholder]="placeholder()"
          (input)="onInput($event)"
        />

        @if (endContent(); as endContent) {
          <bee-string-template [content]="endContent" [class]="contentClass()" />
        }
      </div>
    </label>

    @if (description(); as description) {
      <bee-string-template [content]="description" [class]="descriptionClass()" />
    }
  `
})
export class BeeInput<Type extends BeeInputType> {
  private _datePipe = inject(DatePipe);

  public disabled = input(false, { transform: booleanAttribute });
  public startContent = input<TemplateRef<void> | string>('');
  public description = input<TemplateRef<void> | string>('');
  public endContent = input<TemplateRef<void> | string>('');
  public label = input<TemplateRef<void> | string>('');
  public value = model<BeeInputValue<Type>>(undefined);
  public size = input<BeeInputSize>('md');
  public placeholder = input<string>('');
  public type = input.required<Type>();

  public renderValue = computed(() => this._getRenderValue(this.type(), this.value()));
  public descriptionClass = computed(() => description({ size: this.size() }));
  public contentClass = computed(() => content({ size: this.size() }));
  public inputClass = computed(() => inputBase({ size: this.size() }));
  public wrapperClass = computed(() => wrapper({ size: this.size() }));
  public labelClass = computed(() => label({ size: this.size() }));
  public baseWrapperClass = baseWrapper();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.value.set(this._parseValue(target));
  }

  private _getRenderValue(type: Type, value: BeeInputValue<Type>): string {
    const cleanValue = value?.toString() ?? '';

    if (!dateTypes.includes(type as BeeInputDateType)) return cleanValue;

    return this._datePipe.transform(cleanValue, formatDates[type as BeeInputDateType]) ?? '';
  }

  private _parseValue(target: HTMLInputElement): BeeInputValue<Type> {
    const dateValue = new Date(target.value);
    const numberValue = target.valueAsNumber;
    const type = this.type();

    if (dateTypes.includes(type)) return this._isValidDate(dateValue) ? (dateValue as BeeInputValue<Type>) : undefined;

    if (type === 'number') return isNaN(numberValue) ? undefined : (numberValue as BeeInputValue<Type>);

    return (target.value as BeeInputValue<Type>) || undefined;
  }

  private _isValidDate(value: Date | null | number | string | undefined): boolean {
    if (value == null) return false;

    const date = new Date(value);

    return date instanceof Date && !isNaN(date.getTime());
  }
}
