import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  input,
  isSignal,
  runInInjectionContext,
  type Signal
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, isObservable, merge, mergeMap, type Observable, of, startWith } from 'rxjs';

import { FormlyConfig, type FormlyFieldConfig } from '@ngx-formly/core';

import type { BeeFieldConfig } from './field-config';
import type { BeeMessage } from './validators';

@Component({
  template: '',
  exportAs: 'beeValidation',
  selector: 'bee-validation',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeeValidation {
  public field = input.required<BeeFieldConfig | FormlyFieldConfig>();

  private _messages$ = toObservable(this.field as Signal<BeeFieldConfig>).pipe(
    mergeMap((currentField) => {
      const statusChanges$ = currentField?.formControl?.statusChanges ? currentField?.formControl?.statusChanges : of(null);
      const fieldChanges$ = currentField?.options?.fieldChanges?.pipe(
        filter(({ field, type, property }) => {
          return field === currentField && type === 'expressionChanges' && property?.indexOf('validation') !== -1;
        })
      );

      return merge(statusChanges$, fieldChanges$ ? fieldChanges$ : of(null)).pipe(
        startWith(undefined),
        mergeMap(() => this._getErrorMessages(currentField))
      );
    }),
    startWith(undefined)
  );
  private _config = inject(FormlyConfig);
  private _injector = inject(Injector);

  public message = toSignal(this._messages$, { requireSync: true });

  private _getErrorMessages(field: BeeFieldConfig): Observable<string | undefined> {
    for (const key in field.formControl?.errors) {
      const error = field.formControl.errors[key];

      if (!error) continue;

      const asyncValidators = field.validators as Record<string, { message?: BeeMessage }>;
      const validators = field.validators as Record<string, { message?: BeeMessage }>;
      let message = this._config.getValidatorMessage(key) as BeeMessage;

      if (this._isObject(error)) {
        if (error.errorPath) return of(undefined);

        if (error.message) {
          message = error.message;
        }
      }

      if (field.validation?.messages?.[key]) {
        message = field.validation.messages[key] as BeeMessage;
      }

      if (asyncValidators?.[key]?.message) {
        message = asyncValidators[key].message;
      }

      if (validators?.[key]?.message) {
        message = validators[key].message;
      }

      if (isSignal(message)) return this._getSafeMessage(message);

      if (typeof message !== 'function') return of(message);

      return runInInjectionContext(this._injector, () => this._getSafeMessage(message(error, field)));
    }

    return of(undefined);
  }

  private _getSafeMessage(message: Observable<string> | Signal<unknown> | string): Observable<string> {
    if (isSignal(message)) return toObservable(message as Signal<string>, { injector: this._injector });

    if (isObservable(message)) return message;

    return of(message);
  }

  private _isObject(value: unknown): value is { errorPath: unknown; message: BeeMessage } {
    return value != null && typeof value === 'object';
  }
}
