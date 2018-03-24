import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CaseField } from '../domain/definition/case-field.model';
import { Subscription } from 'rxjs';
import { ShowCondition } from './conditional-show.model';
import { FieldsUtils } from '../utils/fields.utils';

@Directive({selector: '[ccdConditionalShow]'})
/** Hides and shows the host element based on the show condition if the condition is not empty. Works on read only fields and form fields.
 *  The show condition is evaluated on all the fiedls of the page. i.e. read only and form fields. When a form field is hidden, if its
 *  initial value was changed then the field is cleared. Otherwise the original value is kept and will display next time the field is
 *  shown. Evaluation of the show condition includes disabled fields, which can be on their initial value or empty. And executes on the
 *  host field initialization and when any field of the form changes.
 */
// export class ConditionalShowDirective implements OnInit, OnDestroy {
export class ConditionalShowDirective implements AfterViewInit, OnDestroy {

  @Input() caseField: CaseField;
  @Input() eventFields: CaseField[] = [];
  @Input() formGroup: FormGroup;

  condition: ShowCondition;
  private formChangesSubscription: Subscription;
  formField: any;

  constructor(private el: ElementRef, private fieldsUtils: FieldsUtils) {}

  ngAfterViewInit() {
    if (this.caseField.show_condition) {
      this.condition = new ShowCondition(this.caseField.show_condition);
      // console.log('FIELD: ' + this.caseField.id + ' init. Show condition: ' + this.caseField.show_condition);
      this.formGroup = this.formGroup || new FormGroup({});
      this.formField = this.formGroup.get(this.caseField.id);
      // console.log('FIELD: ' + this.caseField.id + '. Is form field:' + this.formField + '. Event fields:', this.eventFields);
      this.updateVisibility(this.getReadOnlyAndFormFields());
      this.subscribeToFormChanges();
    }
  }

  ngOnDestroy() {
    this.unsubscribeFromFormChanges();
  }

  private subscribeToFormChanges() {
    this.unsubscribeFromFormChanges();
    // console.log('FIELD ' + this.caseField.id + ' subscribing to form changes');
    this.formChangesSubscription = this.formGroup.valueChanges.subscribe(_ => {
      // console.log('FIELD ' + this.caseField.id + ' reacting to form change');
      this.updateVisibility(this.getReadOnlyAndFormFields());
    });
  }

  private updateVisibility(fields) {
    // console.log('FIELD ' + this.caseField.id + ' updatingVisibility based on fields: ', fields);
    if (this.shouldToggleToHide(fields)) {
      this.onHide();
    } else if (this.shouldToggleToShow(fields)) {
      this.onShow();
    }
  }

  private onHide() {
    // console.log('on hide is form field', this.formField);

    if (this.formField) {
      this.unsubscribeFromFormChanges();
      // console.log('FIELD ' + this.caseField.id + ' disabling form field');
      this.formField.disable();
      this.subscribeToFormChanges();
    }
    this.hide();
  }

  private onShow() {
    if (this.formField) {
      this.unsubscribeFromFormChanges();
      // console.log('FIELD ' + this.caseField.id + ' enabling form field', this.formField);
      this.formField.enable();
      this.subscribeToFormChanges();
    }
    this.show();
  }

  private hide() {
    this.el.nativeElement.hidden = true;
  }

  private show() {
    this.el.nativeElement.hidden = false;
  }

  private shouldToggleToHide(fields) {
    return !this.isHidden() && !this.condition.match(fields);
  }

  private shouldToggleToShow(fields) {
    return this.isHidden() && this.condition.match(fields);
  }

  private getReadOnlyAndFormFields() {
    let formFields = this.getFormFieldsValuesIncludingDisabled();
    // console.log('FIELD ' + this.caseField.id + ' current form values including disabled: ', formFields);
    return this.fieldsUtils.mergeCaseFieldsAndFormFields(this.eventFields, formFields);
  }

  private getFormFieldsValuesIncludingDisabled() {
    return this.formGroup.getRawValue();
  }

  private isHidden() {
    return this.el.nativeElement.hidden;
  }

  private unsubscribeFromFormChanges() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
