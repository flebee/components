## Default Validators

Flebee Forms includes default validators:

- **required**: Checks if a field has a value.
- **min**: Checks if a value is greater than or equal to a specified minimum.
- **max**: Checks if a value is less than or equal to a specified maximum.
- **minLength**: Checks if the length of a value is at least a specified length.
- **maxLength**: Checks if the length of a value is at most a specified length.
- **pattern**: Checks if a value matches a specified regular expression.

These validators do not come with default error messages. You need to provide custom messages if required.

### Customizing Error Messages

You can customize the error messages for these default validators. Here's how you can configure messages based on the user's language:

```typescript
import { provideBeeForms } from '@flebee/forms';

providers: [
  provideBeeForms({
    validators: {
      required: 'This field is required',
      min: ({ min }) => `Must be greater than ${min}`,
      max: ({ max }) => `Must be less than ${max}`,
      minLength: ({ requiredLength }) => `Must have at least ${requiredLength} characters`,
      maxLength: ({ actualLength }) => `Must have at most ${actualLength} characters`,
      pattern: ({ requiredPattern }) => `Must match the pattern ${requiredPattern}`
    }
  })
];
```

## Custom Validators

In addition to default validators, you can create custom validators. For example, to validate IP addresses:

```typescript
import { provideBeeForms } from '@flebee/forms';

providers: [
  provideBeeForms({
    validators: {
      ip: {
        expression: (_, control) => (/(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { ip: true }),
        message: (_, field) => `"${field.formControl?.value ?? ''}" is not a valid IP Address`
      }
    }
  })
];
```

### Using Signals

You can use signals for dynamic behavior in validation messages based on language settings. For example:

```typescript
import { signal, computed } from '@angular/core';

import { provideBeeForms } from '@flebee/forms';

const language = signal<'en' | 'es'>('en');
const isLanguageEn = computed(() => language() === 'en');

provideBeeForms({
  validators: {
    required: computed(() => (isLanguageEn() ? 'This field is required' : 'Este campo es requerido')),
    minLength: ({ requiredLength }) => {
      return computed(() => {
        return isLanguageEn()
          ? `Must have at least ${requiredLength} characters`
          : `Debe tener al menos ${requiredLength} caracteres`;
      });
    }
  }
});
```

## Provider Function Example

If you need to inject dependencies, you can do so in the provider function:

```typescript
import { provideBeeForms } from '@flebee/forms';

import { I18nService } from 'your-i18n-service';

providers: [
  provideBeeForms(() => {
    // Configuration based on injected dependencies
    const i18n = inject(I18nService);

    return {
      required: i18n.translate('required')
      // Additional configuration based on i18n service
    };
  })
];
```
