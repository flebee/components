import { ChangeDetectionStrategy, Component, type TemplateRef, booleanAttribute, computed, input, model } from '@angular/core';

import { type BooleanInput, type Nullable, useId } from '@flebee/ui/core';
import { BeeStringTemplate } from '@flebee/ui/string-template';

import { groupBase, groupLabel } from './styles';
import type { BeeRadioGroupOrientation, BeeRadioGroupSize } from './types';

@Component({
  standalone: true,
  selector: 'bee-radio-group',
  imports: [BeeStringTemplate],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'radiogroup',
    '[class]': 'baseClass()',
    '[attr.aria-labelledby]': 'id',
    '[attr.aria-orientation]': 'orientation()'
  },
  template: `
    @if (label(); as label) {
      <bee-string-template [id]="id" [content]="label" [class]="labelClass()" />
    }

    <ng-content select="bee-radio" />
  `
})
export class BeeRadioGroup {
  public disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public orientation = input<BeeRadioGroupOrientation>('vertical');
  public label = input<TemplateRef<void> | string>();
  public size = input<BeeRadioGroupSize>('md');
  public value = model<Nullable<string>>();
  public class = input<string>();
  public name = input<string>();

  public baseClass = computed(() => groupBase({ orientation: this.orientation(), size: this.size(), class: this.class() }));
  public labelClass = computed(() => groupLabel({ size: this.size() }));
  public id = useId('bee-button-group');
}
