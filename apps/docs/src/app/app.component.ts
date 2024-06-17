import { Component, afterNextRender, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgDocNavbarComponent, NgDocSidebarComponent, NgDocThemeService } from '@ng-doc/app';
import { NgDocRootComponent } from '@ng-doc/app/components/root';

import { BeeIcon } from '@flebee/ui/icon';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <ng-doc-root>
      <ng-doc-navbar [leftContent]="leftContent" />

      <ng-template #leftContent>
        <h3 class="text-primary font-medium text-xl">
          <a routerLink="/" class="inline-flex gap-2 items-center">
            <bee-icon size="28" type="brand" name="flebee" />
            <span> Flebee Components </span>
          </a>
        </h3>
      </ng-template>

      <ng-doc-sidebar />
      <router-outlet />
    </ng-doc-root>
  `,
  imports: [RouterLink, RouterOutlet, BeeIcon, NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent]
})
export class AppComponent {
  private readonly _ngDocThemeSvc = inject(NgDocThemeService);

  constructor() {
    afterNextRender(() => this._ngDocThemeSvc.disableAutoTheme());
  }
}
