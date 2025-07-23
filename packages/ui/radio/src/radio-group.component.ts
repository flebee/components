import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, type TemplateRef } from '@angular/core';

import { type BooleanInput, type Nullable, useId } from '@flebee/ui/core';
import { BeeControlValueAccessor } from '@flebee/ui/core/control-value-accessor';
import { BeeStringTemplate } from '@flebee/ui/string-template';

import { groupBase, groupDescription, groupLabel } from './styles';
import type { BeeRadioGroupOrientation, BeeRadioGroupSize } from './types';

@Component({
  selector: 'bee-radio-group',
  imports: [BeeStringTemplate],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'radiogroup',
    '[class]': 'baseClass()',
    '[attr.aria-labelledby]': 'id',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.aria-describedby]': 'describedById()'
  },
  template: `
    @if (label(); as label) {
      <bee-string-template [id]="id" [content]="label" [class]="labelClass()" />
    }

    <ng-content select="bee-radio" />

    @if (hit(); as hit) {
      <bee-string-template [id]="describedById()" [content]="hit" [class]="descriptionClass()" />
    }
  `,
  hostDirectives: [{ directive: BeeControlValueAccessor, inputs: ['value', 'disabled'], outputs: ['valueChange'] }]
})
export class BeeRadioGroup {
  public invalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public orientation = input<BeeRadioGroupOrientation>('vertical');
  public errorMessage = input<string | TemplateRef<void>>();
  public description = input<string | TemplateRef<void>>();
  public label = input<string | TemplateRef<void>>();
  public size = input<BeeRadioGroupSize>('md');
  public class = input<string>();
  public name = input<string>();

  public baseClass = computed(() => groupBase({ orientation: this.orientation(), size: this.size(), class: this.class() }));
  public hit = computed(() => (!!this.errorMessage() && this.invalid() ? this.errorMessage() : this.description()));
  public descriptionClass = computed(() => groupDescription({ size: this.size(), invalid: this.invalid() }));
  public cva = inject<BeeControlValueAccessor<Nullable<boolean | number | string>>>(BeeControlValueAccessor);
  public labelClass = computed(() => groupLabel({ size: this.size(), invalid: this.invalid() }));
  public describedById = computed(() => (this.hit() ? `${this.id}-described` : undefined));
  public id = useId('bee-radio-group');
}
