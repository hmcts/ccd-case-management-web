import { Component, DebugElement, Input } from '@angular/core';
import { CaseField } from '../domain/definition/case-field.model';
import { FormGroup } from '@angular/forms';
import { FieldsUtils } from '../utils/fields.utils';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConditionalShowViewDirective } from './conditional-show-view.directive';

@Component({
  template: `
      <tr ccdConditionalShowView [caseField]="caseField" [eventFields]="eventFields"></tr>`
})
class TestHostComponent {

  @Input() caseField: CaseField;
  @Input() eventFields: CaseField[];
  @Input() formGroup: FormGroup;
}

let field = (id, value, showCondition?) => {
  let caseField = new CaseField();
  caseField.id = id;
  caseField.value = value;
  caseField.show_condition = showCondition;
  return caseField;
};

describe('ConditionalShowViewDirective', () => {
  let comp:    TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let conditionalShow: ConditionalShowViewDirective;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionalShowViewDirective, TestHostComponent ],
      providers:    [ FieldsUtils ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.directive(ConditionalShowViewDirective));
    el = de.nativeElement;
    conditionalShow = de.injector.get(ConditionalShowViewDirective) as ConditionalShowViewDirective;
  });

  it('should display when hide condition is empty', () => {
    comp.caseField = field('PersonSecondAddress', '', '');
    fixture.detectChanges();

    expect(el.hidden).toBe(false);
    expect(conditionalShow.condition).toBeUndefined();
  });

  it('should display when condition matches a field value', () => {
    comp.caseField = field('PersonSecondAddress', '', 'PersonLastName="Doe"');
    comp.eventFields = [comp.caseField, field('PersonLastName', 'Doe', '')];
    fixture.detectChanges();

    expect(el.hidden).toBe(false);
    expect(conditionalShow.condition.condition).toBe('PersonLastName="Doe"');
  });

  it('should not display when condition does not match field value', () => {
    comp.caseField = field('PersonSecondAddress', '', 'PersonLastName="Doe"');
    comp.eventFields = [comp.caseField, field('PersonLastName', 'Mundy', '')];
    fixture.detectChanges();

    expect(el.hidden).toBe(true);
  });

  it('should not display when condition does not match an undefined/empty field value', () => {
    comp.caseField = field('PersonSecondAddress', '', 'PersonLastName="Doe"');
    comp.eventFields = [comp.caseField, field('PersonLastName', '', '')];
    fixture.detectChanges();

    expect(el.hidden).toBe(true);
  });
});
