import { signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import type { BeeBuildFormFields, BeeFieldConfig } from '@flebee/forms/core';

export function buildForm<Fields extends unknown[]>(...fields: BeeFieldConfig[] | Fields) {
  const form = new FormGroup({} as BeeBuildFormFields<Fields>);

  return { form, fields, model: signal<typeof form.value>({}) };
}
