## 0.3.0-beta.0 (2024-10-19)

### 🚀 Features

- **forms:** add support for new Signal attributes in form fields ([96b7f0c](https://github.com/flebee/components/commit/96b7f0c))
- ⚠️  **forms:** simplify inputs for form component ([fb244d0](https://github.com/flebee/components/commit/fb244d0))
- **forms/button:** add disabled prop and enhance onClick for injection context ([d43f681](https://github.com/flebee/components/commit/d43f681))
- **forms/core:** support runInInjectionContext for error messages ([8c7d405](https://github.com/flebee/components/commit/8c7d405))
- **ui/button:** add new variants ([9922464](https://github.com/flebee/components/commit/9922464))
- ⚠️  **ui/icon:** update icon paths for Angular 18 compatibility ([30a9f4f](https://github.com/flebee/components/commit/30a9f4f))

### 🩹 Fixes

- **ui/icon:** prevent icon cache duplication on multiple requests ([f8de056](https://github.com/flebee/components/commit/f8de056))

### ⚠️  Breaking Changes

- **forms:** Existing configurations that rely on the previous input structure may require updates.
- **ui/icon:** Icon paths have been updated. Please change any references from `/assets/icons` to `/icons` to

### ❤️  Thank You

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

### ❤️  Thank You

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

### ❤️  Thank You

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

### ❤️  Thank You

- Hollman Gonzalez
- Yeison Herrera
