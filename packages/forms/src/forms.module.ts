import { NgModule, type Type } from '@angular/core';

import { FormlyModule } from '@ngx-formly/core';
import type { FieldType } from '@ngx-formly/core/public_api';

import { BeeFieldGroup } from '@flebee/forms/field-group';
import { BeeFieldTemplate } from '@flebee/forms/template';

import { extensions } from './extensions';

@NgModule({
  exports: [FormlyModule],
  imports: [
    FormlyModule.forChild({
      extensions,
      types: [
        { name: 'formly-group', component: BeeFieldGroup as unknown as Type<FieldType> },
        { name: 'formly-template', component: BeeFieldTemplate as unknown as Type<FieldType> }
      ]
    })
  ]
})
export class BeeFormsModule {}
