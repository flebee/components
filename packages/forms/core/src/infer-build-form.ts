import type { FormControl, FormGroup } from '@angular/forms';

import type { BeeFieldConfig } from './field-config';

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

type BeeBuildInferFormField<T> =
  T extends BeeFieldConfig<infer Key extends string, any, infer Value, any, any, infer Fields, infer Control>
    ? Control extends FormGroup
      ? IsLiteralType<string, Key> extends true
        ? { [K in Key]: FormGroup<BeeBuildInferForm<Fields>> }
        : BeeBuildInferForm<Fields>
      : IsLiteralType<string, Key> extends true
        ? { [K in Key]: FormControl<Value> }
        : never
    : never;

export type BeeBuildInferForm<T> =
  T extends Array<infer U> ? UnionToIntersection<BeeBuildInferFormField<U>> : BeeBuildInferFormField<T>;

type BeeBuildInferModelField<T> =
  T extends BeeFieldConfig<infer Key extends string, any, infer Value, any, any, infer Fields, infer Control>
    ? Control extends FormGroup
      ? IsLiteralType<string, Key> extends true
        ? { [K in Key]?: BeeBuildInferModel<Fields> }
        : BeeBuildInferModel<Fields>
      : IsLiteralType<string, Key> extends true
        ? { [K in Key]?: Value }
        : never
    : never;

export type BeeBuildInferModel<T> =
  T extends Array<infer U> ? UnionToIntersection<BeeBuildInferModelField<U>> : BeeBuildInferModelField<T>;
