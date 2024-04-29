import { Component, computed, input } from '@angular/core';

import { tag } from './styles';
import type { BeeTagColor, BeeTagSize } from './types';

@Component({
  standalone: true,
  selector: 'bee-tag',
  template: ` <ng-content /> `,
  host: { '[class]': 'classList()' }
})
export class BeeTag {
  public color = input<BeeTagColor>('neutral');
  public size = input<BeeTagSize>('md');
  public class = input('');

  public classList = computed(() => tag({ color: this.color(), size: this.size(), class: this.class() }));
}
