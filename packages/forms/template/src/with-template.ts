import { computed, type InputSignalWithTransform, isSignal, type Signal, Type } from '@angular/core';

import type {
  BeeFieldConfig,
  BeeFieldConfigValidWithoutControlKeys,
  BeeFieldSignalProps,
  BeeFieldTemplateValue,
  OmitStrict,
  PickStrict
} from '@flebee/forms/core';

export type UnwrapSignalInputs<Type> = {
  [Prop in keyof Type as Type[Prop] extends InputSignalWithTransform<any, any>
    ? Prop
    : never]: Type[Prop] extends InputSignalWithTransform<any, infer WriteT> ? WriteT : never;
};

type IsEmptyObject<T> = keyof T extends never ? true : false;

type InferComponentInputs<T> =
  T extends Type<infer C> ? (IsEmptyObject<UnwrapSignalInputs<C>> extends true ? never : Partial<UnwrapSignalInputs<C>>) : never;

type BaseFieldConfig = OmitStrict<PickStrict<BeeFieldConfig, BeeFieldConfigValidWithoutControlKeys>, 'props'>;

type TemplateValue = Exclude<BeeFieldTemplateValue, Type<any>>;

type BeeFieldConfigTemplate<Template extends BeeFieldTemplateValue> = BaseFieldConfig &
  (Template extends Type<any>
    ? { template: Template; inputs?: BeeFieldSignalProps<InferComponentInputs<Template>> }
    : { template: Signal<TemplateValue> | TemplateValue; inputs?: never });

export function withTemplate<Template extends BeeFieldTemplateValue>(config: BeeFieldConfigTemplate<Template>) {
  const { inputs, ...options } = config;

  const computedInputs = computed(() => {
    const safeInputs = Object.entries(inputs || {}).map(([key, value]) => [key, isSignal(value) ? value() : value]);

    return Object.fromEntries(safeInputs);
  });

  return { ...options, props: { inputs: computedInputs as InferComponentInputs<Template> } };
}
