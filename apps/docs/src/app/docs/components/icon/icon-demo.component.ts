import { Component } from '@angular/core';

import { BeeIcon } from '@flebee/ui/icon';

@Component({
  standalone: true,
  imports: [BeeIcon],
  selector: 'app-icon-demo',
  template: `
    <section class="flex flex-wrap gap-6 p-6 text-4xl">
      <bee-icon type="filled" name="carousel-horizontal" />
      <bee-icon type="filled" name="square-number-5" />
      <bee-icon type="filled" name="inner-shadow-bottom-left" />
      <bee-icon type="filled" name="user" />
      <bee-icon type="outline" name="carousel-horizontal" />
      <bee-icon type="outline" name="settings-pin" />
      <bee-icon type="outline" name="lock-bolt" />
      <bee-icon type="outline" name="user" />
    </section>
  `
})
export class IconDemoComponent {}
