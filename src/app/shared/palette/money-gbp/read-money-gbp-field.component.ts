import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';

@Component({
  selector: 'ccd-read-money-gbp-field',
  template: `<ng-container *ngIf="isNumber(caseField.value)">{{caseField.value / 100 | currency:'GBP':true}}</ng-container>`
})
export class ReadMoneyGbpFieldComponent extends AbstractFieldReadComponent {

  isNumber(value): boolean {
    return null !== value && !isNaN(value);
  }

}
