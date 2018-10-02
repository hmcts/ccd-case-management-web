import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';

@Component({
  selector: 'ccd-read-multi-select-list-field',
  templateUrl: './read-multi-select-list-field.html',
  styleUrls: ['./multi-select-list.scss']
})
export class ReadMultiSelectListFieldComponent extends AbstractFieldReadComponent {

  getCaseFieldValue(): string {
    return this.caseField.value ? this.caseField.value : '-';
  }

  isFieldValueEmpty(): boolean {
    return (!this.caseField.value);
  }

}
