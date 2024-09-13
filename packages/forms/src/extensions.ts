import { effect, isSignal, type ViewContainerRef } from '@angular/core';

import type { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';

import type { RequiredStrict } from '@flebee/forms/core';

const signalsExtension: FormlyExtension<RequiredStrict<FormlyFieldConfig>> = {
  onPopulate: (field) => {
    const _viewContainerRef = (field.options as { _viewContainerRef?: ViewContainerRef })?._viewContainerRef;

    if (!_viewContainerRef) return;

    const { injector } = _viewContainerRef;
    const { hide, template } = field;

    if (isSignal(hide)) {
      Object.defineProperty(field, 'hide', { set: () => undefined, get: () => hide() });

      effect(() => Object.assign(field, { hide: hide() }), { injector });
    }

    if (isSignal(template)) {
      Object.defineProperty(field, 'template', { set: () => undefined, get: () => template() });

      effect(() => Object.assign(field, { template: template() }), { injector });
    }

    Object.entries(field.props || {}).forEach(([key, value]) => {
      if (!isSignal(value)) return;

      Object.defineProperty(field.props, key, { set: () => undefined, get: () => value() });

      effect(() => Object.assign(field.props, { [key]: value() }), { injector });
    });
  }
};

export const extensions = [{ extension: signalsExtension, priority: -350, name: 'flebee-signals' }];
