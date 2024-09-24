import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type BeeFieldConfig, BeeFieldType } from '@flebee/forms/core';
import { BeeProgress } from '@flebee/ui/progress';

import type { BeeProgressProps } from './with-progress';

@Component({
  standalone: true,
  imports: [BeeProgress],
  selector: 'bee-field-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bee-progress
      [value]="props.value"
      [min]="props.min ?? 0"
      [max]="props.max ?? 100"
      [size]="props.size ?? 'md'"
      [label]="props.label ?? ''"
      [disabled]="props.disabled"
      [showValue]="props.showValue"
      [color]="props.color ?? 'primary'"
      [indeterminate]="props.indeterminate"
      [formatOptions]="props.formatOptions ?? { style: 'percent' }"
    />
  `
})
export class BeeProgressField extends BeeFieldType<BeeFieldConfig<string, BeeProgressProps<number>>> {}
