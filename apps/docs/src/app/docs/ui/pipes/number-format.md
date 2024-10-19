---
title: Number Format
route: number-format
---

### Import Number Format

```ts
import { NumberFormatPipe } from '@flebee/ui/intl';
```

### Usage Number Format

{{ NgDocActions.playground("NumberFormat") }}

### Usage Number Format with FormatOptions and Custom Locale

{{ NgDocActions.playground("NumberFormat", { inputs: { options: { style: 'currency', currency: 'COP' }, locale: 'es-ES' } }) }}

### Number Format Properties

| Properties | Type                                                                                                                    | Default                |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| value      | `bigint` \| `number` \| `string` \| `undefined` \| `null`                                                               |                        |
| options    | [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) | `{ style: 'decimal' }` |
| locale     | `string` \| `string[]`                                                                                                  | `LOCALE_ID`            |
