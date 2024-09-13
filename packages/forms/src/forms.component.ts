import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, NgZone, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormlyConfig, FormlyForm, FormlyFormBuilder } from '@ngx-formly/core';
import type { ConfigOption, FormlyFieldConfig, ValidationMessageOption, ValidatorOption } from '@ngx-formly/core/lib/models';

import { type BeeBuildFormFields, BeeField, type BeeFieldConfig } from '@flebee/forms/core';

import { BeeFieldTemplates, BeeFormsModule } from './forms.module';
import { injectBeeForms } from './provide-forms';

@Component({
  standalone: true,
  selector: 'bee-forms',
  imports: [BeeField, BeeFormsModule],
  template: '<bee-field [field]="beeField"/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormlyFormBuilder, BeeFieldTemplates]
})
export class BeeForms<
  Fields extends unknown[],
  Form extends FormGroup<BeeBuildFormFields<Fields>>,
  Model extends Form['value']
> extends FormlyForm {
  @Input() override set form(form: Form) {
    super.form = form;
  }
  override get form() {
    return super.form as Form;
  }

  @Input() override set model(model: Model) {
    super.model = model;
  }
  override get model(): Model {
    return super.model;
  }

  // @ts-expect-error 'is not assignable type'
  @Input() override set fields(fieldGroup: BeeFieldConfig[] | Fields) {
    super.fields = fieldGroup as FormlyFieldConfig[];
  }
  // @ts-expect-error 'is not assignable type'
  override get fields() {
    return super.fields as BeeFieldConfig[] | Fields;
  }

  @Output() override modelChange = new EventEmitter<Model>();

  get beeField() {
    return this.field as BeeFieldConfig;
  }

  constructor() {
    const formlyConfig = inject(FormlyConfig);
    const configs = injectBeeForms();

    configs.forEach(({ validators: validations, ...settings }) => {
      const validators: ValidatorOption[] = [];
      const validationMessages: ValidationMessageOption[] = [];

      Object.entries(validations || {}).forEach(([name, validation]) => {
        if (typeof validation === 'function') {
          validationMessages.push({ name, message: validation as ValidationMessageOption['message'] });
        } else if (this._isValidation(validation)) {
          validationMessages.push({ name, message: validation.message as ValidationMessageOption['message'] });
          validators.push({ name, validation: validation.expression as ValidatorOption['validation'] });
        }
      });

      formlyConfig.addConfig({ ...(settings as ConfigOption), validationMessages, validators });
    });

    super(inject(FormlyFormBuilder), formlyConfig, inject(NgZone), inject(BeeFieldTemplates));
  }

  private _isValidation(
    validation: any
  ): validation is { message: ValidationMessageOption['message']; expression: ValidatorOption['validation'] } {
    return validation && typeof validation.message === 'string';
  }
}
