import { Component, OnInit } from '@angular/core';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { CaseField } from '../../domain/definition/case-field.model';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormValidatorsService } from '../../../core/form/form-validators.service';

@Component({
  selector: 'ccd-write-collection-field',
  templateUrl: './write-collection-field.html',
  styleUrls: ['./collection-field.scss']
})
export class WriteCollectionFieldComponent extends AbstractFieldWriteComponent implements OnInit {
  formArray: FormArray;

  constructor(private formValidatorsService: FormValidatorsService) {
    super();
  }

  ngOnInit(): void {
    this.caseField.value = this.caseField.value || [];

    this.formArray = this.registerControl(new FormArray([]));
  }

  buildCaseField(item, index: number): CaseField {
    return {
      id: index.toString(),
      field_type: this.caseField.field_type.collection_field_type,
      display_context: this.caseField.display_context,
      value: item.value,
      label: null
    };
  }

  buildControlRegistrer(id: string, index: number): (control: FormControl) => AbstractControl {
    return control => {
      if (this.formArray.at(index)) {
        return this.formArray.at(index).get('value');
      }
      this.formValidatorsService.addValidators(this.caseField, control);
      this.formArray.push(
        new FormGroup({
          id: new FormControl(id),
          value: control
        })
      );
      return control;
    };
  }

  buildIdPrefix(index: number): string {
    if ('Complex' === this.caseField.field_type.collection_field_type.type) {
      return this.idPrefix + this.caseField.id + '_' + index + '_';
    } else {
      return this.idPrefix + this.caseField.id + '_';
    }
  }

  addItem(): void {
    // Manually resetting errors is required to prevent `ExpressionChangedAfterItHasBeenCheckedError`
    this.formArray.setErrors(null);
    this.caseField.value.push({value: null});
  }

  removeItem(index: number): void {
    this.caseField.value.splice(index, 1);
    this.formArray.removeAt(index);
  }

  itemLabel(index: number) {
    let displayIndex = index + 1;
    return index ? `${this.caseField.label} ${displayIndex}` : this.caseField.label;
  }

}
