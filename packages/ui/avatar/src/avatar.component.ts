import { ChangeDetectionStrategy, Component, computed, contentChild, input, viewChild } from '@angular/core';

import type { ClassValue } from 'cva';

import { BeeAvatarFallback } from './avatar-fallback.directive';
import { BeeAvatarImage } from './avatar-image.directive';
import { avatar } from './styles';
import type { AvatarRadius, AvatarSize } from './types';

@Component({
  selector: 'bee-avatar',
  imports: [BeeAvatarFallback, BeeAvatarImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'avatarClass()', '[attr.data-loaded]': 'isImageLoaded()' },
  template: `
    <ng-content select="[beeAvatarFallback]">
      @if (fallback()) {
        <span beeAvatarFallback> {{ fallback() }} </span>
      }
    </ng-content>

    <ng-content select="[beeAvatarImage]">
      @if (src() && !hasImage()) {
        <img beeAvatarImage [src]="src()" [attr.alt]="alt()" />
      }
    </ng-content>
    @if (!src() && !hasImage() && alt()) {
      <span class="sr-only"> {{ alt() }} </span>
    }
  `
})
export class BeeAvatar {
  private _contentImage = contentChild(BeeAvatarImage);
  private _viewImage = viewChild(BeeAvatarImage);

  public radius = input<AvatarRadius>('md');
  public size = input<AvatarSize>('md');
  public class = input<ClassValue>('');
  public fallback = input<string>();
  public src = input<string>();
  public alt = input<string>();

  public avatarClass = computed(() => avatar({ class: this.class(), size: this.size(), radius: this.radius() }));
  public isImageLoaded = computed(() => this._viewImage()?.loaded() || this._contentImage()?.loaded());
  public hasImage = computed(() => !!this._contentImage());
}
