# Changelog

## [0.3.1-beta.2](https://github.com/flebee/components/compare/v0.3.1-beta.1...v0.3.1-beta.2) (2025-08-09)

### ✨ Features

- **forms:** add support for untracked signal props in signalsExtension ([be17c45](https://github.com/flebee/components/commit/be17c45e8ce38ec808c8974e372510c97ec902bd))
- **ui/tag:** add type exports and improve tag styles ([42dc72f](https://github.com/flebee/components/commit/42dc72f6e507b20ec2cd8ef27518bbed5695513e))

### 🩹 Fixes

- **forms/radio:** fix detection of changes in signal-based options using untracked ([cab19ad](https://github.com/flebee/components/commit/cab19ad3322fef3b73053a54107c657f01d90675))

## [0.3.1-beta.1](https://github.com/flebee/components/compare/v0.3.1-beta.0...v0.3.1-beta.1) (2025-07-23)

### 🩹 Fixes

- **docs:** correct asset paths for ng-doc ([966c474](https://github.com/flebee/components/commit/966c474c66a8ac4ae5da1f2bef5a00a022f9b6c7))
- **forms/radio:** export BeeOptionContext type for custom template typing ([4103edc](https://github.com/flebee/components/commit/4103edc2faa3ad3f5c6e8bdb4f6ebdcbcc0b4dbb))
- **forms:** force type casts to ensure compatibility with strict typing ([8bf8def](https://github.com/flebee/components/commit/8bf8def7662c483dc45537a83ce2f1d47f370ddf))

### ⚡️ Performance

- **docs:** switch to zoneless change detection ([74fc788](https://github.com/flebee/components/commit/74fc788d6c21f7ab8708dfd9bd30a2d30a500fac))

### ♻️ Refactor

- **forms/template:** simplify computed getters for content types ([72f35b2](https://github.com/flebee/components/commit/72f35b2cab968f0b5d8c90d03ee0153690b55026))

## [0.3.1-beta.0](https://github.com/flebee/components/compare/v0.3.0-beta.0...v0.3.1-beta.0) (2025-07-23)

### ⚠ BREAKING CHANGES

- **forms:** Consumers must now install @ngx-formly/core manually as a peer dependency.
- **ui:** Tailwind CSS v4 requires configuration via CSS. JS-based plugin files are no longer supported.
- The minimum required Angular version is now 19.0.0

### chore

- **forms:** move @ngx-formly/core to peerDependencies ([ba74bbb](https://github.com/flebee/components/commit/ba74bbb8712d8f65379c11809d296b193b9bd8a2))
- **ui:** migrate Tailwind CSS to v4 ([30cbc1b](https://github.com/flebee/components/commit/30cbc1b265f8b10baf4a6e6cbe46df98985d57a4))
- update to Angular v19 and adjust libraries ([7216154](https://github.com/flebee/components/commit/7216154c04a370732ea1e06465ae4d1f0fbfc0a3))

### ✨ Features

- **forms/radio:** add radio group field component and utilities ([58f7f9d](https://github.com/flebee/components/commit/58f7f9df7eebc77139a21692a00a6143b5c36cef))
- **ui/avatar:** add BeeAvatar component and BeeAvatarImage/BeeAvatarFallback directives ([29d94ba](https://github.com/flebee/components/commit/29d94ba79acb3ec702ca60daf9d262cda93d1ffd)), closes [#7](https://github.com/flebee/components/issues/7)
- **ui/avatar:** add xl, 2xl, 3xl, and 4xl size variants ([f910d0c](https://github.com/flebee/components/commit/f910d0ce834c2b854d958dca3d9d4d4c92ccd2c5))
- **ui/radio:** support boolean values in radio group and component ([f5d8f72](https://github.com/flebee/components/commit/f5d8f72a1d4408faf5c3c0d0eb80411e852c8850))

### 🩹 Fixes

- **docs:** pass email label as function reference for reactivity ([c78f21f](https://github.com/flebee/components/commit/c78f21ff0d3b0bb9eb63bb896eba9f2c4610acf0))
- **forms:** restore signal reactivity after component remount ([7d83a47](https://github.com/flebee/components/commit/7d83a4727cb1084a8930eb0855cb062d1d62f58c))
- **forms:** support string validation messages and export additional validator types ([5849d22](https://github.com/flebee/components/commit/5849d22e7d15e203c05ade007b0abf31d77b522e))
- **ui/avatar:** hide fallback when image loads to prevent visual overlap ([2c82c53](https://github.com/flebee/components/commit/2c82c53d1c416e8f7edb3b317d3f0b0cfb3b79cc))

### ♻️ Refactor

- **forms/template:** improve field observation and type safety ([89cc470](https://github.com/flebee/components/commit/89cc470efc2c774cea61222e582f029739a425bd))

## 0.3.0-beta.0 (2024-10-19)

### 🚀 Features

- **forms:** add support for new Signal attributes in form fields ([96b7f0c](https://github.com/flebee/components/commit/96b7f0c))
- ⚠️ **forms:** simplify inputs for form component ([fb244d0](https://github.com/flebee/components/commit/fb244d0))
- **forms/button:** add disabled prop and enhance onClick for injection context ([d43f681](https://github.com/flebee/components/commit/d43f681))
- **forms/core:** support runInInjectionContext for error messages ([8c7d405](https://github.com/flebee/components/commit/8c7d405))
- **ui/button:** add new variants ([9922464](https://github.com/flebee/components/commit/9922464))
- ⚠️ **ui/icon:** update icon paths for Angular 18 compatibility ([30a9f4f](https://github.com/flebee/components/commit/30a9f4f))

### 🩹 Fixes

- **ui/icon:** prevent icon cache duplication on multiple requests ([f8de056](https://github.com/flebee/components/commit/f8de056))

### ⚠️ Breaking Changes

- **forms:** Existing configurations that rely on the previous input structure may require updates.
- **ui/icon:** Icon paths have been updated. Please change any references from `/assets/icons` to `/icons` to

### ❤️ Thank You

- Yeison Herrera

## 0.2.0-beta.2 (2024-09-24)

### 🚀 Features

- **forms/progress:** add progress field component ([c83da0d](https://github.com/flebee/components/commit/c83da0d))
- **ui/checkbox:** support Angular Forms with control-value-accessor ([8c5b869](https://github.com/flebee/components/commit/8c5b869))
- **ui/radio:** support Angular Forms with control-value-accessor ([177bddc](https://github.com/flebee/components/commit/177bddc))

### 🩹 Fixes

- **forms:** update typings to resolve inference issues in compiled library ([c91019c](https://github.com/flebee/components/commit/c91019c))
- **forms:** extend Formly library instead of overwriting to fix issue in compiled library ([e9d2721](https://github.com/flebee/components/commit/e9d2721))
- **ui:** correct color errors ([4e18176](https://github.com/flebee/components/commit/4e18176))
- **ui/icon:** resolve styling issues in component ([07cf366](https://github.com/flebee/components/commit/07cf366))
- **ui/progress:** resolve styling issues in component ([a334fb1](https://github.com/flebee/components/commit/a334fb1))

### ❤️ Thank You

- Yeison Herrera

## 0.2.0-beta.1 (2024-09-15)

### 🚀 Features

- **checkbox:** add support with invalid status ([fff6582](https://github.com/flebee/components/commit/fff6582))
- **checkbox:** add checkbox group component ([f823b76](https://github.com/flebee/components/commit/f823b76))
- **core:** add new utilities for assert-injector, create-injection-token and control-value-accessor ([b7bd214](https://github.com/flebee/components/commit/b7bd214))
- **forms:** init library ([e758bce](https://github.com/flebee/components/commit/e758bce))
- **forms:** add base library with validator config provider and signals support ([c669ecb](https://github.com/flebee/components/commit/c669ecb))
- **forms/button:** add button field component ([19de341](https://github.com/flebee/components/commit/19de341))
- **forms/core:** add base components with signals, injector support, and strict form typing ([e4ba2b3](https://github.com/flebee/components/commit/e4ba2b3))
- **forms/field-group:** add field component with tracking support for better performance ([999980f](https://github.com/flebee/components/commit/999980f))
- **forms/input:** add input field component ([57bffe9](https://github.com/flebee/components/commit/57bffe9))
- **forms/template:** add support for rendering templates, components, string, and HTML ([ba26501](https://github.com/flebee/components/commit/ba26501))
- **input:** add support for error message with invalid status ([fff6582](https://github.com/flebee/components/commit/fff6582))
- **input:** support Angular Forms with control-value-accessor ([219c52a](https://github.com/flebee/components/commit/219c52a))
- **radio:** add support for error message with invalid status ([87af569](https://github.com/flebee/components/commit/87af569))

### 🩹 Fixes

- **forms:** resolve issue with validation detection in BeeForms component ([64a6083](https://github.com/flebee/components/commit/64a6083))
- **ui:** text color name ([a4c3f7e](https://github.com/flebee/components/commit/a4c3f7e))

### ❤️ Thank You

- Yeison Herrera

## 0.1.0-beta.2 (2024-06-19)

### 🚀 Features

- **button:** add button and button group components ([9021da8](https://github.com/flebee/components/commit/9021da8))
- **button:** add ripple effect ([8cbca25](https://github.com/flebee/components/commit/8cbca25))
- **checkbox:** add checkbox component ([c337ecd](https://github.com/flebee/components/commit/c337ecd))
- **core:** add use-id util to generate unique ids ([5d03df1](https://github.com/flebee/components/commit/5d03df1))
- **docs:** add documentation site by NgDoc ([c03d450](https://github.com/flebee/components/commit/c03d450))
- **icon:** add icon component with SSR and cache support ([1dbc62b](https://github.com/flebee/components/commit/1dbc62b))
- **input:** add input component ([f058a2b](https://github.com/flebee/components/commit/f058a2b))
- **intl:** add intl number format ([2ca3755](https://github.com/flebee/components/commit/2ca3755))
- **progress:** add progress component ([a1748f7](https://github.com/flebee/components/commit/a1748f7))
- **radio:** add radio and radio-group components ([f88e12a](https://github.com/flebee/components/commit/f88e12a))
- **ripple:** add directive for ripple effect ([2b2ae20](https://github.com/flebee/components/commit/2b2ae20))
- **string-template:** add utility to easily render string or template with SSR support ([0c5b1b6](https://github.com/flebee/components/commit/0c5b1b6))
- **tag:** add tag component ([a9e6373](https://github.com/flebee/components/commit/a9e6373))
- **ui:** init library ([d8ba955](https://github.com/flebee/components/commit/d8ba955))
- **ui:** add tailwind css plugin ([dba3509](https://github.com/flebee/components/commit/dba3509))

### 🩹 Fixes

- **radio:** color error in border ([fa2b423](https://github.com/flebee/components/commit/fa2b423))

### 🔥 Performance

- **ui:** add ChangeDetectionStrategy.OnPush to improve performance in zone js applications ([ab19fa0](https://github.com/flebee/components/commit/ab19fa0))

### ❤️ Thank You

- Hollman Gonzalez
- Yeison Herrera
