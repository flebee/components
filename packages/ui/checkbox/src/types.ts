import type { VariantProps } from 'cva';

import type { base, groupBase, groupDescription, groupLabel, groupWrapper, icon, label, wrapper } from './styles';

type BeeCheckboxProps = VariantProps<typeof wrapper> &
  VariantProps<typeof label> &
  VariantProps<typeof icon> &
  VariantProps<typeof base>;

type BeeCheckboxGroupProps = VariantProps<typeof groupWrapper> &
  VariantProps<typeof groupBase> &
  VariantProps<typeof groupLabel> &
  VariantProps<typeof groupDescription>;

export type BeeCheckboxSize = NonNullable<BeeCheckboxProps['size']>;

export type BeeCheckboxGroupOrientation = NonNullable<BeeCheckboxGroupProps['orientation']>;
