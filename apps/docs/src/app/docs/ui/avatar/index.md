**Flebee UI** exports 3 components:

- **BeeAvatar**: The main component used to display an avatar with an image, initials, or fallback content.
- **BeeAvatarImage**: A directive used to project a custom image element inside the avatar.
- **BeeAvatarFallback**: A directive used to project custom fallback content (such as an icon or any component) when the image fails to load or while loading.

---

### Import Avatar

```ts
import { BeeAvatar } from '@flebee/ui/avatar';
```

---

### Basic with Fallback Text

{{ NgDocActions.playground("Basic", { inputs: { fallback: 'YH' } }) }}

### Basic with Image

{{ NgDocActions.playground("Basic", { inputs: { src: 'https://i.pravatar.cc/300' } }) }}

### Basic with Image and Fallback

{{ NgDocActions.playground("Basic", { inputs: { fallback: 'YH', src: 'https://i.pravatar.cc/300' } }) }}

---

### Import Avatar Fallback

```ts
import { BeeAvatar, BeeAvatarFallback } from '@flebee/ui/avatar';
```

### Custom Fallback Content

{{ NgDocActions.playground("CustomFallback") }}

---

### Import Avatar Image

```ts
import { BeeAvatar, BeeAvatarImage } from '@flebee/ui/avatar';
```

### Custom Image Content

{{ NgDocActions.playground("CustomImage") }}

---

### Import Avatar Fallback and Image

```ts
import { BeeAvatar, BeeAvatarFallback, BeeAvatarImage } from '@flebee/ui/avatar';
```

### Custom Fallback and Image

{{ NgDocActions.playground("CustomFallbackAndImage") }}

---

### BeeAvatar Properties

| Property | Type                                             | Description                                                                       | Default |
| -------- | ------------------------------------------------ | --------------------------------------------------------------------------------- | ------- |
| size     | `sm` \| `md` \| `lg`                             | Controls the avatar size                                                          | `md`    |
| radius   | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `full` | Sets the avatar's border radius                                                   | `md`    |
| src      | `string`                                         | URL of the image to display                                                       | —       |
| alt      | `string`                                         | Alternative text for the image (used for accessibility)                           | —       |
| fallback | `string`                                         | Text fallback shown if the image fails to load and no custom fallback is provided | —       |
