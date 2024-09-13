import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BeeField, type BeeFieldConfig, BeeFieldType } from '@flebee/forms/core';

@Component({
  standalone: true,
  imports: [BeeField],
  selector: 'bee-field-group',
  template: `
    @for (child of field.fieldGroup; track child.id) {
      <bee-field [field]="child" />
    }

    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'field.fieldGroupClassName ?? ""' }
})
export class BeeFieldGroup extends BeeFieldType<BeeFieldConfig> {}
