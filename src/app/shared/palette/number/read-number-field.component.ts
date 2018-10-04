import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { Component } from '@angular/core';

@Component({
  selector: 'ccd-read-number-field',
  template: `<span [class.sr-only]="isFieldValueEmpty()">{{ getCaseFieldValue() }}</span>`
})
export class ReadNumberFieldComponent extends AbstractFieldReadComponent {

  getCaseFieldValue(): string {
    return this.caseField.value ? this.caseField.value : '-';
  }

  isFieldValueEmpty(): boolean {
    return (!this.caseField.value);
  }

}
