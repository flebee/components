/**
 * This code is adapted from the original implementation by the ngxTension team.
 * Source: https://github.com/ngxtension/ngxtension-platform/blob/main/libs/ngxtension/create-injection-token/src/create-injection-token.ts
 *
 * Copyright (c) ngxtension Authors. Licensed under the MIT License.
 */
import {
  ENVIRONMENT_INITIALIZER,
  type EnvironmentProviders,
  type FactoryProvider,
  type Host,
  inject,
  InjectionToken,
  type InjectOptions,
  type Injector,
  type Optional,
  type Provider,
  runInInjectionContext,
  type Self,
  type SkipSelf,
  type Type
} from '@angular/core';

import type { SafeFunction } from '@flebee/ui/core';
import { assertInjector } from '@flebee/ui/core/assert-injector';

type CreateInjectionTokenDep<TTokenType> =
  | (abstract new (...args: unknown[]) => TTokenType)
  | InjectionToken<TTokenType>
  | Type<TTokenType>;

type CreateInjectionTokenDeps<TFactory extends SafeFunction, TFactoryDeps extends Parameters<TFactory> = Parameters<TFactory>> = {
  [Index in keyof TFactoryDeps]:
    | [...modifiers: Array<Host | Optional | Self | SkipSelf>, token: CreateInjectionTokenDep<TFactoryDeps[Index]>]
    | CreateInjectionTokenDep<TFactoryDeps[Index]>;
} & { length: TFactoryDeps['length'] };

export type CreateInjectionTokenOptions<
  TFactory extends SafeFunction,
  TFactoryDeps extends Parameters<TFactory> = Parameters<TFactory>
> =
  // this means TFunction has no parameters
  (TFactoryDeps[0] extends undefined ? { deps?: never } : { deps: CreateInjectionTokenDeps<TFactory, TFactoryDeps> }) & {
    isRoot?: boolean;
    multi?: boolean;
    token?: InjectionToken<ReturnType<TFactory>>;
    extraProviders?: EnvironmentProviders | Provider;
  };

type CreateProvideFnOptions<
  TFactory extends SafeFunction,
  TFactoryDeps extends Parameters<TFactory> = Parameters<TFactory>
> = Pick<CreateInjectionTokenOptions<TFactory, TFactoryDeps>, 'deps' | 'extraProviders' | 'multi'>;

type InjectFn<TFactoryReturn> = {
  (): TFactoryReturn;
  (injectOptions: InjectOptions & { optional?: false } & { injector?: Injector }): TFactoryReturn;
  (injectOptions: InjectOptions & { injector?: Injector }): null | TFactoryReturn;
};

type ProvideFn<
  TNoop extends boolean,
  TFactoryReturn,
  TReturn = TFactoryReturn extends Array<infer Item> ? Item : TFactoryReturn
> = (TNoop extends true ? (value: (() => TReturn) | TReturn) => Provider : () => Provider) &
  (TReturn extends SafeFunction
    ? (value: (() => TReturn) | TReturn, isFunctionValue: boolean) => Provider
    : (value: (() => TReturn) | TReturn) => Provider);

export type CreateInjectionTokenReturn<TFactoryReturn, TNoop extends boolean = false> = [
  InjectFn<TFactoryReturn>,
  ProvideFn<TNoop, TFactoryReturn>,
  InjectionToken<TFactoryReturn>,
  () => Provider
];

function createInjectFn<TValue>(token: InjectionToken<TValue>) {
  return function (this: SafeFunction, { injector, ...injectOptions }: InjectOptions & { injector?: Injector } = {}) {
    injector = assertInjector(this, injector);

    return runInInjectionContext(injector, () => inject(token, injectOptions as InjectOptions));
  };
}

function createProvideFn<
  TValue,
  TFactory extends SafeFunction = (...args: unknown[]) => TValue,
  TFactoryDeps extends Parameters<TFactory> = Parameters<TFactory>
>(
  token: InjectionToken<TValue>,
  factory: (...args: unknown[]) => TValue,
  opts: CreateProvideFnOptions<TFactory, TFactoryDeps> = {}
) {
  const { deps = [], multi = false, extraProviders = [] } = opts;

  return (value?: (() => TValue) | TValue, isFunctionValue = false) => {
    let provider: Provider;

    if (typeof value !== 'undefined') {
      const factory = typeof value === 'function' ? (isFunctionValue ? () => value : value) : () => value;

      provider = { provide: token, useFactory: factory, multi };
    } else {
      provider = { provide: token, useFactory: factory, deps: deps as FactoryProvider['deps'], multi };
    }

    return [extraProviders, provider];
  };
}

