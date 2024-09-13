import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, type TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgTemplateOutlet],
  selector: 'bee-string-template',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    {{ string() }}

    <ng-container *ngTemplateOutlet="templateRef(); context: context()" />
  `
})
export class BeeStringTemplate<Type> {
  public content = input.required<string | TemplateRef<Type>>();
  public context = input<Type | undefined>(undefined);

  public string = computed(() => {
    const content = this.content();

    return typeof content === 'string' ? content : '';
  });
  public templateRef = computed(() => {
    const content = this.content();

    return typeof content === 'string' ? null : content;
  });
}
