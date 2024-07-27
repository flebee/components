import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  untracked,
  type TemplateRef
} from '@angular/core';

import { useId, type BooleanInput, type Nullable } from '@flebee/ui/core';
import { BeeStringTemplate } from '@flebee/ui/string-template';

import { base, content, description, inputBase, label, wrapper } from './styles';
import type { BeeInputDateType, BeeInputSize, BeeInputType, BeeInputValue } from './types';

@Component({
  standalone: true,
  selector: 'bee-input',
  imports: [BeeStringTemplate],
  host: { '[class]': 'baseClass' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label(); as label) {
      <label [id]="labelledById()" [for]="id">
        <bee-string-template [content]="label" [class]="labelClass()" />
      </label>
    }

    <div [class]="wrapperClass()">
      @if (startContent(); as startContent) {
        <bee-string-template [content]="startContent" [class]="contentClass()" />
      }

      <input
        [id]="id"
        [type]="type()"
        [class]="inputClass()"
        [value]="renderValue()"
        [disabled]="disabled()"
        [placeholder]="placeholder()"
        [attr.aria-labelledby]="labelledById()"
        [attr.aria-describedby]="describedById()"
        (input)="onInput($event)"
      />

      @if (endContent(); as endContent) {
        <bee-string-template [content]="endContent" [class]="contentClass()" />
      }
    </div>

    @if (hit(); as hit) {
      <bee-string-template [id]="describedById()" [content]="hit" [class]="descriptionClass()" />
    }
  `
})
export class BeeInput<Type extends BeeInputType> {
  private _dateTypes: BeeInputDateType[] = ['date', 'month', 'datetime-local'];

  public placeholder = input('', { transform: (value: Nullable<string>) => value ?? '' });
  public disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public invalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public startContent = input<TemplateRef<void> | string>();
  public errorMessage = input<TemplateRef<void> | string>();
  public description = input<TemplateRef<void> | string>();
  public endContent = input<TemplateRef<void> | string>();
  public value = model<BeeInputValue<Type>>(undefined);
  public label = input<TemplateRef<void> | string>();
  public size = input<BeeInputSize>('md');
  public type = input.required<Type>();

  public hit = computed(() => (!!this.errorMessage() && this.invalid() ? this.errorMessage() : this.description()));
  public descriptionClass = computed(() => description({ size: this.size(), invalid: this.invalid() }));
  public inputClass = computed(() => inputBase({ size: this.size(), invalid: this.invalid() }));
  public wrapperClass = computed(() => wrapper({ size: this.size(), invalid: this.invalid() }));
  public labelClass = computed(() => label({ size: this.size(), invalid: this.invalid() }));
  public describedById = computed(() => (this.hit() ? `${this.id}-described` : undefined));
  public labelledById = computed(() => (this.label() ? `${this.id}-labelled` : undefined));
  public renderValue = computed(() => this._getRenderValue(this.type(), this.value()));
  public contentClass = computed(() => content({ size: this.size() }));
  public id = useId('bee-input');
  public baseClass = base();

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
