import { Component, Input } from '@angular/core';
import { CaseField } from '../../domain/definition/case-field.model';

@Component({
  selector: 'ccd-field-read-label',
  templateUrl: './field-read-label.html',
  styleUrls: [
    './field-read-label.scss'
  ]
})
export class FieldReadLabelComponent {

  @Input()
  caseField: CaseField;

  @Input()
  withLabel: boolean;

}
