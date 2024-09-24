import { signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import type { BeeBuildInferForm, BeeBuildInferModel, BeeFieldConfig } from '@flebee/forms/core';

export function buildForm<Fields extends unknown[]>(...fields: BeeFieldConfig[] | Fields) {
  const form = new FormGroup({} as BeeBuildInferForm<Fields>);

  return { form, fields, model: signal({} as BeeBuildInferModel<Fields>) };
}
