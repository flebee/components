import type { VariantProps } from 'cva';

import type { avatar } from './styles';

type AvatarProps = Required<VariantProps<typeof avatar>>;

export type AvatarSize = AvatarProps['size'];
export type AvatarRadius = AvatarProps['radius'];
