import type { VariantProps } from 'cva';

import type { tag } from './styles';

type TagProps = VariantProps<typeof tag>;

export type BeeTagColor = NonNullable<TagProps['color']>;

export type BeeTagSize = NonNullable<TagProps['size']>;
