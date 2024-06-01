import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

import { clamp } from '@flebee/ui/core';

import { ripple } from './styles';

@Directive({
  standalone: true,
  selector: '[beeRipple]',
  host: { class: 'overflow-hidden relative', '(click)': 'onClick($event)' }
})
export class BeeRipple {
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _renderer = inject(Renderer2);

  onClick(event: PointerEvent): void {
    const span = this._renderer.createElement('span') as HTMLSpanElement;
    const trigger = event.currentTarget as HTMLElement;
    const elementRef = this._elementRef.nativeElement;
    const rect = trigger.getBoundingClientRect();

    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    const duration = clamp(0.01 * size, 0.2, size > 100 ? 0.75 : 0.5) * 1_000;
    const animation = span.animate({ opacity: [0.35, 0], transform: ['scale(0)', 'scale(2)'] }, { duration, fill: 'both' });

    span.style.left = `${event.clientX - rect.x - size / 2}px`;
    span.style.top = `${event.clientY - rect.y - size / 2}px`;
    span.classList.value = ripple();
    span.style.height = `${size}px`;
    span.style.width = `${size}px`;

    animation.onfinish = () => span.remove();
    elementRef.append(span);
  }
}
