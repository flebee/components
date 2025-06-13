import { ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';

import type { ClassValue } from 'cva';

import { BeeAvatarFallback } from './avatar-fallback.directive';
import { BeeAvatarImage } from './avatar-image.directive';
import { avatar } from './styles';
import type { AvatarRadius, AvatarSize } from './types';

@Component({
  selector: 'bee-avatar',
  host: { '[class]': 'avatarClass()' },
  imports: [BeeAvatarFallback, BeeAvatarImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content select="[beeAvatarFallback]">
      @if (fallback()) {
        <span beeAvatarFallback> {{ fallback() }} </span>
      }
    </ng-content>

    <ng-content select="[beeAvatarImage]">
      @if (src() && !image()) {
        <img beeAvatarImage [src]="src()" [alt]="alt()" />
      }
    </ng-content>

    @if (!src() && !image() && alt()) {
      <span class="sr-only"> {{ alt() }} </span>
    }
  `
})
export class BeeAvatar {
  public radius = input<AvatarRadius>('md');
  public size = input<AvatarSize>('md');
  public class = input<ClassValue>('');
  public fallback = input<string>();
  public src = input<string>();
  public alt = input<string>();

  public avatarClass = computed(() => avatar({ class: this.class(), size: this.size(), radius: this.radius() }));
  public image = contentChild(BeeAvatarImage);
}
