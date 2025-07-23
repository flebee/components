import { Directive } from '@angular/core';

import { FieldType } from '@ngx-formly/core';

import type { BeeFieldConfig } from './field-config';
import type { BeeFieldUnwrapProp } from './types';

@Directive()
export abstract class BeeFieldType<Field extends BeeFieldConfig = BeeFieldConfig> extends FieldType {
  get beeField() {
    return this.field as unknown as Field;
  }
  override get form() {
    return this.beeField.form as NonNullable<Field['form']>;
  }
  override get model() {
    return this.beeField.model as NonNullable<Field['model']>;
  }
  override get formState(): NonNullable<Field['options']>['formState'] {
    return this.beeField.form;
  }
  override get formControl() {
    return this.beeField.formControl as NonNullable<Field['formControl']>;
  }
  override get props() {
    return this.beeField.props as {
      [Key in keyof NonNullable<Field['props']>]: BeeFieldUnwrapProp<NonNullable<Field['props']>[Key]>;
    };
  }
}
