import { isSignal, type Signal } from '@angular/core';

import { type FormlyExtension, type FormlyFieldConfig, ɵdefineHiddenProp } from '@ngx-formly/core';

import { ɵFLEBEE_SIGNALS_PROPS, type RequiredStrict } from '@flebee/forms/core';

const signalsExtension: FormlyExtension<RequiredStrict<FormlyFieldConfig>> = {
  onPopulate: (field) => {
    if (ɵFLEBEE_SIGNALS_PROPS in field) return;

    const signalProps: Record<string, Signal<unknown>> = {};

    Object.entries(field.props).forEach(([key, value]) => {
      if (!isSignal(value)) return;

      Object.assign(signalProps, { [key]: value });
      Object.assign(field.props, { [key]: value() });
    });

    ɵdefineHiddenProp(field, ɵFLEBEE_SIGNALS_PROPS, signalProps);
  }
};

export const extensions = [{ extension: signalsExtension, priority: -250, name: ɵFLEBEE_SIGNALS_PROPS }];
