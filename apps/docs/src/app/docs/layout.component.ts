import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgDocNavbarComponent, NgDocSidebarComponent } from '@ng-doc/app';
import { NgDocRootComponent } from '@ng-doc/app/components/root';
import { NgDocButtonIconComponent } from '@ng-doc/ui-kit';

import { BeeIcon } from '@flebee/ui/icon';

@Component({
  selector: 'app-docs-layout',
  imports: [
    BeeIcon,
    RouterLink,
    RouterOutlet,
    NgDocRootComponent,
    NgDocNavbarComponent,
    NgDocSidebarComponent,
    NgDocButtonIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-doc-root>
      <ng-doc-navbar>
        <h2 ngDocNavbarLeft class="text-primary font-medium text-lg vt-name-[title]">
          <a routerLink="/" class="inline-flex gap-1 items-center">
            <bee-icon type="brand" name="flebee" class="text-2xl" />
            <span> Flebee Components </span>
          </a>
        </h2>

        <div ngDocNavbarRight>
          <a ng-doc-button-icon size="large" target="_blank" href="https://github.com/flebee/components" class="ml-2">
            <bee-icon type="outline" name="brand-github" size="28px" />
            <span class="sr-only"> Repository on GitHub </span>
          </a>
        </div>
      </ng-doc-navbar>

      <ng-doc-sidebar />
      <router-outlet />
    </ng-doc-root>
  `
})
export class DocsLayoutComponent {}
