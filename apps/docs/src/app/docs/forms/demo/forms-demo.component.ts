import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BeeForms, buildForm, provideBeeForms } from '@flebee/forms';
import { withButton } from '@flebee/forms/button';
import { withFieldGroup } from '@flebee/forms/field-group';
import { withInput } from '@flebee/forms/input';
import { BeeButton } from '@flebee/ui/button';

// Signal to manage language
const language = signal<'en' | 'es'>('en');

// Computed to determine if the language is English
const isLanguageEn = computed(() => language() === 'en');

@Component({
  selector: 'app-forms-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BeeForms, BeeButton, ReactiveFormsModule],
  template: `
    <form [formGroup]="myForm.form" (ngSubmit)="onSubmit()">
      <bee-forms [form]="myForm" />

      <footer class=" flex flex-wrap gap-4 mt-4">
        <button beeButton variant="secondary" type="button" (click)="changeLanguage()"> {{ changeLanguageLabel() }} </button>
        <button beeButton variant="secondary" type="button" (click)="toggleLabel()"> {{ toggleEmailLabel() }} </button>
      </footer>
    </form>
  `,
  providers: [
    provideBeeForms({
      validators: {
        required: computed(() => (isLanguageEn() ? 'This field is required' : 'Este campo es requerido')),
        ipGlobalAddress: {
          expression: (_, control) => (/(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { ipGlobalAddress: true }),
          message: (_, field) => {
            const value = field.formControl?.value ?? '';

            return computed(() => {
              return isLanguageEn() ? `"${value}" is not a valid IP Address` : `"${value}" no es una dirección IP válida`;
            });
          }
        }
      }
    })
  ]
})
export class FormsDemoComponent {
  // Signal to manage dynamic label
  public isOptional = signal(false);

  // Computed properties for dynamic labels
  public internalIpLabel = computed(() => (isLanguageEn() ? 'Internal IP Address' : 'Dirección IP Interna'));
  public externalIpLabel = computed(() => (isLanguageEn() ? 'External IP Address' : 'Dirección IP Externa'));
  public submitLabel = computed(() => (isLanguageEn() ? 'Submit' : 'Enviar'));
  public nameLabel = computed(() => (isLanguageEn() ? 'Name' : 'Nombre'));
  public emailLabel = computed(() => {
    const isOptional = this.isOptional();

    if (isLanguageEn()) return `Email ${isOptional ? '(Optional)' : ''}`.trim();

    return `Correo electrónico ${isOptional ? '(Opcional)' : ''}`.trim();
  });

  // Computed buttons for dynamic labels
  public toggleEmailLabel = computed(() => (isLanguageEn() ? 'Toggle Email Label' : 'Alternar etiqueta de correo'));
  public changeLanguageLabel = computed(() => (isLanguageEn() ? 'Change Language' : 'Cambiar idioma'));

  // Toggle between optional and required label
  toggleLabel() {
    this.isOptional.update((value) => !value);
  }

  // Change language between English and Spanish
  changeLanguage() {
    language.update((current) => (current === 'en' ? 'es' : 'en'));
  }

  // Define the form with fields and validators
  public myForm = buildForm(
    withFieldGroup(
      { className: 'grid grid-cols-2 gap-4' },
      withInput({ key: 'name', props: { type: 'text', label: this.nameLabel, required: true } }),
      withInput({ key: 'email', props: { type: 'email', label: this.emailLabel } }),
      withInput({
        key: 'internalIp',
        props: { type: 'text', label: this.internalIpLabel },
        validators: {
          internalIp: {
            expression: (control) => /(\d{1,3}\.){3}\d{1,3}/.test(control.value ?? ''),
            message: (_, field) => {
              const value = field.formControl?.value ?? '';

              return computed(() => {
                return isLanguageEn() ? `"${value}" is not a valid IP Address` : `"${value}" no es una dirección IP válida`;
              });
            }
          }
        }
      }),
      withInput({
        key: 'externalIp',
        props: { type: 'text', label: this.externalIpLabel },
        validators: {
          // Uses the global IP address validator
          validation: ['ipGlobalAddress']
        }
      }),
      withButton({ props: { type: 'submit', label: this.submitLabel } })
    )
  );

  // Handle form submission
  onSubmit() {
    console.log(this.myForm.form.getRawValue());
  }
}
