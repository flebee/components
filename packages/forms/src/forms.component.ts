import { ChangeDetectionStrategy, Component, computed, inject, input, model } from '@angular/core';
import type { FormGroup } from '@angular/forms';

import { FormlyConfig } from '@ngx-formly/core';
import type { ConfigOption, FormlyFieldConfig, ValidationMessageOption, ValidatorOption } from '@ngx-formly/core/lib/models';

import { type BeeBuildInferForm, type BeeBuildInferModel, BeeField, type BeeFieldConfig } from '@flebee/forms/core';

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
  template: ` <formly-form [form]="form()" [fields]="safeFields()" [(model)]="model" /> `
})
export class BeeForms<
  Fields extends unknown[],
  Form extends FormGroup<BeeBuildInferForm<Fields>>,
  Model extends BeeBuildInferModel<Fields>
> {
  public fields = input.required<BeeFieldConfig[] | Fields>();
  public model = model<Model>({} as Model);
  public form = input.required<Form>();

  public safeFields = computed(() => this.fields() as FormlyFieldConfig[]);

  constructor() {
    const configs = injectBeeForms({ optional: true }) ?? [];
    const formlyConfig = inject(FormlyConfig);

    configs.forEach(({ validators: validations, ...settings }) => {
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

      formlyConfig.addConfig({ ...(settings as ConfigOption), validationMessages, validators });
    });
  }
}
