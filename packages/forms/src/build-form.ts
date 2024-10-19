import { signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import type {
  BeeBuildInferForm,
  BeeBuildInferModel,
  BeeFieldConfig,
  BeeFormOptions as BeeFormCoreOptions,
  OmitStrict,
  RequiredStrict
} from '@flebee/forms/core';

export type BeeFormOptions<Model extends Record<string, any>> = OmitStrict<
  RequiredStrict<BeeFormCoreOptions<Model, any>>,
  'formState'
>;

export function buildForm<Fields extends unknown[]>(...fields: BeeFieldConfig[] | Fields) {
  type Model = BeeBuildInferModel<Fields>;

  const options: BeeFormOptions<Model> = { updateInitialValue: () => undefined, resetModel: () => undefined };
  const form = new FormGroup({} as BeeBuildInferForm<Fields>);

  return { form, fields, options, model: signal({} as Model) };
}
