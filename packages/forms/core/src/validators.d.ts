import type { Signal } from '@angular/core';
import type { AbstractControl, ValidationErrors } from '@angular/forms';
import type { Observable } from 'rxjs';

import type { BeeFieldConfig } from './field-config';

export type BeeMessage<Error = unknown, Field extends BeeFieldConfig = BeeFieldConfig> =
  | ((error: Error, field: Field) => Observable<string> | Signal<string> | string)
  | Signal<string>
  | string;

type BeeValidation<T, Field extends BeeFieldConfig = BeeFieldConfig> =
  | {
      [key: string]: {
        message: BeeMessage<undefined, Field>;
        expression: (control: NonNullable<Field['formControl']>, field: Field) => T;
      };
    }
  | { validation?: string[] };

interface DefaultValidationMessages {
  required: BeeMessage<boolean>;
  max: BeeMessage<{ max: number; actual: number }>;
  min: BeeMessage<{ min: number; actual: number }>;
  pattern: BeeMessage<{ requiredPattern: string; actualValue: string }>;
  minLength: BeeMessage<{ requiredLength: number; actualLength: number }>;
  maxLength: BeeMessage<{ requiredLength: number; actualLength: number }>;
}

export type BeeValidationMessages = DefaultValidationMessages & { [key: string & NonNullable<unknown>]: BeeMessage<unknown> };

export type BeeValidationName = keyof DefaultValidationMessages;

export type BeeFieldValidatorFn = (
  field: BeeFieldConfig,
  control: AbstractControl,
  options?: { [id: string]: any }
) => null | ValidationErrors;

export type BeeValidators =
  | { [key: string]: { expression: BeeFieldValidatorFn; message: BeeMessage } }
  | Partial<DefaultValidationMessages>;

export type BeeFieldValidators<Field extends BeeFieldConfig = BeeFieldConfig> = BeeValidation<boolean, Field>;

export type BeeFieldAsyncValidators<Field extends BeeFieldConfig = BeeFieldConfig> = BeeValidation<
  Observable<boolean> | Promise<boolean>,
  Field
>;
