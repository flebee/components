# {{ NgDocPage.title }}

### Creating a Form

To create a form with Flebee Forms, follow this simple example:

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BeeForms, buildForm } from '@flebee/forms';
import { withInput } from '@flebee/forms/input';

@Component({
  standalone: true,
  imports: [BeeForms, ReactiveFormsModule],
  template: `
    <form [formGroup]="myForm.form" (ngSubmit)="onSubmit()">
      <bee-forms [fields]="myForm.fields" [form]="myForm.form" [(model)]="myForm.model" />
    </form>
  `
})
export class AppComponent {
  public myForm = buildForm(
    withInput({ key: 'name', props: { type: 'text', label: 'Name', required: true } }),
    withInput({ key: 'email', props: { type: 'email', label: 'Email' } })
  );

  onSubmit() {
    console.log(this.myForm.form.getRawValue());
  }
}
```

This example demonstrates how to set up a basic form using the `buildForm` function and a few inputs. **Flebee Forms** automatically handles form control creation and validation using declarative APIs.

---

## Features

### Signals Integration

Instead of updating the form fields dynamically with signals, which isn't the best approach for calculating values, it's better to use **computed** properties. This allows you to handle form updates more effectively when the form values depend on other states. Here’s an example:

```typescript
import { signal, computed } from '@angular/core';

@Component({
  // same as previous setup
})
export class AppComponent {
  public isOptional = signal(false);

  // Use computed for dynamic label
  public emailLabel = computed(() => (this.isOptional() ? 'Email (Optional)' : 'Email'));

  public myForm = buildForm(
    withInput({ key: 'name', props: { type: 'text', label: 'Name' } }),
    withInput({ key: 'email', props: { type: 'email', label: this.emailLabel() } })
  );

  toggleLabel() {
    this.isOptional.update((value) => !value);
  }
}
```

In this example, we use a **computed** property to adjust the email label based on `isOptional`. This approach is efficient and scales well for dynamic form values.

Using **computed** for dynamic properties ensures better performance and cleaner code, especially when form states depend on reactive signals.

### Declarative Form Creation

The API is designed for clarity and simplicity, even when building complex forms:

```typescript
import { buildForm } from '@flebee/forms';
import { withButton } from '@flebee/forms/button';
import { withFieldGroup } from '@flebee/forms/field-group';
import { withInput } from '@flebee/forms/input';

const addressForm = buildForm(
  withFieldGroup(
    { className: 'grid gap-4' },
    withInput({ key: 'street', props: { type: 'text', label: 'Street' } }),
    withInput({ key: 'city', props: { type: 'text', label: 'City' } })
  ),
  withButton({ props: { type: 'submit', label: 'Submit' } })
);
```

You can also group fields and include dynamic logic to control field visibility or validation based on signals or form states.

---

## Advanced Features

### Type Inference

Flebee Forms takes full advantage of TypeScript's type inference, providing strong type safety for your forms. For instance:

```typescript
console.log(this.myForm.form);
// Inference: FormGroup<{ name: FormControl<string>; email: FormControl<string | undefined>; }>
```

You can infer the model directly from the form structure:

```typescript
console.log(this.myForm.form.getRawValue());
// Inference: { name: string; email?: string }
```

### Server-Side Rendering (SSR) Support

Flebee Forms is designed with SSR in mind, ensuring optimal performance in zoneless environments and supporting Angular's SSR capabilities out of the box.

---

## Custom Validators

Flebee Forms allows for flexible validation with both default and custom validators. You can configure validators globally or specify them at the individual input level.

### Global Validators

You can define global validators to be used across your forms. Here’s how you can set up a global IP validator:

```typescript
import { provideBeeForms } from '@flebee/forms';

providers: [
  provideBeeForms({
    validators: {
      ipGlobalAddress: {
        expression: (_, control) => (/(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { ipGlobalAddress: true }),
        message: (_, field) => `"${field.formControl?.value ?? ''}" is not a valid IP address`
      }
    }
  })
];
```

In this setup:

- **`ipGlobalAddress`** is a custom global validator that checks if a value is a valid IP address.

### Input-Specific Validators

You can also apply validators to individual inputs within your form. This allows for more granular control over validation rules:

```typescript
import { buildForm } from '@flebee/forms';
import { withInput } from '@flebee/forms/input';

const myForm = buildForm(
  withInput({
    key: 'externalIp',
    props: { type: 'text', label: 'External IP Address' },
    validators: {
      // Use the global 'ipGlobalAddress' validator
      validation: ['ipGlobalAddress']
    }
  }),
  withInput({
    key: 'internalIp',
    props: { type: 'text', label: 'Internal IP Address' },
    validators: {
      // Custom validator specific to this input
      internalIp: {
        expression: (control) => (/(\d{1,3}\.){3}\d{1,3}/.test(control.value ?? '') ? null : { internalIp: true }),
        message: (_, field) => `"${field.formControl?.value ?? ''}" is not a valid IP address`
      }
    }
  })
);
```

In this example:

- **`internalIp`** input uses a custom validator `internalIp` to validate IP addresses.
- **`externalIp`** input uses the global `ipGlobalAddress` validator defined earlier.

By leveraging both global and input-specific validators, you can ensure that your forms are both flexible and consistent.

---

This should provide a clearer and more practical guide to using both global and custom validators in Flebee Forms.
