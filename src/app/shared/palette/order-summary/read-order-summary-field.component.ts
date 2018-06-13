import { Component, ViewChildren, QueryList } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { ReadOrderSummaryRowComponent } from './read-order-summary-row.component';
import { FeeValue } from './fee-value.model';

@Component({
  selector: 'ccd-read-order-summary-field',
  templateUrl: './read-order-summary-field.html',
  styleUrls: [
    './read-order-summary-field.scss'
  ],
})
export class ReadOrderSummaryFieldComponent extends AbstractFieldReadComponent {

  @ViewChildren(ReadOrderSummaryRowComponent)
  orderSummaryRows: QueryList<ReadOrderSummaryRowComponent>;

  getFees(): FeeValue[] {
    return this.caseField.value ? this.caseField.value.Fees : [];
  }

  getPaymentTotal(): string {
    return this.caseField.value ? this.caseField.value.PaymentTotal : '';
  }
}
