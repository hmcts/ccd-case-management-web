import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { Component, OnInit } from '@angular/core';
import { YesNoService } from './yes-no.service';

@Component({
  selector: 'ccd-read-yes-no-field',
  template: `<span [class.sr-only]="isFieldValueEmpty()">{{ getCaseFieldValue() }}</span>`
})
export class ReadYesNoFieldComponent extends AbstractFieldReadComponent implements OnInit {

  formattedValue: string;

  constructor(private yesNoService: YesNoService) {
    super();
  }

  ngOnInit() {
    this.formattedValue = this.yesNoService.format(this.caseField.value);
  }

  getCaseFieldValue(): string {
    return this.caseField.value ? this.formattedValue : '-';
  }

  isFieldValueEmpty(): boolean {
    return (!this.caseField.value);
  }

}
