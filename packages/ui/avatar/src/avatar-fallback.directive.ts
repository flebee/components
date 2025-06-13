import { computed, Directive, input } from '@angular/core';

import type { ClassValue } from 'cva';

import { avatarFallback } from './styles';

@Directive({
  selector: '[beeAvatarFallback]',
  host: { '[class]': 'fallbackClass()' }
})
export class BeeAvatarFallback {
  public class = input<ClassValue>('');

  public fallbackClass = computed(() => avatarFallback({ class: this.class() }));
}
