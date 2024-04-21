import { Directive, booleanAttribute, computed, inject, input } from '@angular/core';

import { BeeButtonGroup } from './button-group.component';
import { button } from './styles';
import type { BeeButtonSize, BeeButtonVariant } from './types';

@Directive({
  standalone: true,
  host: { '[class]': 'classList()' },
  selector: 'button[beeButton], a[beeButton]'
})
export class BeeButton {
  private _group = inject(BeeButtonGroup, { optional: true });

  public iconOnly = input(false, { transform: booleanAttribute });
  public variant = input<BeeButtonVariant>('primary');
  public size = input<BeeButtonSize>('md');
  public class = input('');

  public classList = computed(() => {
    const variant = this._group?.variant() || this.variant();
    const size = this._group?.size() || this.size();
    const isInGroup = Boolean(this._group);

    return button({ size, isInGroup, variant, iconOnly: this.iconOnly(), class: this.class() });
  });
}
