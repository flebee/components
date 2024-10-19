**Flebee UI** exports 2 components:

- **BeeRadio**: The main component to display a radio.
- **BeeRadioGroup**: A wrapper component to display a group of radios.

### Import Radio Group

```ts
import { BeeRadio, BeeRadioGroup } from '@flebee/ui/radio';
```

### Usage Radio Group

{{ NgDocActions.playground("RadioGroup") }}

### Usage Radio Group With Description

{{ NgDocActions.playground("RadioGroupWithDescription") }}

### Radio Group Properties

| Properties   | Type                       | Default    |
| ------------ | -------------------------- | ---------- |
| orientation  | `vertical` \| `horizontal` | `vertical` |
| size         | `sm` \| `md` \| `lg`       | `md`       |
| disabled     | `boolean`                  | `false`    |
| invalid      | `boolean`                  | `false`    |
| description  | `string` \| `TemplateRef`  |            |
| errorMessage | `string` \| `TemplateRef`  |            |
| label        | `string` \| `TemplateRef`  |            |
| name         | `string`                   |            |

### Radio Properties

| Properties  | Type                      | Default |
| ----------- | ------------------------- | ------- |
| value       | `string`                  |         |
| description | `string` \| `TemplateRef` |         |
| disabled    | `boolean`                 | `false` |
