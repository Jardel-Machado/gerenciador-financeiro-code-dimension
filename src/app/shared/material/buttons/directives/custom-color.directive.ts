import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { ColorType } from 'src/app/shared/material/buttons/types/color-type';

@Directive({
  selector: '[matButton]',
})
export class CustomColorDirective {
  color = input<ColorType>(undefined, { alias: 'matButtonColor' });

  private readonly elementRef = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);

  constructor() {
    effect(() => {
      if (this.color()) {
        this.renderer2.addClass(this.elementRef.nativeElement, `btn-${this.color()}`);
      }
    });
  }
}
