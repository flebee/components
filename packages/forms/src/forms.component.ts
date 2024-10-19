import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { FormSubmittedEvent } from '@angular/forms';

import { FormlyConfig } from '@ngx-formly/core';
import type { ConfigOption, FormlyFieldConfig, ValidationMessageOption, ValidatorOption } from '@ngx-formly/core/lib/models';

import { BeeField } from '@flebee/forms/core';

import type { buildForm } from './build-form';
import { BeeFormsModule } from './forms.module';
import { injectBeeForms } from './provide-forms';

const isValidation = (
  validation: unknown
): validation is { message: ValidationMessageOption['message']; expression: ValidatorOption['validation'] } => {
  return typeof validation === 'object' && (validation as { message: unknown })['message'] != null;
};

@Component({
  standalone: true,
  selector: 'bee-forms',
  imports: [BeeField, BeeFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <formly-form [form]="formGroup()" [fields]="safeFields()" [(model)]="form().model" [options]="form().options" /> `
})
export class BeeForms<Fields extends unknown[]> {
  private _configs = injectBeeForms({ optional: true }) ?? [];
  private _formlyConfig = inject(FormlyConfig);

  public form = input.required<ReturnType<typeof buildForm<Fields>>>();

  public safeFields = computed(() => this.form().fields as FormlyFieldConfig[]);
  public formGroup = computed(() => this.form().form);

  constructor() {
    effect((onCleanup) => {
      const subscription = this.formGroup().events.subscribe((events) => {
        if (!(events instanceof FormSubmittedEvent)) return;

        this.formGroup().markAllAsTouched();
      });

      return onCleanup(() => subscription.unsubscribe());
    });

    this._configs.forEach(({ validators: validations, ...settings }) => {
      const validators: ValidatorOption[] = [];
      const validationMessages: ValidationMessageOption[] = [];

      Object.entries(validations || {}).forEach(([name, validation]) => {
        if (typeof validation === 'function') {
          validationMessages.push({ name, message: validation as ValidationMessageOption['message'] });
        } else if (isValidation(validation)) {
          validationMessages.push({ name, message: validation.message });
          validators.push({ name, validation: validation.expression });
        }
      });

      this._formlyConfig.addConfig({ ...(settings as ConfigOption), validationMessages, validators });
    });
  }
}
