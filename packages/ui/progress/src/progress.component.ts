import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  booleanAttribute,
  computed,
  input,
  model,
  numberAttribute
} from '@angular/core';

import { type BooleanInput, type Nullable, type NumberInput, clamp } from '@flebee/ui/core';
import { NumberFormatPipe } from '@flebee/ui/intl';
import { BeeStringTemplate } from '@flebee/ui/string-template';

import { base, indicator, label, track } from './styles';
import type { BeeProgressColor, BeeProgressSize } from './types';

@Component({
  standalone: true,
  selector: 'bee-progress',
  imports: [BeeStringTemplate, NumberFormatPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'progressbar',
    '[class]': 'baseClass',
    'aria-label': 'progress',
    '[attr.aria-valuemin]': 'min()',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-valuenow]': 'indeterminate() ? undefined : clamValue()',
    '[attr.aria-valuetext]': 'indeterminate() ? undefined : valueLabel()'
  },
  template: `
    @if (showValue() || label()) {
      <div [class]="labelClass()">
        @if (label()) {
          <bee-string-template [content]="label()" />
        }

        @if (!indeterminate() && showValue()) {
          <bee-string-template [content]="valueLabel() | numberFormat: formatOptions()" />
        }
      </div>
    }

    <div [class]="trackClass()">
      <div [class]="indicatorClass()" [style.width.%]="width()"></div>
    </div>
  `
})
export class BeeProgress {
  public indeterminate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public max = input(100, { transform: (value: NumberInput) => numberAttribute(value, 100) });
  public showValue = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public min = input(0, { transform: (value: NumberInput) => numberAttribute(value, 0) });
  public disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public formatOptions = input<Intl.NumberFormatOptions>({ style: 'percent' });
  public label = input<TemplateRef<void> | string>('');
  public value = model<Nullable<number>>(undefined);
  public color = input<BeeProgressColor>('primary');
  public size = input<BeeProgressSize>('md');

  public clamValue = computed(() => clamp(this.indeterminate() ? this.max() : this.value() ?? 0, this.min(), this.max()));
  public valueLabel = computed(() => (this.formatOptions()?.style === 'percent' ? this.percentage() : this.clamValue()));
  public indicatorClass = computed(() => indicator({ color: this.color(), indeterminate: this.indeterminate() }));
  public percentage = computed(() => (this.clamValue() - this.min()) / (this.max() - this.min()));
  public trackClass = computed(() => track({ size: this.size() }));
  public labelClass = computed(() => label({ size: this.size() }));
  public width = computed(() => this.percentage() * 100);
  public baseClass = base();
}
