/**
 * Nullable from `Type` adds `null` and `undefined`
 *
 * @example ```ts
 *  // Expect: string | number | undefined | null
 *  type Value = Nulling<string | number>;
 * ```
 */
export type Nullable<Type> = null | Type | undefined;

/**
 * BooleanInput use in input signals with transform to improve developer experience with strict typing
 *
 * @example ```ts
 *  public loading = input(false, { transform: (value: BooleanInput) => booleanAttribute(value) });
 *  public disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
 * ```
 */
export type BooleanInput = Nullable<'' | 'false' | 'true' | boolean>;

/**
 * NumberInput use in input signals with transform to improve developer experience with strict typing
 *
 * @example ```ts
 *  public max = input(100, { transform: (value: NumberInput | null) => numberAttribute(value, 100) });
 *  public size = input(0, { transform: (value: NumberInput) => numberAttribute(value) });
 *  public width = input<number, NumberInput>(0, { transform: numberAttribute });
 * ```
 */
export type NumberInput<Type extends number = number> = `${Type}` | Type;

/**
 * SafeFunction is a type for functions that accept any number of arguments of unknown types
 * and return a value of an unknown type. This is useful when you want to define a function
 * without being strict about the input or output types, maintaining flexibility.
 *
 * @example ```ts
 *  const safeFn: SafeFunction = (...args) => {
 *    return args.length > 0 ? args[0] : null;
 *  };
 *
 *  const result = safeFn(1, 'hello'); // result: 1
 * ```
 */
export type SafeFunction = (...args: unknown[]) => unknown;
