import type { Signal, TemplateRef, Type } from '@angular/core';
import type { AbstractControl, FormArray, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import type { Observable, Subject } from 'rxjs';

import type { BeeFieldType } from './base.field';
import type { BeeFieldUnwrapProps, ExtractStrict, PartialDeep } from './types';
import type { BeeFieldAsyncValidators, BeeFieldValidators, BeeValidationMessages } from './validators';

type BeeHookFn<
  Key extends string,
  Props extends Record<string, any>,
  Value,
  Model extends Record<string, any>,
  FormState extends Record<string, any>,
  Fields extends Array<unknown>,
  Control extends AbstractControl
> = (field: BeeFieldConfig<Key, Props, Value, Model, FormState, Fields, Control>) => void;

interface BeeHookConfig<
  Key extends string,
  Props extends Record<string, any>,
  Value,
  Model extends Record<string, any>,
  FormState extends Record<string, any>,
  Fields extends Array<unknown>,
  Control extends AbstractControl
> {
  onInit?:
    | ((field: BeeFieldConfig<Key, Props, Value, Model, FormState, Fields, Control>) => Observable<any>)
    | BeeHookFn<Key, Props, Value, Model, FormState, Fields, Control>;
  afterContentInit?: BeeHookFn<Key, Props, Value, Model, FormState, Fields, Control>;
  afterViewInit?: BeeHookFn<Key, Props, Value, Model, FormState, Fields, Control>;
  onChanges?: BeeHookFn<Key, Props, Value, Model, FormState, Fields, Control>;
  onDestroy?: BeeHookFn<Key, Props, Value, Model, FormState, Fields, Control>;
}

type BeeExpressions<Props, Model> = { [ModelKey in keyof Model & string as `model.${ModelKey}`]?: Model[ModelKey] } & {
  [PropKey in keyof Props & string as `props.${PropKey}`]?: Props[PropKey];
} & { hide?: boolean; template?: string };

type BeeValueChangeEvent<
  Key extends string,
  Props extends Record<string, any>,
  Value,
  Model extends Record<string, any>,
  FormState extends Record<string, any>
> = {
  field: BeeFieldConfig<Key, Props, Value, Model, FormState>;
  type: 'expressionChanges' | 'hidden' | 'valueChanges';
  property?: string;
  value: unknown;
};

export interface BeeFormOptions<Model extends Record<string, any>, FormState extends Record<string, any>> {
  updateInitialValue?: (model: PartialDeep<Model>) => void;
  resetModel?: (model: PartialDeep<Model>) => void;
  formState?: FormState;
}

interface BeeFieldOptions<
  Props extends Record<string, any>,
  Value,
  Model extends Record<string, any>,
  FormState extends Record<string, any>,
  Key extends string = string
> extends BeeFormOptions<Model, FormState> {
  showError?: (field: BeeFieldType) => boolean;
  fieldChanges?: Subject<BeeValueChangeEvent<Key, Props, Value, Model, FormState>>;
  parentForm?: FormGroupDirective | null;
}

export type BeeFieldTemplateValue = string | TemplateRef<void> | Type<unknown> | undefined;

export interface BeeFieldConfig<
  Key extends string = string,
  Props extends Record<string, any> = Record<string, any>,
  Value = unknown,
  Model extends Record<string, any> = Record<string, any>,
  FormState extends Record<string, any> = Record<string, any>,
  Fields extends unknown[] = [],
  Control extends AbstractControl = AbstractControl<Value>
> {
  /** The key that relates to the model. This will link the field value to the model */
  key?: Key;
  /** Use `defaultValue` to initialize it the model. If this is provided and the value of the model at compile-time is undefined, then the value of the model will be assigned to `defaultValue`.*/
  defaultValue?: Value;
  /** This should be a formly-field type added either by you or a plugin. More information over at Creating Formly Fields. */
  type?: Type<BeeFieldType>;
  /** This allows you to specify the `id` of your field. Note, the `id` is generated if not set. */
  id?: string;
  /** If you wish, you can specify a specific `name` for your field. This is useful if you're posting the form to a server using techniques of yester-year. */
  name?: string;
  /** This is reserved for the templates. Any template-specific options go in here. Look at your specific template implementation to know the options required for this. */
  props?: Props;
  /** Whether to hide the field. Defaults to false. If you wish this to be conditional use `expressions: { hide: ... }` */
  hide?: boolean | Signal<boolean>;
  /** Render custom **html** | **TemplateRef** | **Component** content. */
  template?: BeeFieldTemplateValue;
  /** An object where the key is a property to be set on the main field config and the value is an expression used to assign that property. */
  expressions?: {
    [Key in keyof BeeExpressions<BeeFieldUnwrapProps<Props>, Model>]:
      | ((
          field: BeeFieldConfig<Key, BeeFieldUnwrapProps<Props>, Value, Model, FormState, Fields, Control>
        ) => BeeExpressions<BeeFieldUnwrapProps<Props>, Model>[Key])
      | Observable<BeeExpressions<BeeFieldUnwrapProps<Props>, Model>[Key]>;
  };
  /** You can specify your own class that will be applied to the `formly-field` component. */
  className?: string;
  /** Whether to focus or blur the element field. Defaults to false. If you wish this to be conditional use `expressions` */
  focus?: boolean;
  hooks?: BeeHookConfig<Key, BeeFieldUnwrapProps<Props>, Value, Model, FormState, Fields, Control>;
  /**
   * A field group is a way to group fields together, making advanced layout very simple.
   * It can also be used to group fields that are associated with the same model (useful if it's different than the model for the rest of the fields).
   */
  fieldGroup?: BeeFieldConfig[] | Fields;
  /** Specify your own class that will be applied to the `formly-group` component. */
  fieldGroupClassName?: string;
  /** The form options. */
  readonly options?: BeeFieldOptions<BeeFieldUnwrapProps<Props>, Value, Model, FormState, Key>;
  /** The model that stores all the data, where the model[key] is the value of the field */
  readonly model?: Model;
  validation?: {
    /**
     * A map of message names that will be displayed when the field has errors.
     */
    messages?: Partial<BeeValidationMessages>;
    /**
     * A boolean you as the developer can set to force displaying errors whatever the state of field.
     * This is useful when you're trying to call the user's attention to some fields for some reason.
     */
    show?: boolean;
  };
  /**
   * Used to set validation rules for a particular field.
   * Should be an object of key - value pairs. The value can either be an expression to evaluate or a function to run.
   * Each should return a boolean value, returning true when the field is valid. See Validation for more information.
   */
  validators?: BeeFieldValidators<BeeFieldConfig<Key, BeeFieldUnwrapProps<Props>, Value, Model, FormState, Fields, Control>>;
  /**
   * Use this one for anything that needs to validate asynchronously.
   * Pretty much exactly the same as the validators api, except it must be a function that returns a promise.
   */
  asyncValidators?: BeeFieldAsyncValidators<
    BeeFieldConfig<Key, BeeFieldUnwrapProps<Props>, Value, Model, FormState, Fields, Control>
  >;
  /**
   * An object with a few useful properties to control the model changes
   * - `debounce`: integer value which contains the debounce model update value in milliseconds. A value of 0 triggers an immediate update.
   * - `updateOn`: string event value that instructs when the control should be updated
   */
  modelOptions?: { updateOn?: 'blur' | 'change' | 'submit'; debounce?: { default: number } };
  /** The parent field. */
  readonly parent?: BeeFieldConfig;
  /** The parent form. */
  readonly form?: FormArray | FormGroup;
  /**
   * This is the [FormControl](https://angular.io/api/forms/FormControl) for the field.
   * It provides you more control like running validators, calculating status, and resetting state.
   */
  readonly formControl?: Control;
}

export type BeeFieldConfigWithoutFieldGroup<
  Key extends string = string,
  Props extends Record<string, any> = Record<string, any>,
  Value = unknown,
  Model extends Record<string, any> = Record<string, any>,
  FormState extends Record<string, any> = Record<string, any>
> = BeeFieldConfig<Key, Props, Value, Model, FormState, [], FormControl<Value>>;

export type BeeFieldConfigValidWithoutControlKeys = ExtractStrict<
  keyof BeeFieldConfigWithoutFieldGroup,
  'asyncValidators' | 'className' | 'expressions' | 'hide' | 'id' | 'name' | 'props' | 'validation' | 'validators'
>;

export type BeeFieldConfigValidWithControlKeys = ExtractStrict<
  keyof BeeFieldConfigWithoutFieldGroup,
  'defaultValue' | 'key' | BeeFieldConfigValidWithoutControlKeys
>;

export type BeeFieldConfigWithFieldGroup<
  Key extends string = string,
  Props extends Record<string, any> = Record<string, any>,
  FormState extends Record<string, any> = Record<string, any>,
  Fields extends unknown[] = [],
  Control extends FormGroup = FormGroup,
  Value extends Record<string, any> = Control['value']
> = BeeFieldConfig<Key, Props, Value, Value, FormState, Fields, Control>;
