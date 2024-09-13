import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type BeeFieldConfig, BeeFieldType } from '@flebee/forms/core';
import { BeeButton } from '@flebee/ui/button';

import type { BeeButtonProps, BeeButtonType } from './with-button';

@Component({
  standalone: true,
  selector: 'bee-field-button',
  imports: [BeeButton, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      beeButton
      [type]="props.type"
      [class]="props.class"
      [size]="props.size ?? 'md'"
      [iconOnly]="props.iconOnly"
      [fullWidth]="props.fullWidth"
      [variant]="props.variant ?? 'primary'"
      (click)="onClick($event)"
    >
      {{ string }}
      <ng-container *ngTemplateOutlet="templateRef" />
    </button>
  `
})
export class BeeButtonField extends BeeFieldType<BeeFieldConfig<string, BeeButtonProps<BeeButtonType>>> {
  get templateRef() {
    return typeof this.props.label !== 'string' ? this.props.label : null;
  }
  get string() {
    return typeof this.props.label === 'string' ? this.props.label : null;
  }

  onClick(event: MouseEvent): void {
    this.props.onClick?.(this.field as any, event);
  }
}
