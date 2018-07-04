import { Component, OnInit } from '@angular/core';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { FormControl, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';

@Component({
  selector: 'ccd-write-order-summary-field',
  templateUrl: './write-order-summary-field.html'
})
export class WriteOrderSummaryFieldComponent extends AbstractFieldWriteComponent implements OnInit {

  paymentReference: FormControl;
  paymentTotal: FormControl;
  feesArray: FormArray;
  formGroup: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.registerControl(new FormGroup({}));
    this.paymentReference = new FormControl(this.caseField.value.PaymentReference);
    this.formGroup.addControl('PaymentReference', this.paymentReference);
    this.paymentTotal = new FormControl(this.caseField.value.PaymentTotal);
    this.formGroup.addControl('PaymentTotal', this.paymentTotal);
    this.feesArray = new FormArray([]);
    this.caseField.value.Fees.forEach((fee, index) => {
      let feeGroup = new FormGroup({});
      feeGroup.addControl('FeeCode', new FormControl(fee.value.FeeCode));
      feeGroup.addControl('FeeAmount', new FormControl(fee.value.FeeAmount));
      feeGroup.addControl('FeeDescription', new FormControl(fee.value.FeeDescription));
      feeGroup.addControl('FeeVersion', new FormControl(fee.value.FeeVersion));
      let feeValueGroup = new FormGroup({});
      feeValueGroup.addControl('value', feeGroup);
      this.feesArray.push(feeValueGroup);
    });
    this.formGroup.addControl('Fees', this.feesArray);
  }

}
