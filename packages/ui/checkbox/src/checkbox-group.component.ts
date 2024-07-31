import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, model, type TemplateRef } from '@angular/core';

import { type BooleanInput, useId } from '@flebee/ui/core';
import { BeeStringTemplate } from '@flebee/ui/string-template';

import { groupBase, groupDescription, groupLabel, groupWrapper } from './styles';
import type { BeeCheckboxGroupOrientation, BeeCheckboxSize } from './types';

@Component({
  standalone: true,
  imports: [BeeStringTemplate],
  selector: 'bee-checkbox-group',
  host: {
    role: 'group',
    '[class]': 'baseClass',
    '[attr.aria-labelledby]': 'id',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.aria-describedby]': 'describedById()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label(); as label) {
      <bee-string-template [id]="id" [content]="label" [class]="labelClass()" />
    }

    <div role="presentation" [class]="wrapperClass()">
      <ng-content selector="bee-checkbox" />
    </div>

    @if (hit(); as hit) {
      <bee-string-template [id]="describedById()" [content]="hit" [class]="descriptionClass()" />
    }
  `
})
export class BeeCheckboxGroup {
  private _internalValue = computed(() => new Set(this.value()));

  public disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public invalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public orientation = input<BeeCheckboxGroupOrientation>('vertical');
  public errorMessage = input<string | TemplateRef<void>>();
  public description = input<string | TemplateRef<void>>();
  public label = input<string | TemplateRef<void>>();
  public size = input<BeeCheckboxSize>('md');
  public value = model<string[]>([]);

  public hit = computed(() => (!!this.errorMessage() && this.invalid() ? this.errorMessage() : this.description()));
  public descriptionClass = computed(() => groupDescription({ size: this.size(), invalid: this.invalid() }));
  public labelClass = computed(() => groupLabel({ size: this.size(), invalid: this.invalid() }));
  public wrapperClass = computed(() => groupWrapper({ orientation: this.orientation() }));
  public describedById = computed(() => (this.hit() ? `${this.id}-described` : undefined));
  public id = useId('bee-checkbox-group');
  public baseClass = groupBase();

  has = (value: string | undefined) => !!value && this._internalValue().has(value);

  toggle(value: string | undefined) {
    if (!value) return;

    const set = this._internalValue();

    this.has(value) ? set.delete(value) : set.add(value);
    this.value.set([...set.values()]);
  }
}
