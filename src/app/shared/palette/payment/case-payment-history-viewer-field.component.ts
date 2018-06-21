import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ccd-case-payment-history-viewer-field',
  templateUrl: 'case-payment-history-viewer-field.html',
  styleUrls: ['case-payment-history-viewer-field.scss']
})
export class CasePaymentHistoryViewerFieldComponent extends AbstractFieldReadComponent {
}
