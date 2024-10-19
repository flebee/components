Flebee UI is a set of Angular zoneless components with SSR support

#### Install Packages

```bash group="installation" name="npm" icon="npm"
npm install @flebee/ui
```

```bash group="installation" name="yarn" icon="yarn"
yarn add @flebee/ui
```

```bash group="installation" name="pnpm" icon="pnpm"
pnpm add @flebee/ui
```

```bash group="installation" name="bun" icon="bun"
bun add @flebee/ui
```

#### Tailwind CSS Setup

Flebee UI is built on top of **Tailwind CSS**, so you need to install **Tailwind CSS** first.
You can follow the official [installation guide](https://tailwindcss.com/docs/guides/angular) to install **Tailwind CSS.**
Then you need to add the following code to your `tailwind.config.js` file:

```javascript name="tailwind.config.js" icon="tailwindcss"
/** @type {import('tailwindcss').Config} */
const { flebeeUI } = require('@flebee/ui');

module.exports = {
  content: [
    // ...
    // Includes all flebeeUI components (this increases the bundle size)
    './node_modules/@flebee/ui/**/*.mjs',
    // Optimize the bundle by specifying only the components you use e.g. button, ripple (used by button), and radio
    './node_modules/@flebee/ui/**/(button|ripple|radio)/*.mjs'
  ],
  theme: {
    extend: {}
  },
  plugins: [flebeeUI()]
};
```

#### Install Onest Font (Optional)

Recommended font to use with Flebee UI, install from [Fontsource](https://fontsource.org/fonts/onest/install)

```bash group="font-installation" name="npm" icon="npm"
npm install @fontsource-variable/onest
```

```bash group="font-installation" name="yarn" icon="yarn"
yarn add @fontsource-variable/onest
```

```bash group="font-installation" name="pnpm" icon="pnpm"
pnpm add @fontsource-variable/onest
```

```bash group="font-installation" name="bun" icon="bun"
bun add @fontsource-variable/onest
```

Add to **global styles** and override **Tailwind CSS** default font

```css group="setting-font" name="styles.css" icon="css"
@import '@fontsource-variable/onest/wght.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

```javascript group="setting-font" name="tailwind.config.js" icon="tailwindcss"
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const { flebeeUI } = require('@flebee/ui');

module.exports = {
  content: [
    // ...
    // Includes all flebeeUI components (this increases the bundle size)
    './node_modules/@flebee/ui/**/*.mjs',
    // Optimize the bundle by specifying only the components you use e.g. button, ripple (used by button), and radio
    './node_modules/@flebee/ui/**/(button|ripple|radio)/*.mjs'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Onest Variable"', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [flebeeUI()]
};
```
