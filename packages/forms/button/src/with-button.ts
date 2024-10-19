import type { TemplateRef } from '@angular/core';

import type {
  BeeFieldConfig,
  BeeFieldConfigValidWithoutControlKeys,
  BeeFieldSignalProps,
  PickStrict,
  RequiredStrict
} from '@flebee/forms/core';
import type { BeeButtonSize, BeeButtonVariant } from '@flebee/ui/button';

import { BeeButtonField } from './button.field';

export type BeeButtonType = 'button' | 'submit';

type BeeClickButton<Type extends BeeButtonType> = (
  field: NonNullable<BeeFieldConfigButton<Type> & BeeButtonField>,
  event: MouseEvent
) => void;

export type BeeButtonProps<Type extends BeeButtonType> = (Type extends 'button'
  ? { type: Type; onClick: BeeClickButton<Type> }
  : { type: Type; onClick?: BeeClickButton<Type> }) &
  BeeFieldSignalProps<{
    class?: string;
    iconOnly?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    size?: BeeButtonSize;
    variant?: BeeButtonVariant;
    label: string | TemplateRef<void>;
  }>;

type BeeFieldConfigButton<Type extends BeeButtonType> = RequiredStrict<
  PickStrict<BeeFieldConfig<any, BeeButtonProps<Type>>, BeeFieldConfigValidWithoutControlKeys>,
  'props'
>;

export const withButton = <Type extends BeeButtonType>(config: BeeFieldConfigButton<Type>) => {
  return { ...config, type: BeeButtonField } as NonNullable<BeeFieldConfigButton<Type>>;
};
