# {{ NgDocPage.title }}

**Flebee UI** exports 2 components:

- **BeeCheckbox**: The main component to display a checkbox.
- **BeeCheckboxGroup**: A wrapper component to display a group of checkbox.

### Import Checkbox Group

```ts
import { BeeCheckbox, BeeCheckboxGroup } from '@flebee/ui/checkbox';
```

### Usage Checkbox Group

{{ NgDocActions.playground("CheckboxGroup") }}

### Checkbox Group Properties

| Properties   | Type                       | Default    |
| ------------ | -------------------------- | ---------- |
| orientation  | `vertical` \| `horizontal` | `vertical` |
| size         | `sm` \| `md` \| `lg`       | `md`       |
| disabled     | `boolean`                  | `false`    |
| invalid      | `boolean`                  | `false`    |
| description  | `string` \| `TemplateRef`  |            |
| errorMessage | `string` \| `TemplateRef`  |            |
| label        | `string` \| `TemplateRef`  |            |
| value        | `string[]` \|              |            |

### Checkbox Properties

| Properties | Type      | Default |
| ---------- | --------- | ------- |
| disabled   | `boolean` | `false` |
| value      | `string`  |         |
