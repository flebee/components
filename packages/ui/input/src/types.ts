import type { VariantProps } from 'cva';

import type { baseWrapper, content, description, inputBase, label, wrapper } from './styles';

export type BeeInputType = 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'tel' | 'text';

export type BeeInputDateType = Extract<BeeInputType, 'date' | 'datetime-local' | 'month'>;

export type BeeInputValue<Type extends BeeInputType> =
  | (Type extends 'number' ? number : Type extends BeeInputDateType ? Date : string)
  | undefined;

type BeeInputProps = VariantProps<typeof inputBase> &
  VariantProps<typeof label> &
  VariantProps<typeof wrapper> &
  VariantProps<typeof content> &
  VariantProps<typeof baseWrapper> &
  VariantProps<typeof description>;

export type BeeInputSize = NonNullable<BeeInputProps['size']>;
