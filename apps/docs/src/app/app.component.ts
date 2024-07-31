import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgDocThemeService } from '@ng-doc/app';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly _ngDocThemeSvc = inject(NgDocThemeService);

  constructor() {
    afterNextRender({ write: () => this._ngDocThemeSvc.disableAutoTheme() });
  }
}
