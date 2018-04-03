import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { CaseField } from '../../domain/definition/case-field.model';
import { FieldsUtils } from '../../utils/fields.utils';

@Component({
  selector: 'ccd-read-complex-type-field',
  templateUrl: './read-complex-field.html',
  styleUrls: ['./read-complex-field.scss']
})
export class ReadComplexFieldComponent extends AbstractFieldReadComponent {

  getComplexFields() {
    let complexFields = [];

    this.caseField.field_type.complex_fields.forEach((elem, index) => {
      let elemCopy = FieldsUtils.cloneObject(elem);
      if (this.caseField.value) {
        elemCopy.value = this.caseField.value[elem.id];
        if (!elem.value) {
          complexFields[index] = elemCopy;
        }
      }
    });
    return complexFields;
  }

}
