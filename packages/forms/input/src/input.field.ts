import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { type BeeFieldConfigWithoutFieldGroup, BeeFieldType, BeeValidation } from '@flebee/forms/core';
import { BeeInput } from '@flebee/ui/input';

import type { BeeInputProps } from './with-input';

@Component({
  selector: 'bee-field-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BeeInput, BeeValidation, ReactiveFormsModule],
  template: `
    <bee-input
      [type]="props.type"
      [invalid]="showError"
      [label]="props.label"
      [size]="props.size ?? 'md'"
      [formControl]="formControl"
      [endContent]="props.endContent"
      [placeholder]="props.placeholder"
      [description]="props.description"
      [startContent]="props.startContent"
      [errorMessage]="beeValidation.message()"
    />

    <bee-validation #beeValidation="beeValidation" [field]="field" />
  `
})
export class BeeInputField extends BeeFieldType<BeeFieldConfigWithoutFieldGroup<string, BeeInputProps>> {}
