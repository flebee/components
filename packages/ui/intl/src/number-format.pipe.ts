import { inject, LOCALE_ID, Pipe, type PipeTransform } from '@angular/core';

import type { Nullable } from '@flebee/ui/core';

/**
 * This pipe is a wrapper around the [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) API.
 *
 * @returns The number formatted or number as string in case of errors.
 */
@Pipe({ name: 'numberFormat' })
export class NumberFormatPipe implements PipeTransform {
  private _locale = inject(LOCALE_ID);

  /**
   * Transforms the number value into a formatted string.
   *
   * @param value The number value to format.
   * @param style Optional. The formatting style to use. Defaults to "decimal".
   * @param locale Optional. The locale to use for the transformation. Defaults to LOCALE_ID.
   * @param locale Optional. The locale to use for the transformation. Defaults to LOCALE_ID.
   * @returns The number value formatted or number as string in case of errors.
   */
  transform(value: Nullable<bigint | number | string>, options?: Intl.NumberFormatOptions, locale?: string | string[]): string {
    if (value == null) return '';

    try {
      return new Intl.NumberFormat(locale || this._locale, options).format(value as number);
    } catch (e) {
      console.error(e);
      return value.toString();
    }
  }
}
