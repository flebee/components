import type { VariantProps } from 'cva';

import type { base, indicator, label, track } from './styles';

type ProgressProps = VariantProps<typeof base> &
  VariantProps<typeof indicator> &
  VariantProps<typeof track> &
  VariantProps<typeof label>;

export type BeeProgressColor = NonNullable<ProgressProps['color']>;

export type BeeProgressSize = NonNullable<ProgressProps['size']>;
