import { Component, TemplateRef, booleanAttribute, computed, input, model } from '@angular/core';

import { BeeStringTemplate } from '@flebee/ui/string-template';

import { useId } from '../../core/src/use-id';
import { groupBase, groupLabel } from './styles';
import type { BeeRadioGroupOrientation, BeeRadioGroupSize } from './types';

@Component({
  standalone: true,
  selector: 'bee-radio-group',
  imports: [BeeStringTemplate],
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
  public orientation = input<BeeRadioGroupOrientation>('vertical');
  public disabled = input(false, { transform: booleanAttribute });
  public label = input<TemplateRef<void> | string>('');
  public size = input<BeeRadioGroupSize>('md');
  public name = input<string>('');
  public class = input('');

  public value = model<string | undefined>();

  public baseClass = computed(() => groupBase({ orientation: this.orientation(), size: this.size(), class: this.class() }));
  public labelClass = computed(() => groupLabel({ size: this.size() }));
  public id = useId('radio-group');
}
