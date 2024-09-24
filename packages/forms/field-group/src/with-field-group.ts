import type { FormGroup } from '@angular/forms';

import type {
  BeeBuildInferForm,
  BeeFieldConfigValidWithControlKeys,
  BeeFieldConfigWithFieldGroup,
  OmitStrict,
  PickStrict,
  RequiredStrict
} from '@flebee/forms/core';

export type BeeFieldGroupConfig<
  Key extends string,
  Fields extends unknown[],
  Props extends Record<string, unknown> = Record<string, any>
> = PickStrict<
  BeeFieldConfigWithFieldGroup<Key, Props, any, Fields, FormGroup<BeeBuildInferForm<Fields>>>,
  BeeFieldConfigValidWithControlKeys
>;

export type BeeFieldGroupOutput<
  Key extends string,
  Fields extends unknown[],
  Props extends Record<string, any> = Record<string, any>
> = BeeFieldConfigWithFieldGroup<Key, Props, any, Fields>;

export function withFieldGroup<Fields extends unknown[]>(
  config: OmitStrict<BeeFieldGroupConfig<any, Fields>, 'defaultValue' | 'key' | 'props'>,
  ...fieldGroup: Fields
): OmitStrict<BeeFieldGroupOutput<any, Fields>, 'defaultValue' | 'key'>;
export function withFieldGroup<Key extends string, Fields extends unknown[]>(
  config: OmitStrict<RequiredStrict<BeeFieldGroupConfig<Key, Fields>, 'key'>, 'props'>,
  ...fieldGroup: Fields
): BeeFieldGroupOutput<Key, Fields>;
export function withFieldGroup<Key extends string, Fields extends unknown[]>(
  { className, ...config }: OmitStrict<BeeFieldGroupConfig<Key, Fields>, 'props'>,
  ...fieldGroup: Fields
): BeeFieldGroupOutput<Key, Fields> {
  return { ...config, fieldGroupClassName: className, fieldGroup } as BeeFieldGroupOutput<Key, Fields>;
}
