import { Directive } from '@angular/core';
import { FullWidthDirective } from 'src/app/shared/material/form-field/directives/full-width.directive';
import { MarginBottomDirective } from 'src/app/shared/material/form-field/directives/margin-bottom.directive';

@Directive({
  selector: 'mat-form-field',
  hostDirectives: [
    {
      directive: FullWidthDirective,
      inputs: ['appFullWidth'],
    },
    {
      directive: MarginBottomDirective,
      inputs: ['appMarginBottom: mb'],
    }
  ]
})
export class CustomFormFieldDirective {}
