import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  inject,
  input,
  model,
  viewChild
} from '@angular/core';

import type { BooleanInput } from '@flebee/ui/core';

import { BeeCheckboxGroup } from './checkbox-group.component';
import { base, icon, label, wrapper } from './styles';
import type { BeeCheckboxSize } from './types';

@Component({
  standalone: true,
  selector: 'bee-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [class]="baseClass">
      <input
        #input
        type="checkbox"
        [value]="value()"
        [checked]="safeChecked()"
        [disabled]="safeDisabled()"
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
              [attr.stroke-dashoffset]="safeChecked() ? 44 : 66"
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
  private _input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private _size = computed(() => this._group?.size() || this.size());
  private _group = inject(BeeCheckboxGroup, { optional: true });

  public indeterminate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public invalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public value = input<string | undefined>(undefined);
  public size = input<BeeCheckboxSize>('md');
  public checked = model(false);

  public safeChecked = computed(() => (this._group ? this._group.has(this.value()) : this.checked()));
  public wrapperClass = computed(() => wrapper({ size: this._size(), invalid: this.safeInvalid() }));
  public labelClass = computed(() => label({ size: this._size(), invalid: this.safeInvalid() }));
  public safeDisabled = computed(() => this._group?.disabled() || this.disabled());
  public safeInvalid = computed(() => this._group?.invalid() || this.invalid());
  public iconClass = computed(() => icon({ size: this._size() }));
  public baseClass = base();

  onToggle(): void {
    if (!this._group) return this.checked.update((current) => !current);

    this._group.toggle(this.value());
    this._input().nativeElement.checked = this.safeChecked();
  }
}
