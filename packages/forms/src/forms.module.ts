import { Directive, HostListener, inject, Injectable, NgModule, type OnDestroy, type QueryList, type Type } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { FormlyModule } from '@ngx-formly/core';
import type { FormlyTemplate } from '@ngx-formly/core/lib/components/formly.template';
import type { FieldType } from '@ngx-formly/core/public_api';

/* eslint-disable @nx/enforce-module-boundaries */
import { BeeFieldGroup } from '@flebee/forms/field-group';
import { BeeFieldTemplate } from '@flebee/forms/template';

import { extensions } from './extensions';

@Injectable()
export class BeeFieldTemplates {
  templates!: QueryList<FormlyTemplate>;
}

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ standalone: true, selector: 'form:[formGroup]' })
export class FormDirective implements OnDestroy {
  private _controlContainer: ControlContainer = inject(ControlContainer);

  @HostListener('submit')
  checkFomValid(): boolean {
    this._controlContainer.control?.markAllAsTouched();

    return false;
  }

  ngOnDestroy(): void {
    this._controlContainer.control?.markAsUntouched();
  }
}

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
