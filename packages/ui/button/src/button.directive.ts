import { Directive, booleanAttribute, computed, inject, input } from '@angular/core';

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

  public iconOnly = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public variant = input<BeeButtonVariant>('primary');
  public size = input<BeeButtonSize>('md');
  public class = input<string>();

  public classList = computed(() => {
    const variant = this._group?.variant() || this.variant();
    const size = this._group?.size() || this.size();
    const isInGroup = Boolean(this._group);

    return button({ size, isInGroup, variant, iconOnly: this.iconOnly(), class: this.class() });
  });
}
