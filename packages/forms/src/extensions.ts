import { effect, isSignal, type ViewContainerRef } from '@angular/core';

import type { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';

import type { RequiredStrict } from '@flebee/forms/core';

const signalsExtension: FormlyExtension<RequiredStrict<FormlyFieldConfig>> = {
  onPopulate: (field) => {
    const _viewContainerRef = (field.options as { _viewContainerRef?: ViewContainerRef })?._viewContainerRef;

    if (!_viewContainerRef) return;

    const { injector } = _viewContainerRef;
    const { hide, template, className, fieldGroupClassName } = field;
    const attributes = { hide, template, className, fieldGroupClassName };

    Object.entries(attributes).forEach(([key, value]) => {
      if (!isSignal(value)) return;

      Object.defineProperty(field, key, { set: () => undefined, get: () => value() });

      effect(() => Object.assign(field, { [key]: value() }), { injector });
    });

    Object.entries(field.props || {}).forEach(([key, value]) => {
      if (!isSignal(value)) return;

      Object.defineProperty(field.props, key, { set: () => undefined, get: () => value() });

      effect(() => Object.assign(field.props, { [key]: value() }), { injector });
    });
  }
};

export const extensions = [{ extension: signalsExtension, priority: -350, name: 'flebee-signals' }];
