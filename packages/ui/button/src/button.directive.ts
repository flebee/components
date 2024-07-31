import { booleanAttribute, computed, Directive, inject, input } from '@angular/core';

import type { BooleanInput } from '@flebee/ui/core';
import { BeeRipple } from '@flebee/ui/ripple';

import { BeeButtonGroup } from './button-group.component';
import { button } from './styles';
import type { BeeButtonSize, BeeButtonVariant } from './types';

@Directive({
  standalone: true,
  hostDirectives: [BeeRipple],
  host: { '[class]': 'classList()' },
  selector: 'button[beeButton], a[beeButton]'
})
export class BeeButton {
  private _group = inject(BeeButtonGroup, { optional: true });

  public fullWidth = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public iconOnly = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public variant = input<BeeButtonVariant>('primary');
  public size = input<BeeButtonSize>('md');
  public class = input<string>();

  public classList = computed(() => {
    const fullWidth = this._group?.fullWidth() || this.fullWidth();
    const variant = this._group?.variant() || this.variant();
    const size = this._group?.size() || this.size();
    const isInGroup = !!this._group;

    return button({ size, isInGroup, variant, fullWidth, iconOnly: this.iconOnly(), class: this.class() });
  });
}
