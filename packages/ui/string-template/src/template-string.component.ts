import {
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  effect,
  input,
  untracked,
  viewChild
} from '@angular/core';

@Component({
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'bee-string-template',
  template: `
    <ng-container #viewRef />

    <ng-template #contentTpl> {{ content() }} </ng-template>
  `
})
export class BeeStringTemplate<Type> {
  private _viewRef = viewChild.required('viewRef', { read: ViewContainerRef });
  private _contentTpl = viewChild.required<TemplateRef<void>>('contentTpl');
  private _embeddedRef: EmbeddedViewRef<Type | void> | null = null;

  public content = input.required<TemplateRef<Type> | string>();
  public context = input<Type | undefined>(undefined);

  constructor() {
    effect(() => {
      const contentTpl = untracked(this._contentTpl);
      const viewRef = untracked(this._viewRef);
      const content = this.content();

      viewRef.clear();

      this._embeddedRef?.destroy();
      this._embeddedRef = null;

      if (content instanceof TemplateRef) {
        const context = this._createContextForwardProxy();

        this._embeddedRef = viewRef.createEmbeddedView(content, context);
      } else {
        this._embeddedRef = viewRef.createEmbeddedView(contentTpl);
        this._embeddedRef.markForCheck();
      }
    });
  }

  /**
   * For a given outlet instance, we create a proxy object that delegates
   * to the user-specified context. This allows changing, or swapping out
   * the context object completely without having to destroy/re-create the view.
   */
  private _createContextForwardProxy(): Type {
    return <Type>new Proxy(
      {},
      {
        set: (_target, prop, newValue) => {
          const context = untracked(this.context);

          if (!context) return false;

          return Reflect.set(context, prop, newValue);
        },
        get: (_target, prop, receiver) => {
          const context = untracked(this.context);

          if (!context) return undefined;

          return Reflect.get(context, prop, receiver);
        }
      }
    );
  }
}
