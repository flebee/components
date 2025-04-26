import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  type OnInit,
  signal,
  TemplateRef,
  Type,
  untracked
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { type BeeFieldConfig, type BeeFieldTemplateValue, BeeFieldType, type BeeFieldUnwrapProp } from '@flebee/forms/core';

interface Props {
  inputs?: Record<string, unknown>;
}

interface IObserveTarget {
  template: BeeFieldTemplateValue;
  _observers: {
    template: { value: BeeFieldTemplateValue; onChange: Array<(change: { currentValue: BeeFieldTemplateValue }) => void> };
  };
}

@Component({
  standalone: true,
  selector: 'bee-field-template',
  imports: [NgTemplateOutlet, NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (html(); as html) {
      <div [innerHtml]="html"></div>
    }

    @if (template(); as template) {
      <ng-container *ngTemplateOutlet="template" />
    }

    @if (component(); as component) {
      <ng-container *ngComponentOutlet="component; inputs: props.inputs" />
    }
  `
})
export class BeeFieldTemplate extends BeeFieldType<BeeFieldConfig<string, Props>> implements OnInit {
  private _content = signal<BeeFieldUnwrapProp<BeeFieldTemplateValue>>(undefined);
  private _sanitizer = inject(DomSanitizer);

  public html = computed(() => {
    const content = this._content();

    if (typeof content !== 'string') return;

    return this._sanitizer.bypassSecurityTrustHtml(content);
  });
  public template = computed(() => {
    const content = this._content();

    if (content instanceof TemplateRef) return content;

    return;
  });
  public component = computed(() => {
    const content = this._content();

    if (content instanceof Type) return content;

    return;
  });

  ngOnInit(): void {
    const field = this.field as unknown as IObserveTarget;

    this._content.set(field.template);

    field._observers.template.onChange.push((data) => untracked(() => this._content.set(data.currentValue)));
  }
}
