<p align="center">
  <a href="https://components.flebee.com">
    <img src="https://components.flebee.com/assets/favicon.svg" width="100" height="100" alt="Flebee logo">
  </a>
</p>

<h1 align="center">Flebee Forms</h1>

Flebee Forms is a powerful extension of [Formly](https://formly.dev/) for Angular that introduces signals and a declarative approach to form creation. With a strong emphasis on type inference, Flebee Forms enables the development of complex forms with enhanced type safety, making form creation in Angular more intuitive and efficient.

> **Note**: While Flebee Forms provides robust type inference capabilities, we recognize that there may be some limitations. We invite contributions or suggestions from the community to help us improve the type inference within our library.

In addition to seamless integration with Formly, Flebee Forms incorporates a wide range of Flebee UI components. This allows for not only data input but also the representation and interaction with various UI elements, such as buttons and other visual components.

> **Important**: Flebee Forms is currently in development and in the beta phase. Some features may not be fully operational.

## Getting Started

To begin using Flebee Forms, follow the comprehensive guide available on our documentation site. This guide will walk you through the installation process, basic setup, and initial configuration to help you seamlessly integrate Flebee Forms into your Angular project.

Visit the [Flebee Forms Getting Started Guide](https://components.flebee.com/docs/forms/installation) to get started.

## Documentation

For detailed information on all available components, their properties, methods, and examples, please refer to our documentation. The documentation provides usage examples to help you make the most of Flebee Forms.

Access the full documentation here: [Flebee Forms Documentation](https://components.flebee.com/docs/forms).

## Features

- **Signal Integration**: Extends Formly with signals for more effective state management.
- **Declarative Form Creation**: Build forms using a declarative API that simplifies complex form structures.
- **Type Inference**: Leverage TypeScript to ensure type safety in your forms.
- **Zoneless Components**: Designed to work without Angular zones, improving performance.
- **Server-Side Rendering (SSR) Support**: Optimized for server-side rendering.
- **Flebee UI Components**: Includes additional Flebee UI components for easy representations and interactions, such as buttons and more.

## Usage Example

Here’s a quick example of how to define a form using Flebee Forms:

```typescript
import { ChangeDetectionStrategy, Component, computed, effect, signal, TemplateRef, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BeeForms, buildForm } from '@flebee/forms';
import { withButton } from '@flebee/forms/button';
import { withFieldGroup } from '@flebee/forms/field-group';
import { withInput } from '@flebee/forms/input';
import { withTemplate } from '@flebee/forms/template';
import { BeeButton } from '@flebee/ui/button';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [BeeForms, BeeButton, ReactiveFormsModule],
  template: `
    <form [formGroup]="address.form" (ngSubmit)="onSubmit()" class="p-6">
      <bee-forms [fields]="address.fields" [form]="address.form" [(model)]="address.model" />
    </form>

    <ng-template #headerTpl>
      <header class="flex flex-col gap-4 mb-4">
        <h2> Example Form </h2>

        <button beeButton variant="secondary" type="button" (click)="toggle()">
          Toggle Example (Current: {{ example() }})
        </button>
      </header>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public subTitle = computed(() => `Address${this.example() ? ' Updated' : ''}`);
  public label = computed(() => `Name${this.example() ? ' Updated' : ''}`);
  public header = viewChild.required<TemplateRef<void>>('headerTpl');
  public buttonLabel = viewChild.required<TemplateRef<void>>('buttonLabel');
  public price = signal(0);
  public example = signal(false);

  public address = buildForm(
    withTemplate({ template: this.header, className: 'col-span-full mt-4' }),
    withFieldGroup(
      { className: 'grid gap-4 grid-cols-2' },
      withInput({ key: 'name', props: { type: 'text', label: this.label, required: true } }),
      withInput({ key: 'price', props: { type: 'number', label: 'Price' } })
    ),
    withFieldGroup(
      { key: 'address', className: 'grid gap-4 grid-cols-2' },
      withTemplate({ template: this.subTitle, className: 'col-span-full mt-4' }),
      withInput({ key: 'name', props: { type: 'text', label: 'Name' } }),
      withInput({ key: 'phone', props: { type: 'tel', label: 'Phone' } }),
      withInput({ key: 'date', props: { type: 'date', label: 'Date' } })
    ),
    withButton({ className: 'mt-4 block', props: { type: 'submit', label: 'Save' } })
  );

  constructor() {
    // Effect to log model changes
    effect(() => console.log(this.address.model()));

    // Subscribe to form value changes
    this.address.form.valueChanges.subscribe((value) => console.log(value));

    // Log the form instance
    console.log(this.address.form);
    // Inference: FormGroup<{
    //   name: FormControl<string>;
    //   price: FormControl<number | undefined>;
    //   address: FormGroup<{
    //     name: FormControl<string | undefined>;
    //     phone: FormControl<string | undefined>;
    //     date: FormControl<Date | undefined>;
    //   }>;
    // }>

    // Log the current model
    console.log(this.address.model());
    // Inference: Partial<{
    //   name: string | undefined;
    //   price: number | undefined;
    //   address: Partial<{
    //     name: string | undefined;
    //     phone: string | undefined;
    //     date: Date | undefined;
    //   }> | undefined;
    // }>
  }

  toggle() {
    this.example.update((value) => !value);
  }

  onSubmit() {
    // Log the form value without nulls
    console.log(this.address.form.getRawValue());
    // Inference: {
    //     name: string;
    //     price: number | undefined;
    //     address: {
    //         name: string | undefined;
    //         phone: string | undefined;
    //         date: Date | undefined;
    //     };
    // }
  }
}
```

In this example, you can see how Flebee Forms simplifies form creation with a clear structure and robust type inference, all while leveraging signals for improved state management.

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about our development process and how to submit pull requests.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
