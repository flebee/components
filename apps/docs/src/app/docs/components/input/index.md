# {{ NgDocPage.title }}

### Import Input

```ts
import { BeeInput } from '@flebee/ui/input';
```

### Usage Input

{{ NgDocActions.playground("Input", { inputs: { type: 'text' } }) }}

### Input Properties

| Properties   | Type                                                                                          | Default |
| ------------ | --------------------------------------------------------------------------------------------- | ------- |
| type         | `date` \| `datetime-local` \| `email` \| `month` \| `number` \| `password` \| `tel` \| `text` |         |
| size         | `sm` \| `md` \| `lg`                                                                          | `md`    |
| disabled     | `boolean`                                                                                     | `false` |
| startContent | `string` \| `TemplateRef`                                                                     |         |
| endContent   | `string` \| `TemplateRef`                                                                     |         |
| description  | `string` \| `TemplateRef`                                                                     |         |
| label        | `string` \| `TemplateRef`                                                                     |         |
| placeholder  | `string`                                                                                      |         |
| value        | `string` \| `number` \| `Date`                                                                |         |
