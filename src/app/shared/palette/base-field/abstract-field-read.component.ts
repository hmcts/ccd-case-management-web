import { Input } from '@angular/core';
import { CaseField } from '../../domain/definition/case-field.model';

export class AbstractFieldReadComponent {
  @Input()
  caseField: CaseField;
}
