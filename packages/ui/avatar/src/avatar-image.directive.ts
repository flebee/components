import { computed, Directive, input, signal } from '@angular/core';

import type { ClassValue } from 'cva';

import { avatarImage } from './styles';

@Directive({
  exportAs: 'avatarImage',
  selector: 'img[beeAvatarImage]',
  host: { '[class]': 'imageClass()', '(load)': 'loaded.set(true)', '(error)': 'loaded.set(false)' }
})
export class BeeAvatarImage {
  public class = input<ClassValue>('');

  public imageClass = computed(() => avatarImage({ class: this.class(), loaded: this.loaded() }));
  public loaded = signal(false);
}
