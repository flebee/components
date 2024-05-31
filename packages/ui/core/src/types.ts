/**
 * Nullable from `Type` adds `null` and `undefined`
 *
 * @example ```ts
 *  // Expect: string | number | undefined | null
 *  type Value = Nulling<string | number>;
 * ```
 */
export type Nullable<Type> = Type | null | undefined;
