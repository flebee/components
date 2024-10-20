## 0.3.0-beta.0 (2024-10-19)

### 🚀 Features

- **forms:** add support for new Signal attributes in form fields ([b0a1bf8](https://github.com/flebee/components/commit/b0a1bf8))
- ⚠️  **forms:** simplify inputs for form component ([1c47d00](https://github.com/flebee/components/commit/1c47d00))
- **forms/button:** add disabled prop and enhance onClick for injection context ([70fec6c](https://github.com/flebee/components/commit/70fec6c))
- **forms/core:** support runInInjectionContext for error messages ([99594d6](https://github.com/flebee/components/commit/99594d6))
- **ui/button:** add new variants ([131d1e2](https://github.com/flebee/components/commit/131d1e2))
- ⚠️  **ui/icon:** update icon paths for Angular 18 compatibility ([853db8a](https://github.com/flebee/components/commit/853db8a))

### 🩹 Fixes

- **ui/icon:** prevent icon cache duplication on multiple requests ([08e88da](https://github.com/flebee/components/commit/08e88da))

### ⚠️  Breaking Changes

- **forms:** Existing configurations that rely on the previous input structure may require updates.
- **ui/icon:** Icon paths have been updated. Please change any references from `/assets/icons` to `/icons` to

### ❤️  Thank You

- Yeison Herrera

## 0.2.0-beta.2 (2024-09-24)


### 🚀 Features

- **forms/progress:** add progress field component ([fab1516](https://github.com/flebee/components/commit/fab1516))
- **ui/checkbox:** support Angular Forms with control-value-accessor ([631bf31](https://github.com/flebee/components/commit/631bf31))
- **ui/radio:** support Angular Forms with control-value-accessor ([0819e8a](https://github.com/flebee/components/commit/0819e8a))

### 🩹 Fixes

- **forms:** update typings to resolve inference issues in compiled library ([aa1064f](https://github.com/flebee/components/commit/aa1064f))
- **forms:** extend Formly library instead of overwriting to fix issue in compiled library ([f706713](https://github.com/flebee/components/commit/f706713))
- **ui:** correct color errors ([f565d90](https://github.com/flebee/components/commit/f565d90))
- **ui/icon:** resolve styling issues in component ([f6cacc8](https://github.com/flebee/components/commit/f6cacc8))
- **ui/progress:** resolve styling issues in component ([ec3aabd](https://github.com/flebee/components/commit/ec3aabd))

### ❤️  Thank You

- Yeison Herrera

## 0.2.0-beta.1 (2024-09-15)


### 🚀 Features

- **checkbox:** add support with invalid status ([9027542](https://github.com/flebee/components/commit/9027542))
- **checkbox:** add checkbox group component ([8289012](https://github.com/flebee/components/commit/8289012))
- **core:** add new utilities for assert-injector, create-injection-token and control-value-accessor ([6e58dfe](https://github.com/flebee/components/commit/6e58dfe))
- **forms:** init library ([3d81012](https://github.com/flebee/components/commit/3d81012))
- **forms:** add base library with validator config provider and signals support ([030988e](https://github.com/flebee/components/commit/030988e))
- **forms/button:** add button field component ([286764d](https://github.com/flebee/components/commit/286764d))
- **forms/core:** add base components with signals, injector support, and strict form typing ([c697ef5](https://github.com/flebee/components/commit/c697ef5))
- **forms/field-group:** add field component with tracking support for better performance ([8818220](https://github.com/flebee/components/commit/8818220))
- **forms/input:** add input field component ([c1e4937](https://github.com/flebee/components/commit/c1e4937))
- **forms/template:** add support for rendering templates, components, string, and HTML ([616832c](https://github.com/flebee/components/commit/616832c))
- **input:** add support for error message with invalid status ([f94cbfa](https://github.com/flebee/components/commit/f94cbfa))
- **input:** support Angular Forms with control-value-accessor ([add723c](https://github.com/flebee/components/commit/add723c))
- **radio:** add support for error message with invalid status ([ef93145](https://github.com/flebee/components/commit/ef93145))

### 🩹 Fixes

- **forms:** resolve issue with validation detection in BeeForms component ([46506f3](https://github.com/flebee/components/commit/46506f3))
- **ui:** text color name ([80a2a79](https://github.com/flebee/components/commit/80a2a79))

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