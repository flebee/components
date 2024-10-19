### Import Progress

```ts
import { BeeProgress } from '@flebee/ui/progress';
```

### Usage Progress

{{ NgDocActions.playground("Progress", { inputs: { value: 50 } }) }}

### Usage Progress with FormatOptions

{{ NgDocActions.playground("Progress", { inputs: { value: 600000, max: 1000000, color: 'warning', showValue: true, formatOptions: { style: "currency", currency: "COP" }, label: 'Monthly expenses' } }) }}

### Progress Properties

| Properties    | Type                                                                                                                    | Default                |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| size          | `sm` \| `md` \| `lg`                                                                                                    | `md`                   |
| color         | `neutral` \| `primary` \| `success` \| `warning` \| `danger`                                                            | `primary`              |
| label         | `string` \| `TemplateRef`                                                                                               |                        |
| disabled      | `boolean`                                                                                                               | `false`                |
| indeterminate | `boolean`                                                                                                               | `false`                |
| showValue     | `boolean`                                                                                                               | `false`                |
| formatOptions | [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) | `{ style: 'percent' }` |
| value         | `number`                                                                                                                |                        |
| min           | `number`                                                                                                                | `0`                    |
| max           | `number`                                                                                                                | `100`                  |
