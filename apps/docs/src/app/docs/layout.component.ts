import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgDocNavbarComponent, NgDocSidebarComponent } from '@ng-doc/app';
import { NgDocRootComponent } from '@ng-doc/app/components/root';

import { BeeIcon } from '@flebee/ui/icon';

@Component({
  standalone: true,
  selector: 'app-docs-layout',
  template: `
    <ng-doc-root>
      <ng-doc-navbar [leftContent]="leftContent" />

      <ng-template #leftContent>
        <h2 style="view-transition-name: title;" class="text-primary font-medium text-lg">
          <a routerLink="/" class="inline-flex gap-1 items-center">
            <bee-icon type="brand" name="flebee" class="text-2xl" />
            <span> Flebee Components </span>
          </a>
        </h2>
      </ng-template>

      <ng-doc-sidebar />
      <router-outlet />
    </ng-doc-root>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet, BeeIcon, NgClass, NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent]
})
export default class DocsLayoutComponent {}
