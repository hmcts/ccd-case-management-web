import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
import { IsCompoundPipe } from '../utils/is-compound.pipe';
import { FormValidatorsService } from '../../../core/form/form-validators.service';

@Component({
  selector: 'ccd-write-complex-type-field',
  templateUrl: './write-complex-field.html',
  styleUrls: ['./read-complex-field.scss']
})
export class WriteComplexFieldComponent extends AbstractFieldWriteComponent implements OnInit {
  complexGroup: FormGroup;

  @Input()
  renderLabel = true;

  @Input()
  ignoreMandatory = false;

  constructor (private isCompoundPipe: IsCompoundPipe, private formValidatorsService: FormValidatorsService) {
    super();
  }

  ngOnInit(): void {
    this.complexGroup = this.registerControl(new FormGroup({}));
  }

  buildControlRegistrer(caseField: CaseField): (control: FormControl) => AbstractControl {
    return control => {
      if (this.complexGroup.get(caseField.id)) {
        return this.complexGroup.get(caseField.id);
      }
      if (!this.ignoreMandatory) {
        this.formValidatorsService.addValidators(caseField, control);
      }
      this.complexGroup.addControl(caseField.id, control);
      return control;
    };
  }

  buildIdPrefix(field: CaseField): string {
    return this.isCompoundPipe.transform(field) ? `${this.idPrefix}${field.id}_` : `${this.idPrefix}`;
  }
}
