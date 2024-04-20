import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgDocNavbarComponent, NgDocSidebarComponent } from '@ng-doc/app';
import { NgDocRootComponent } from '@ng-doc/app/components/root';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <ng-doc-root>
      <ng-doc-navbar [leftContent]="leftContent" />

      <ng-template #leftContent>
        <a class="brand" routerLink="/">
          <h3> Flebee Components </h3>
        </a>
      </ng-template>

      <ng-doc-sidebar />
      <router-outlet />
    </ng-doc-root>
  `,
  imports: [RouterLink, RouterOutlet, NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent]
})
export class AppComponent {}
