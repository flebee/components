import { Directive } from '@angular/core';

import { FieldType } from '@ngx-formly/core';

import type { BeeFieldConfig } from './field-config';
import type { BeeFieldUnwrapProp, PartialStrict } from './types';

declare module '@ngx-formly/core' {
  // @ts-expect-error 'duplicate identifier'
  export abstract class FieldType<Field extends BeeFieldConfig> {
    defaultOptions?: PartialStrict<Field>;
    field: Field;

    get props(): { [Key in keyof NonNullable<Field['props']>]: BeeFieldUnwrapProp<NonNullable<Field['props']>[Key]> };
    get formControl(): Field['formControl'] extends undefined ? undefined : NonNullable<Field['formControl']>;
    get form(): import('@angular/forms').FormArray | import('@angular/forms').FormGroup;
    get key(): Field['key'] extends undefined ? undefined : NonNullable<Field['key']>;
    get formState(): NonNullable<Field['options']>['formState'];
    get model(): Field['model'];
    get showError(): boolean;
    get id(): string;
  }
}

@Directive()
export abstract class BeeFieldType<Field extends BeeFieldConfig = BeeFieldConfig> extends FieldType<Field> {}
