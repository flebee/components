import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgDocLinkComponent, NgDocPageLinkComponent } from '@ng-doc/app';

import { BeeButton } from '@flebee/ui/button';
import { BeeIcon } from '@flebee/ui/icon';

@Component({
  standalone: true,
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BeeIcon, BeeButton, RouterLink, NgDocLinkComponent, NgDocPageLinkComponent],
  template: `
    <section class="flex flex-col gap-8 mx-auto px-3 py-6 max-w-screen-md">
      <h2 style="view-transition-name: title;" class="text-primary font-bold flex gap-2 items-center">
        <bee-icon type="brand" name="flebee" class="text-7xl" />
        <span class="text-3xl sm:text-5xl"> Flebee Components </span>
      </h2>

      <div class="font-medium text-lg flex flex-col gap-4">
        <h1 class="text-3xl text-balance font-semibold sm:text-4xl">
          Beautiful fast and modern Angular zoneless components with SSR support
        </h1>

        <p class="text-pretty">
          Visually inspired by the elegance and functionality of
          <ng-doc-page-link href="https://nextui.org" classes="ngde">NextUI</ng-doc-page-link>
        </p>

        <p class="text-pretty"> Flebee UI aims to bring high performance and a sleek design to your Angular applications </p>
      </div>

      <a beeButton routerLink="/docs/getting-started/installation">
        Get Started
        <bee-icon type="outline" name="arrow-narrow-right" />
      </a>
    </section>
  `
})
export default class HomeComponent {}
