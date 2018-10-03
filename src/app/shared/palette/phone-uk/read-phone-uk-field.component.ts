import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { Component } from '@angular/core';

@Component({
  selector: 'ccd-read-phone-uk-field',
  template: `<span [class.sr-only]="isFieldValueEmpty()">{{ getCaseFieldValue() }}</span>`
})
export class ReadPhoneUKFieldComponent extends AbstractFieldReadComponent {

  getCaseFieldValue(): string {
    return this.caseField.value ? this.caseField.value : '-';
  }

  isFieldValueEmpty(): boolean {
    return (!this.caseField.value);
  }

}
