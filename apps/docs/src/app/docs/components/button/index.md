# {{ NgDocPage.title }}

**Flebee UI** exports 2 components:

- **BeeButton**: The main component to display a button.
- **BeeButtonGroup**: A wrapper component to display a group of buttons.

### Import Button

```ts
import { BeeButton } from '@flebee/ui/button';
```

### Usage Button

{{ NgDocActions.playground("Button") }}

### Usage Button Icon Only

{{ NgDocActions.playground("ButtonIcon", { inputs: { iconOnly: true } }) }}

### Button Properties

| Properties | Type                                 | Default   |
| ---------- | ------------------------------------ | --------- |
| size       | `sm` \| `md` \| `lg`                 | `md`      |
| variant    | `primary` \| `secondary` \| `danger` | `primary` |
| iconOnly   | `boolean`                            | `false`   |

### Import Button Group

```ts
import { BeeButton, BeeButtonGroup } from '@flebee/ui/button';
```

### Usage Button Group

{{ NgDocActions.playground("ButtonGroup") }}

### Button Group Properties

| Properties | Type                                                                                                        | Default |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| size       | `sm` \| `md` \| `lg` \|                                                                                     | `md`    |
| variant    | `primary` \| `secondary` \| `danger`\| <br /> If the variant is not passed, each button handles its variant |         |
| fullWidth  | `boolean`                                                                                                   | `false` |