/**
 * `createInjectionToken` accepts a factory function and returns a tuple of `injectFn`, `provideFn`, and the `InjectionToken`
 * that the factory function is for.
 *
 * @param {SafeFunction} factory - Factory Function that returns the value for the `InjectionToken`
 * @param {CreateInjectionTokenOptions} options - object to control how the `InjectionToken` behaves
 * @returns {CreateInjectionTokenReturn}
 *
 * @example
 * ```ts
 * const [injectCounter, provideCounter, COUNTER] = createInjectionToken(() => signal(0));
 *
 * export class Counter {
 *  counter = injectCounter(); // WritableSignal<number>
 * }
 * ```
 */
export function createInjectionToken<
  TFactory extends SafeFunction,
  TFactoryDeps extends Parameters<TFactory> = Parameters<TFactory>,
  TOptions extends CreateInjectionTokenOptions<TFactory, TFactoryDeps> = CreateInjectionTokenOptions<TFactory, TFactoryDeps>,
  TFactoryReturn = TOptions['multi'] extends true ? Array<ReturnType<TFactory>> : ReturnType<TFactory>
>(factory: TFactory, options?: TOptions): CreateInjectionTokenReturn<TFactoryReturn> {
  // NOTE: multi tokens cannot be a root token. It has to be provided (provideFn needs to be invoked)
  // for the 'multi' flag to work properly
  const isRoot = options?.isRoot && options?.multi ? false : (options?.isRoot ?? true);
  const tokenName = factory.name || factory.toString();
  const opts = { ...options, isRoot };

  if (opts.isRoot && opts.token)
    throw new Error(`createInjectionToken is creating a root InjectionToken but an external token is passed in.`);

  if (!opts.isRoot) {
    const token = opts.token || new InjectionToken<TFactoryReturn>(`Token for ${tokenName}`);

    return [
      createInjectFn(token) as CreateInjectionTokenReturn<TFactoryReturn>[0],
      createProvideFn(
        token,
        factory,
        opts as CreateProvideFnOptions<TFactory, TFactoryDeps>
      ) as CreateInjectionTokenReturn<TFactoryReturn>[1],
      token,
      () => []
    ];
  }

  const token = new InjectionToken<TFactoryReturn>(`Token for ${tokenName}`, {
    factory: () => {
      if (!opts?.deps || !Array.isArray(opts.deps)) return factory() as TFactoryReturn;

      return factory(
        ...opts.deps.map((dep) => inject((Array.isArray(dep) ? dep.at(-1) : dep) as CreateInjectionTokenDep<unknown>))
      ) as TFactoryReturn;
    }
  });

  const injectFn = createInjectFn(token) as CreateInjectionTokenReturn<TFactoryReturn>[0];

  return [
    injectFn,
    createProvideFn(
      token,
      factory,
      opts as CreateProvideFnOptions<TFactory, TFactoryDeps>
    ) as CreateInjectionTokenReturn<TFactoryReturn>[1],
    token,
    () => ({ provide: ENVIRONMENT_INITIALIZER, useValue: () => injectFn(), multi: true })
  ];
}

export function createNoopInjectionToken<
  TValue,
  TMulti extends boolean = false,
  TOptions = Pick<CreateInjectionTokenOptions<() => void, []>, 'extraProviders'> &
    (TValue extends (...args: unknown[]) => unknown ? { isFunctionValue: true } : { isFunctionValue?: never }) &
    (TMulti extends true ? { multi: true } : { multi?: never })
>(description: string, options?: TOptions) {
  type TReturn = TMulti extends true ? Array<TValue> : TValue;
  type InjectionReturn = CreateInjectionTokenReturn<TReturn, true>;

  const token = new InjectionToken<TReturn>(description);

  return [
    createInjectFn(token) as InjectionReturn[0],
    createProvideFn(token, () => null, (options || {}) as CreateProvideFnOptions<() => void, []>) as InjectionReturn[1],
    token,
    () => []
  ] as InjectionReturn;
}
