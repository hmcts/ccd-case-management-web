import { Component, OnInit } from '@angular/core';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'ccd-write-order-summary-field',
  templateUrl: './write-order-summary-field.html'
})
export class WriteOrderSummaryFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  paymentReference: FormControl;
  paymentTotal: FormControl;
  feesArray: FormArray;
  orderSummaryGroup: FormGroup;

  ngOnInit(): void {
    this.orderSummaryGroup = this.registerControl(new FormGroup({}));
    this.paymentReference = new FormControl(this.caseField.value.PaymentReference);
    this.orderSummaryGroup.addControl('PaymentReference', this.paymentReference);
    this.paymentTotal = new FormControl(this.caseField.value.PaymentTotal);
    this.orderSummaryGroup.addControl('PaymentTotal', this.paymentTotal);
    this.feesArray = new FormArray([]);
    this.caseField.value.Fees.forEach((fee, index) => {
      this.feesArray.push(this.getFeeValue(fee.value));
    });
    this.orderSummaryGroup.addControl('Fees', this.feesArray);
  }

  private getFeeValue(feeValue): FormGroup {
    let feeGroup = new FormGroup({});
    feeGroup.addControl('FeeCode', new FormControl(feeValue.FeeCode));
    feeGroup.addControl('FeeAmount', new FormControl(feeValue.FeeAmount));
    feeGroup.addControl('FeeDescription', new FormControl(feeValue.FeeDescription));
    feeGroup.addControl('FeeVersion', new FormControl(feeValue.FeeVersion));
    let feeValueGroup = new FormGroup({});
    feeValueGroup.addControl('value', feeGroup);
    return feeValueGroup;
  }

}
