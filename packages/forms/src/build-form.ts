import { signal } from '@angular/core';
import { type FormControl, FormGroup } from '@angular/forms';

import type { BeeFieldConfig } from '@flebee/forms/core';

/**
 * Converts a union type to an intersection type using distributive conditional types.
 *
 * @example
 * ```
 * type Union = {a: string} | {b: number};
 * type Intersection = UnionToIntersection<Union>;
 * //=> {a: string} & {b: number}
 * ```
 *
 * @example
 * ```
 * class CommandOne {
 *   commands: {a1: () => void};
 * }
 *
 * class CommandTwo {
 *   commands: {b2: (arg: string) => void};
 * }
 *
 * const union = [new CommandOne(), new CommandTwo()].map(i => i.commands);
 * type Union = typeof union[number];
 * type Intersection = UnionToIntersection<Union>;
 * //=> {a1: () => void} & {b2: (arg: string) => void}
 * ```
 */
type UnionToIntersection<Union> = (Union extends unknown ? (arg: Union) => void : never) extends (arg: infer Intersection) => void
  ? Intersection & Union
  : never;

/**
 * `IsLiteralType` Checks if a type `Type` is a literal type of `Literal`.
 *
 * @example
 *    type ExampleType = 'test' | 'example';
 *
 *    // Expected: true
 *    type IsLiteral = IsLiteralType<'test', ExampleType>;
 */
type IsLiteralType<Literal, Type> = Type extends Literal ? (Literal extends Type ? false : true) : false;

type BeeBuildFormField<T> =
  T extends BeeFieldConfig<infer Key extends string, any, infer Value, any, any, infer Fields, infer Control>
    ? Control extends FormGroup
      ? IsLiteralType<string, Key> extends true
        ? { [K in Key]: FormGroup<BeeBuildFormFields<Fields>> }
        : BeeBuildFormFields<Fields>
      : IsLiteralType<string, Key> extends true
        ? { [K in Key]: FormControl<Value> }
        : never
    : never;

export type BeeBuildFormFields<T> = T extends Array<infer U> ? UnionToIntersection<BeeBuildFormField<U>> : BeeBuildFormField<T>;

export function buildForm<Fields extends unknown[]>(...fields: BeeFieldConfig[] | Fields) {
  const form = new FormGroup({} as BeeBuildFormFields<Fields>);

  return { form, fields, model: signal<typeof form.value>({}) };
}
