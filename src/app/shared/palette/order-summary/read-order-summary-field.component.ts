import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { Fee } from './fee.model';
import { OrderSummary } from './order-summary.model';

@Component({
  selector: 'ccd-read-order-summary-field',
  templateUrl: './read-order-summary-field.html',
  styleUrls: [
    './read-order-summary-field.scss'
  ],
})
export class ReadOrderSummaryFieldComponent extends AbstractFieldReadComponent {}
