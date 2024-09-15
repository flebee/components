import type { Signal } from '@angular/core';

/**
 * `RequiredStrict` Makes specified properties of `T` required.
 *
 * @example
 *    interface Props {
 *      name?: string;
 *      age?: number;
 *      visible?: boolean;
 *    }
 *
 *    // Expected: { name: string; age: number; visible: boolean; }
 *    type AllRequired = RequiredStrict<Props>;
 *
 *    // Expected: { name?: string; age: number; visible: boolean; }
 *    type PartialRequired = RequiredStrict<Props, 'age' | 'visible'>;
 */
export type RequiredStrict<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * `PartialStrict`
 * Makes specified properties of `T` optional.
 *
 * @example
 *    interface Props {
 *      name: string;
 *      age: number;
 *      visible: boolean;
 *    }
 *
 *    // Expected: { name?: string; age?: number; visible?: boolean; }
 *    type AllOptional = PartialStrict<Props>;
 *
 *    // Expected: { name: string; age?: number; visible?: boolean; }
 *    type PartialOptional = PartialStrict<Props, 'age' | 'visible'>;
 */
export type PartialStrict<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * `OmitStrict` Removes specified properties from `T`.
 *
 * @example
 *    interface Props {
 *      name: string;
 *      age: number;
 *      visible: boolean;
 *    }
 *
 *    // Expected: { name: string; }
 *    type Omitted = OmitStrict<Props, 'age' | 'visible'>;
 */
export type OmitStrict<T extends object, K extends keyof T = keyof T> = Omit<T, K>;

/**
 * `PickStrict` Picks specified properties from `T`.
 *
 * @example
 *    interface Props {
 *      name: string;
 *      age: number;
 *      visible: boolean;
 *    }
 *
 *    // Expected: { age: number; visible: boolean; }
 *    type Picked = PickStrict<Props, 'age' | 'visible'>;
 */
export type PickStrict<T extends object, K extends keyof T = keyof T> = Pick<T, K>;

/**
 * `ExtractStrict` Extracts specified values from `T`.
 *
 * @example
 *    type Props = 'label' | 'key';
 *
 *    // Expected: 'label'
 *    type Extracted = ExtractStrict<Props, 'label'>;
 */
export type ExtractStrict<T, U extends Partial<T>> = Extract<T, U>;

/**
 * `ExcludeStrict` Excludes specified values from `T`.
 *
 * @example
 *    type Props = 'label' | 'key';
 *
 *    // Expected: 'key'
 *    type Excluded = ExcludeStrict<Props, 'label'>;
 */
export type ExcludeStrict<T, U extends T> = Exclude<T, U>;

/**
 * `PartialDeep` makes all properties of type `T` optional recursively.
 *
 * @example
 *    interface Props {
 *      name: string;
 *      age: number;
 *      settings: {
 *        visible: boolean;
 *      };
 *    }
 *
 *    // Expected: { name?: string; age?: number; settings?: { visible?: boolean; } }
 *    type PartialProps = PartialDeep<Props>;
 */
export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends object ? PartialDeep<T[P]> : T[P];
};

/**
 * `BeeFieldUnwrapProp` Unwraps the underlying type `T` from a `Signal` or `FieldProp`.
 *
 * @example
 *    type Example = Signal<string | undefined> | string | undefined;
 *
 *    // Expected: string | undefined
 *    type Unwrapped = BeeFielUnwrapProp<Example>;
 */
export type BeeFieldUnwrapProp<Prop> = Prop extends Signal<infer V> ? V : Prop;

/**
 * `BeeFieldSignalProps` Transforms all properties of a type `Props` to be either the original type or a `Signal` of that type.
 *
 * @example
 *    interface ExampleProps {
 *      name: Signal<string> | string;
 *      age: Signal<number> | number;
 *    }
 *
 *    // Expected: { name: string; age: number; }
 *    type Props = BeeFieldUnwrapProps<ExampleProps>;
 */
export type BeeFieldUnwrapProps<Props> = { [Key in keyof Props]: BeeFieldUnwrapProp<Props[Key]> };

/**
 * `BeeFieldSignalProps` Transforms all properties of a type `Props` to be either the original type or a `Signal` of that type.
 *
 * @example
 *    interface ExampleProps {
 *      name: string;
 *      age: number;
 *    }
 *
 *    // Expected: { name: string | Signal<string>; age: number | Signal<number>; }
 *    type SignalProps = BeeFieldSignalProps<ExampleProps>;
 */
export type BeeFieldSignalProps<Props> = { [Key in keyof Props]: Props[Key] | Signal<Props[Key]> };
