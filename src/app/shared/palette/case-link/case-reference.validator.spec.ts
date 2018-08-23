import { FormControl, ValidatorFn } from '@angular/forms';
import { FormValueService } from '../../../core/form/form-value.service'
import { CaseReferenceValidator } from './case-reference.validator'
describe('CaseReferenceValidator', () => {

  const validator: ValidatorFn = CaseReferenceValidator(new FormValueService());

  class TestComponent {
    caseReferenceControl: FormControl = new FormControl(CaseReferenceValidator(new FormValueService()));
  }

  let component: TestComponent;

  beforeEach(() => {
    component = new TestComponent();
    component.caseReferenceControl.setValidators(validator);
  });

  it('should invalidate case reference which does not pass check sum', () => {
    component.caseReferenceControl.setValue('1234567812345678');
    expect(component.caseReferenceControl.valid).toBeFalsy();
  });

  it('should invalidate case reference which is too short', () => {
    component.caseReferenceControl.setValue('1234');
    expect(component.caseReferenceControl.valid).toBeFalsy();
  });

  it('should validate case reference', () => {
    component.caseReferenceControl.setValue('1234567812345670');
    expect(component.caseReferenceControl.valid).toBeTruthy();
  });
});
