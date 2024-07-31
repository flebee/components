import type { VariantProps } from 'cva';

import type { base, control, description, groupBase, groupDescription, groupLabel, label, labelWrapper, wrapper } from './styles';

type RadioGroupProps = VariantProps<typeof base> &
  VariantProps<typeof wrapper> &
  VariantProps<typeof label> &
  VariantProps<typeof control> &
  VariantProps<typeof groupBase> &
  VariantProps<typeof groupLabel> &
  VariantProps<typeof description> &
  VariantProps<typeof labelWrapper> &
  VariantProps<typeof groupDescription>;

export type BeeRadioGroupOrientation = NonNullable<RadioGroupProps['orientation']>;

export type BeeRadioGroupSize = NonNullable<RadioGroupProps['size']>;
