import { Component, Input } from '@angular/core';
import { CaseField } from '../domain/definition/case-field.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ccd-case-edit-form',
  templateUrl: 'case-edit-form.html'
})
export class CaseEditFormComponent {

  @Input()
  fields: CaseField[] = [];
  @Input()
  formGroup: FormGroup;
  @Input()
  eventFields: CaseField[] = [];
}
