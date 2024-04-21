import type { VariantProps } from 'cva';

import type { button, buttonGroup } from './styles';

type ButtonProps = VariantProps<typeof button> & VariantProps<typeof buttonGroup>;

export type BeeButtonVariant = NonNullable<ButtonProps['variant']>;

export type BeeButtonSize = NonNullable<ButtonProps['size']>;
