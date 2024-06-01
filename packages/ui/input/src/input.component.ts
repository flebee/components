import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  booleanAttribute,
  computed,
  effect,
  input,
  model,
  untracked
} from '@angular/core';

import type { BooleanInput, Nullable } from '@flebee/ui/core';
import { BeeStringTemplate } from '@flebee/ui/string-template';

import { baseWrapper, content, description, inputBase, label, wrapper } from './styles';
import type { BeeInputDateType, BeeInputSize, BeeInputType, BeeInputValue } from './types';

@Component({
  standalone: true,
  selector: 'bee-input',
  imports: [BeeStringTemplate],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private _dateTypes: BeeInputDateType[] = ['date', 'month', 'datetime-local'];

  public placeholder = input('', { transform: (value: Nullable<string>) => value ?? '' });
  public disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public startContent = input<TemplateRef<void> | string>();
  public description = input<TemplateRef<void> | string>();
  public endContent = input<TemplateRef<void> | string>();
  public value = model<BeeInputValue<Type>>(undefined);
  public label = input<TemplateRef<void> | string>();
  public size = input<BeeInputSize>('md');
  public type = input.required<Type>();

  public renderValue = computed(() => this._getRenderValue(this.type(), this.value()));
  public descriptionClass = computed(() => description({ size: this.size() }));
  public contentClass = computed(() => content({ size: this.size() }));
  public inputClass = computed(() => inputBase({ size: this.size() }));
  public wrapperClass = computed(() => wrapper({ size: this.size() }));
  public labelClass = computed(() => label({ size: this.size() }));
  public baseWrapperClass = baseWrapper();

  constructor() {
    effect(() => {
      const value = this.value();

      if (!this._dateTypes.includes(this.type() as BeeInputDateType) || value instanceof Date) return;

      untracked(() => this.value.set(this._getValidDate(value) as BeeInputValue<Type>));
    });
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.value.set(this._parseValue(target));
  }

  private _getRenderValue(type: Type, value: BeeInputValue<Type>): string {
    if (value == null || !this._dateTypes.includes(type as BeeInputDateType)) return value?.toString() ?? '';

    const formatDates: Record<BeeInputDateType, number> = { 'datetime-local': 19, date: 10, month: 7 };
    const date = this._getValidDate(value);

    return date?.toISOString()?.substring(0, formatDates[type as BeeInputDateType]) ?? '';
  }

  private _parseValue(target: HTMLInputElement): BeeInputValue<Type> {
    const dateValue = new Date(target.value) as BeeInputValue<Type>;
    const numberValue = target.valueAsNumber;
    const type = this.type();

    if (this._dateTypes.includes(type as BeeInputDateType)) return this._getValidDate(dateValue) as BeeInputValue<Type>;

    if (type === 'number') return isNaN(numberValue) ? undefined : (numberValue as BeeInputValue<Type>);

    return (target.value as BeeInputValue<Type>) || undefined;
  }

  private _getValidDate(value: BeeInputValue<Type>): BeeInputValue<BeeInputDateType> {
    if (value == null) return undefined;

    const date = value instanceof Date ? value : new Date(value);

    return isNaN(date.getTime()) ? undefined : date;
  }
}
