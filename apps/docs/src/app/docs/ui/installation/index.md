Flebee UI is a set of Angular zoneless components with SSR support

#### Install Packages

```bash group="installation" name="npm" icon="npm"
npm install @flebee/ui cva@beta
```

```bash group="installation" name="yarn" icon="yarn"
yarn add @flebee/ui cva@beta
```

```bash group="installation" name="pnpm" icon="pnpm"
pnpm add @flebee/ui cva@beta
```

```bash group="installation" name="bun" icon="bun"
bun add @flebee/ui cva@beta
```

#### Tailwind CSS Setup

Flebee UI is built on top of **Tailwind CSS**, so you need to install.
You can follow the official [installation guide](https://tailwindcss.com/docs/installation/framework-guides/angular)

Add to **global styles**

```css name="styles.css" icon="css"
@import 'tailwindcss';
@import '@flebee/ui/theme.css';

@source "../node_modules/@flebee";
```

#### Install Onest Font (Optional)

Recommended font to use with Flebee UI, install from [Fontsource](https://fontsource.org/fonts/onest/install)

```bash group="font-installation" name="npm" icon="npm"
npm install -D @fontsource-variable/onest
```

```bash group="font-installation" name="yarn" icon="yarn"
yarn add -D @fontsource-variable/onest
```

```bash group="font-installation" name="pnpm" icon="pnpm"
pnpm add -D @fontsource-variable/onest
```

```bash group="font-installation" name="bun" icon="bun"
bun add -D @fontsource-variable/onest
```

Add to **global styles** and override **Tailwind CSS** default font

```css name="styles.css" icon="css"
@import 'tailwindcss';
@import '@flebee/ui/theme.css';
@import '@fontsource-variable/onest/wght.css';

@source "../node_modules/@flebee";

@theme {
  --font-sans: 'Onest Variable', ui-sans-serif, system-ui, sans-serif;
}
```
