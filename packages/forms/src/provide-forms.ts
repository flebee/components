import { type Type } from '@angular/core';

import type { BeeFieldConfig, BeeFieldType, BeeValidators } from '@flebee/forms/core';
import { createNoopInjectionToken } from '@flebee/ui/core/create-injection-token';

export interface BeeFieldExtension<Field extends BeeFieldConfig = BeeFieldConfig> {
  priority?: number;
  prePopulate?(field: Field): void;
  onPopulate?(field: Field): void;
  postPopulate?(field: Field): void;
}

export interface TypeOption {
  name: string;
  extends?: string;
  wrappers?: string[];
  component?: Type<BeeFieldType>;
  defaultOptions?: BeeFieldConfig;
}

export interface BeeExtensionOption {
  name: string;
  priority?: number;
  extension: BeeFieldExtension;
}

export interface BeeConfigOption {
  types?: TypeOption[];
  validators?: BeeValidators;
  extensions?: BeeExtensionOption[];
  extras?: {
    immutable?: boolean;
    showError?: (field: BeeFieldType) => boolean;
    /**
     * Defines the option which formly rely on to check field expression properties.
     * - `modelChange`: perform a check when the value of the form control changes.
     * - `changeDetectionCheck`: triggers an immediate check when `ngDoCheck` is called.
     *
     * Defaults to `modelChange`.
     */
    checkExpressionOn?: 'changeDetectionCheck' | 'modelChange';
    /**
     * Whether to lazily render field components or not when marked as hidden.
     * - `true`: lazily render field components.
     * - `false`: render field components and use CSS to control their visibility.
     *
     * Defaults to `true`.
     */
    lazyRender?: boolean;
    /**
     * When `true`, reset the value of a hidden field.
     *
     * Defaults to `true`.
     */
    resetFieldOnHide?: boolean;
    /**
     * Whether to render fields inside <formly-field> component or not.
     *
     * Defaults to `true`.
     */
    renderFormlyFieldElement?: boolean;
  };
}

export const [injectBeeForms, provideBeeForms] = createNoopInjectionToken<BeeConfigOption, true>('BEE_CONFIG', { multi: true });
