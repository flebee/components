import { Component, booleanAttribute, computed, input } from '@angular/core';

import { buttonGroup } from './styles';
import type { BeeButtonSize, BeeButtonVariant } from './types';

@Component({
  standalone: true,
  selector: 'bee-button-group',
  host: { '[class]': 'classList()' },
  template: ` <ng-content select="[beeButton]" /> `
})
export class BeeButtonGroup {
  public fullWidth = input(false, { transform: booleanAttribute });
  public variant = input<'' | BeeButtonVariant>('');
  public size = input<BeeButtonSize>('md');
  public class = input('');

  public classList = computed(() => buttonGroup({ fullWidth: this.fullWidth(), class: this.class() }));
}
