import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input, model } from '@angular/core';

import type { BooleanInput } from '@flebee/ui/core';

import { base, icon, label, wrapper } from './styles';
import type { BeeCheckboxSize } from './types';

@Component({
  standalone: true,
  selector: 'bee-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [class]="baseClass">
      <input
        type="checkbox"
        [checked]="checked()"
        [disabled]="disabled()"
        [indeterminate]="indeterminate()"
        (input)="onToggle()"
        class="sr-only peer"
      />

      <span [class]="wrapperClass()" aria-hidden="true">
        @if (indeterminate()) {
          <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" [class]="iconClass()">
            <line x1="1" x2="22" y1="12" y2="12" stroke-width="4" stroke="currentColor"></line>
          </svg>
        } @else {
          <svg aria-hidden="true" role="presentation" viewBox="0 0 17 18" [class]="iconClass()">
            <polyline
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              stroke-dasharray="22"
              stroke-linecap="round"
              points="1 9 7 14 15 4"
              stroke-linejoin="round"
              [attr.stroke-dashoffset]="checked() ? 44 : 66"
            ></polyline>
          </svg>
        }
      </span>

      <span [class]="labelClass()">
        <ng-content />
      </span>
    </label>
  `
})
export class BeeCheckbox {
  public indeterminate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public invalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public size = input<BeeCheckboxSize>('md');
  public checked = model(false);

  public wrapperClass = computed(() => wrapper({ size: this.size(), invalid: this.invalid() }));
  public labelClass = computed(() => label({ size: this.size(), invalid: this.invalid() }));
  public iconClass = computed(() => icon({ size: this.size() }));
  public baseClass = base();

  onToggle(): void {
    this.checked.update((current) => !current);
  }
}
