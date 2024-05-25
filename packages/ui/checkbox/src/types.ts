import type { VariantProps } from 'cva';

import type { base, icon, label, wrapper } from './style';

type BeeCheckboxProps = VariantProps<typeof wrapper> &
  VariantProps<typeof label> &
  VariantProps<typeof icon> &
  VariantProps<typeof base>;

export type BeeCheckboxSize = NonNullable<BeeCheckboxProps['size']>;
