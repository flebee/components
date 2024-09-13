/**
 * This code is adapted from the original implementation by the ngxTension team.
 * Source: https://github.com/ngxtension/ngxtension-platform/blob/main/libs/ngxtension/control-value-accessor/src/control-value-accessor.ts
 *
 * Copyright (c) ngxtension Authors. Licensed under the MIT License.
 */
import { booleanAttribute, computed, DestroyRef, Directive, inject, Injector, model } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { type ControlValueAccessor, NgControl, NgModel } from '@angular/forms';

import type { BooleanInput } from '@flebee/ui/core';
import { createInjectionToken } from '@flebee/ui/core/create-injection-token';

const noop = () => undefined;

export type BeeControlValueAccessorCompareTo<T = any> = (a?: T, b?: T) => boolean;

export const [injectCvaCompareTo, provideCvaCompareTo] = createInjectionToken<() => BeeControlValueAccessorCompareTo>(
  () => Object.is
);

/**
 * Provides a {@link BeeControlValueAccessorCompareTo comparator} based on a property of `T`.
 *
 * @example
 * ```ts
 * interface User {
 * 	id: string;
 * 	name: string;
 * }
 *
 * provideCvaCompareToByProp<User>('id');
 * ```
 */
export const provideCvaCompareToByProp = <T>(prop: keyof T) =>
  provideCvaCompareTo((a, b) => Object.is(a?.[prop], b?.[prop]), true);

/**
 * BeeControlValueAccessor simplifies the implementation of the
 * [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor) interface.
 *
 * ## Features
 * - Sync `value` and `disabled` states via signals.
 * - Easily mark components as touched with `markAsTouched`.
 *
 * ### Example
 * ```ts
 * @Component({
 *   selector: 'custom-input',
 *   hostDirectives: [BeeControlValueAccessor],
 *   template: `
 *     <input
 *       [value]="cva.value()"
 *       [disabled]="cva.disabled()"
 *       (blur)="cva.markAsTouched()"
 *       (input)="cva.value.set($event.target.value)"
 *     />
 *   `,
 * })
 * export class CustomInput {
 *   protected cva = inject<BeeControlValueAccessor<string>>(BeeControlValueAccessor);
 * }
 * ```
 * Usage:
 * ```html
 * <custom-input [formControl]="control" />
 * <custom-input [(ngModel)]="value" />
 * ```
 *
 * ## Non-Primitive Values
 * Provide a comparator function to handle complex data types.
 * ```ts
 * provideCvaCompareToByProp<User>('id');
 * ```
 *
 * Full Example:
 * ```ts
 * @Component({
 *   selector: 'user-select',
 *   hostDirectives: [BeeControlValueAccessor],
 *   providers: [provideCvaCompareToByProp<User>('id')],
 *   template: `
 *     <select (change)="onChange($event)">
 *       <option *ngFor="let user of users" [value]="user.id">{{ user.name }}</option>
 *     </select>
 *   `,
 * })
 * export class UserSelect {
 *   public users = input<User[]>([]);
 *   protected cva = inject<BeeControlValueAccessor<User | null>>(BeeControlValueAccessor);
 *   protected onChange(event: Event) {
 *     this.cva.value.set(this.users.find(user => user.id === event.target.value) ?? null);
 *   }
 * }
 * ```
 */
@Directive({ standalone: true })
export class BeeControlValueAccessor<Value> implements ControlValueAccessor {
  private _ngControl = inject(NgControl, { self: true, optional: true });
  private _destroyRef = inject(DestroyRef);
  private _injector = inject(Injector);

  /**
   * A comparator, which determines value changes. Should return true, if two values are considered semanticly equal.
   *
   * Defaults to {@link Object.is} in order to align with change detection behavior for inputs.
   */
  public readonly compareTo: BeeControlValueAccessorCompareTo<Value> = injectCvaCompareTo();
  /** Whether this is disabled. If a control is present, it reflects it's disabled state. */
  public inputDisabled = model<BooleanInput>(this._ngControl?.disabled ?? false, { alias: 'disabled' });
  public disabled = computed(() => booleanAttribute(this.inputDisabled()));
  /** The value of this. If a control is present, it reflects it's value. */
  public value = model<Value>(this._ngControl?.value ?? undefined);

  /**
   * `NgModel` sets up the control in `ngOnChanges`. Idk if bug or on purpose, but `writeValue` and `setDisabledState` are called before the inputs are set.
   * {@link https://github.com/angular/angular/blob/main/packages/forms/src/directives/ng_model.ts#L223}
   *
   * @ignore
   */
  private get registered() {
    return this._ngControl instanceof NgModel ? (this._ngControl as unknown as { _registered: boolean })._registered : true;
  }

  constructor() {
    if (this._ngControl != null) this._ngControl.valueAccessor = this;

    // sync value
    toObservable(this.value, { injector: this._injector })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((value) => {
        if (this.compareTo(this._ngControl?.value, value)) return;

        this._onChange(value);
      });

    // sync disabled state
    toObservable(this.inputDisabled, { injector: this._injector })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((disabled) => {
        if (this._ngControl == null || this._ngControl.control == null || this._ngControl.disabled === disabled) return;

        this._ngControl.control[disabled ? 'disable' : 'enable']();
      });
  }

  /** This function is set by the forms api, if a control is present. */
  private _onChange: (value: Value) => void = noop;
  /** This function is set by the forms api, if a control is present. */
  private _onTouched: () => void = noop;

  /**
   * This function should be called when this host is considered `touched`.
   *
   * NOTE: Whenever a `blur` event is triggered on this host, this function is called.
   *
   * @see {@link BeeControlValueAccessor.registerOnTouched}
   * @see {@link BeeControlValueAccessor._ngControl}
   */
  markAsTouched() {
    this._onTouched();
  }

  writeValue(value: Value) {
    if (!this.registered || this.compareTo(value, this.value())) return;

    this.value.set(value);
  }

  registerOnChange(onChange: (value: Value) => void) {
    this._onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this._onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (!this.registered) return;

    this.inputDisabled.set(disabled);
  }
}
