import type { Signal, TemplateRef } from '@angular/core';
import type { Observable } from 'rxjs';

import type {
  BeeFieldConfigValidWithControlKeys,
  BeeFieldConfigWithoutFieldGroup,
  BeeFieldSignalProps,
  BeeFieldUnwrapProp,
  PickStrict,
  RequiredStrict
} from '@flebee/forms/core';
import type { BeeRadioGroupOrientation, BeeRadioGroupSize } from '@flebee/ui/radio';

import { BeeRadioGroupField } from './radio.field';

export type BeeOptionValue = boolean | null | number | string;

export interface BeeRadioOption<T extends BeeOptionValue = BeeOptionValue> {
  description?: Signal<string | undefined> | string;
  disabled?: boolean | Signal<boolean | undefined>;
  label: Signal<string> | string;
  value: T;
}

export type BeeOptionsArray = BeeRadioOption[];

type BeeExtractOptionsType<Type> = Type extends (field: any) => infer ReturnValue
  ? ReturnValue extends Observable<infer ObservableValue>
    ? ObservableValue
    : BeeFieldUnwrapProp<ReturnValue>
  : Type extends Observable<infer ObservableValue>
    ? ObservableValue
    : BeeFieldUnwrapProp<Type>;

export interface BeeOptionContext<T extends BeeOptionValue = BeeOptionValue> {
  $implicit: { description: Signal<string | undefined>; disabled: Signal<boolean | undefined>; label: Signal<string>; value: T };
}

export type BeeOptionsSource =
  | (() => BeeOptionsArray | Observable<BeeOptionsArray> | Signal<BeeOptionsArray>)
  | BeeOptionsArray
  | Observable<BeeOptionsArray>
  | Signal<BeeOptionsArray>;

export type BeeRadioGroupProps = BeeFieldSignalProps<{
  customOptionRender?: BeeFieldSignalProps<{
    description?: TemplateRef<BeeOptionContext>;
    label?: TemplateRef<BeeOptionContext>;
    class?: string;
  }>;
  description?: string | TemplateRef<void>;
  orientation?: BeeRadioGroupOrientation;
  label?: string | TemplateRef<void>;
  size?: BeeRadioGroupSize;
  required?: boolean;
  disabled?: boolean;
}> & {
  options: BeeOptionsSource;
};

type BeeRadioGroupValue<Props extends BeeRadioGroupProps> =
  BeeFieldUnwrapProp<Props['required']> extends true
    ? BeeExtractOptionsType<Props['options']>[number]['value']
    : BeeExtractOptionsType<Props['options']>[number]['value'] | undefined;

type BeeRadioFieldConfig<Key extends string, Props extends BeeRadioGroupProps> = BeeFieldConfigWithoutFieldGroup<
  Key,
  Props,
  BeeRadioGroupValue<Props>
>;

export const withRadioGroup = <Key extends string, Props extends BeeRadioGroupProps>(
  input: RequiredStrict<PickStrict<BeeRadioFieldConfig<Key, Props>, BeeFieldConfigValidWithControlKeys>, 'key' | 'props'>
) => {
  return { ...input, type: BeeRadioGroupField } as NonNullable<BeeRadioFieldConfig<Key, Props>>;
};
