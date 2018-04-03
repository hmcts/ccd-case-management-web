import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { CaseField } from '../../domain/definition/case-field.model';
import { FieldsUtils } from '../../utils/fields.utils';

@Component({
  selector: 'ccd-read-complex-type-field',
  templateUrl: './read-complex-field.html',
  styleUrls: ['./read-complex-field.scss']
})
export class ReadComplexFieldComponent extends AbstractFieldReadComponent {}
