import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';

@Component({
  template: `<span [class.sr-only]="isFieldValueEmpty()">{{ getCaseFieldValue() }}</span>`
})
export class ReadTextFieldComponent extends AbstractFieldReadComponent {

  getCaseFieldValue(): string {
    return this.caseField.value ? this.caseField.value : '-';
  }

  isFieldValueEmpty(): boolean {
    return (!this.caseField.value);
  }

}
