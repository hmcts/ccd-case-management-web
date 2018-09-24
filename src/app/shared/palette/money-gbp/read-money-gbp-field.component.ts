import { Component, Input, OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';

@Component({
  selector: 'ccd-read-money-gbp-field',
  template: `<ng-container *ngIf="isNumber(); else noMoney">{{value / 100 | currency:'GBP':'symbol'}}</ng-container>
             <ng-template #noMoney>
               <span class="sr-only">-</span>
             </ng-template>`
})
export class ReadMoneyGbpFieldComponent extends AbstractFieldReadComponent implements OnInit {

  @Input()
  amount: any;
  value: any;

  ngOnInit(): void {
    if (this.amount) {
      this.value = this.amount;
    } else if (this.caseField) {
      this.value = this.caseField.value;
    }
  }

  isNumber(): boolean {
    return null !== this.value && !isNaN(this.value);
  }

}
