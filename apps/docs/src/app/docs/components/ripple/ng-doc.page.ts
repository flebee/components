import { NgDocPage } from '@ng-doc/core';

import { BeeRipple } from '@flebee/ui/ripple';

import ComponentsCategory from '../ng-doc.category';

const ButtonPage: NgDocPage = {
  title: 'Ripple',
  mdFile: './index.md',
  category: ComponentsCategory,
  playgrounds: {
    Ripple: {
      target: BeeRipple,
      hideSidePanel: true,
      template: `
        <div beeRipple class="size-56 rounded-bee-md cursor-pointer border-2 border-current">
          <span class="size-full grid place-content-center select-none font-medium text-xl"> Click me </span>
        </div>
      `
    },
    RipplePrimary: {
      target: BeeRipple,
      hideSidePanel: true,
      template: `
        <div beeRipple class="text-primary size-56 rounded-bee-md cursor-pointer border-2 border-current">
          <span class="size-full grid place-content-center select-none font-medium text-xl"> Click me </span>
        </div>
      `
    },
    RippleSuccess: {
      target: BeeRipple,
      hideSidePanel: true,
      template: `
        <div beeRipple class="text-success size-56 rounded-bee-md cursor-pointer border-2 border-current">
          <span class="size-full grid place-content-center select-none font-medium text-xl"> Click me </span>
        </div>
      `
    },
    RippleWarning: {
      target: BeeRipple,
      hideSidePanel: true,
      template: `
        <div beeRipple class="text-warning size-56 rounded-bee-md cursor-pointer border-2 border-current">
          <span class="size-full grid place-content-center select-none font-medium text-xl"> Click me </span>
        </div>
      `
    },
    RippleDanger: {
      target: BeeRipple,
      hideSidePanel: true,
      template: `
        <div beeRipple class="text-danger size-56 rounded-bee-md cursor-pointer border-2 border-current">
          <span class="size-full grid place-content-center select-none font-medium text-xl"> Click me </span>
        </div>
      `
    }
  }
};

export default ButtonPage;
