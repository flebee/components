import type { TemplateRef } from '@angular/core';

import type {
  BeeFieldConfigValidWithControlKeys,
  BeeFieldConfigWithoutFieldGroup,
  BeeFieldSignalProps,
  BeeFieldUnwrapProp,
  PickStrict,
  RequiredStrict
} from '@flebee/forms/core';
import type { BeeInputSize, BeeInputType, BeeInputValue } from '@flebee/ui/input';

import { BeeInputField } from './input.field';

export type BeeInputProps<Type extends BeeInputType = BeeInputType> = (Type extends 'number'
  ? BeeFieldSignalProps<{ min?: number; max?: number }> & { type: Type }
  : Type extends 'email' | 'password' | 'tel' | 'text'
    ? BeeFieldSignalProps<{ maxLength?: number; minLength?: number }> & { type: Type }
    : { type: Type; pattern?: RegExp | string }) &
  BeeFieldSignalProps<{
    startContent?: string | TemplateRef<void>;
    description?: string | TemplateRef<void>;
    endContent?: string | TemplateRef<void>;
    label?: string | TemplateRef<void>;
    placeholder?: string;
    size?: BeeInputSize;
    required?: boolean;
    disabled?: boolean;
  }>;

type BeeFieldInputValue<Props extends BeeInputProps> =
  BeeFieldUnwrapProp<Props['required']> extends true
    ? NonNullable<BeeInputValue<BeeFieldUnwrapProp<Props['type']>>>
    : NonNullable<BeeInputValue<BeeFieldUnwrapProp<Props['type']>>> | undefined;

type BeeFieldConfigInput<Key extends string, Props extends BeeInputProps> = BeeFieldConfigWithoutFieldGroup<
  Key,
  Props & BeeInputProps,
  BeeFieldInputValue<Props>
>;

export const withInput = <Key extends string, Props extends BeeInputProps>(
  input: RequiredStrict<PickStrict<BeeFieldConfigInput<Key, Props>, BeeFieldConfigValidWithControlKeys>, 'props'>
) => {
  return { ...input, type: BeeInputField } as NonNullable<BeeFieldConfigInput<Key, Props>>;
};
