import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgDocPageLinkComponent } from '@ng-doc/app';

import { BeeButton } from '@flebee/ui/button';
import { BeeIcon } from '@flebee/ui/icon';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-16 mx-auto px-3 pb-6 max-w-screen-lg' },
  imports: [BeeIcon, BeeButton, RouterLink, NgDocPageLinkComponent],
  template: `
    <h1 class="text-primary font-bold flex gap-2 items-center sticky top-0 p-3 -mx-3 bg-backdrop z-10 vt-name-[title]">
      <bee-icon type="brand" name="flebee" class="text-7xl" />
      <span class="text-3xl sm:text-5xl"> Flebee Components </span>
    </h1>

    <p class="text-2xl text-pretty font-semibold -mt-4">
      Welcome to Flebee! Explore our suite of powerful Angular libraries designed to enhance your development experience with
      elegant and efficient solutions.
    </p>

    <section class="flex flex-col gap-4">
      <h2 class="text-3xl font-semibold text-primary"> Flebee UI </h2>

      <p class="text-xl text-pretty font-medium">
        Flebee UI provides a collection of beautiful, fast, and modern zoneless components for Angular applications. Inspired by
        the design principles of <ng-doc-page-link href="https://nextui.org" classes="ngde">NextUI</ng-doc-page-link>, Flebee UI
        focuses on delivering high performance and sleek aesthetics, ensuring your Angular applications look and feel fantastic.
      </p>

      <h3 class="text-xl text-pretty font-bold mt-4"> Key Features </h3>

      <ul class="text-lg flex flex-col gap-1 list-disc list-inside marker:text-primary">
        <li>
          <span class="font-bold"> Zoneless Components: </span>
          Designed for optimal performance without Angular zones.
        </li>
        <li>
          <span class="font-bold"> Server-Side Rendering (SSR) Support: </span>
          Fully optimized for server-side rendering scenarios.
        </li>
        <li>
          <span class="font-bold"> Elegant Design: </span>
          Draws inspiration from NextUI to offer a visually appealing user experience.
        </li>
      </ul>

      <a beeButton variant="secondary" routerLink="/docs/ui/installation">
        Get Started
        <bee-icon type="outline" name="arrow-narrow-right" size="1.5rem" />
      </a>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-3xl font-semibold text-primary"> Flebee Forms </h2>

      <p class="text-xl text-pretty font-medium">
        Flebee Forms extends <ng-doc-page-link href="https://formly.dev" classes="ngde">Formly</ng-doc-page-link> with advanced
        features tailored for Angular. It introduces signals and a declarative approach to form creation, enhancing type safety
        and making form management more intuitive.
      </p>

      <h3 class="text-xl text-pretty font-bold mt-4"> Key Features </h3>

      <ul class="text-lg flex flex-col gap-1 list-disc list-inside marker:text-primary">
        <li>
          <span class="font-bold"> Signal Integration: </span>
          Utilizes signals for effective state management within forms.
        </li>
        <li>
          <span class="font-bold"> Declarative Form Creation: </span>
          Simplifies form building with a declarative API.
        </li>
        <li>
          <span class="font-bold"> Type Inference: </span>
          Ensures robust type safety with TypeScript integration.
        </li>
        <li>
          <span class="font-bold"> Zoneless Components: </span>
          Incorporates zoneless components for improved performance.
        </li>
        <li>
          <span class="font-bold"> SSR Support: </span>
          Optimized to work seamlessly with server-side rendering.
        </li>
      </ul>

      <a beeButton variant="secondary" routerLink="/docs/forms/installation">
        Get Started
        <bee-icon type="outline" name="arrow-narrow-right" size="1.5rem" />
      </a>
    </section>
  `
})
export default class HomeComponent {}
