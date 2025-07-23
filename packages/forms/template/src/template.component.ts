import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  type OnInit,
  signal,
  TemplateRef,
  Type
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ɵobserve } from '@ngx-formly/core';

import { type BeeFieldConfig, type BeeFieldTemplateValue, BeeFieldType, type BeeFieldUnwrapProp } from '@flebee/forms/core';

interface Props {
  inputs?: Record<string, unknown>;
}

@Component({
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
  private _destroyRef = inject(DestroyRef);

  public html = computed(() => {
    const content = this._content();

    return typeof content === 'string' ? this._sanitizer.bypassSecurityTrustHtml(content) : '';
  });
  public template = computed(() => {
    const content = this._content();

    return content instanceof TemplateRef ? content : null;
  });
  public component = computed(() => {
    const content = this._content();

    return content instanceof Type ? content : null;
  });

  ngOnInit(): void {
    const subscription = ɵobserve(this.field, ['template'], (data) => this._content.set(data.currentValue));

    this._content.set(this.field.template);
    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
