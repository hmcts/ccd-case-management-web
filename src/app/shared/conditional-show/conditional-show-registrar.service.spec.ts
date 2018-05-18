import { ConditionalShowDirective } from './conditional-show.directive';
import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FieldsUtils } from '../utils/fields.utils';
import { CaseField } from '../domain/definition/case-field.model';
import { FormGroup } from '@angular/forms';

@Component({
  template: `
      <tr ccdConditionalShow [caseField]="caseField" [formGroup]="formGroup" [eventFields]="eventFields"></tr>`
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

describe('ConditionalShowDirective', () => {

  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let conditionalShow: ConditionalShowDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionalShowDirective, TestHostComponent],
      providers: [FieldsUtils]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.directive(ConditionalShowDirective));
    el = de.nativeElement;
    conditionalShow = de.injector.get(ConditionalShowDirective) as ConditionalShowDirective;
  });

  it('should register', () => {
      // TODO: do sth
  });

});
