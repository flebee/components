import type { TemplateRef } from '@angular/core';

import type { BeeFieldConfig, BeeFieldConfigValidWithoutControlKeys, BeeFieldSignalProps, PickStrict } from '@flebee/forms/core';
import type { BeeProgressColor, BeeProgressSize } from '@flebee/ui/progress';

import { BeeProgressField } from './progress.field';

export type BeeProgressProps<Value extends number> = BeeFieldSignalProps<{
  formatOptions?: Intl.NumberFormatOptions;
  label?: string | TemplateRef<void>;
  color?: BeeProgressColor;
  indeterminate?: boolean;
  size?: BeeProgressSize;
  showValue?: boolean;
  disabled?: boolean;
  value?: Value;
  max?: number;
  min?: number;
}>;

type BeeFieldConfigProgress<Value extends number> = PickStrict<
  BeeFieldConfig<any, BeeProgressProps<Value>>,
  BeeFieldConfigValidWithoutControlKeys
>;

export const withProgress = <Value extends number>(config: BeeFieldConfigProgress<Value>) => {
  return { ...config, type: BeeProgressField } as NonNullable<BeeFieldConfigProgress<Value>>;
};
