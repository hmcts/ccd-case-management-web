import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadMoneyGbpFieldComponent } from './read-money-gbp-field.component';
import { DebugElement } from '@angular/core';
import { FieldType } from '../../domain/definition/field-type.model';
import { CaseField } from '../../domain/definition/case-field.model';

describe('ReadMoneyGBPFieldComponent', () => {

  const FIELD_TYPE: FieldType = {
    id: 'MoneyGBP',
    type: 'MoneyGBP'
  };
  const VALUE = 4220;
  const CASE_FIELD: CaseField = {
    id: 'x',
    label: 'X',
    display_context: 'OPTIONAL',
    field_type: FIELD_TYPE,
    value: VALUE
  };

  let fixture: ComponentFixture<ReadMoneyGbpFieldComponent>;
  let component: ReadMoneyGbpFieldComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [],
        declarations: [
          ReadMoneyGbpFieldComponent
        ],
        providers: []
      })
      .compileComponents();

    fixture = TestBed.createComponent(ReadMoneyGbpFieldComponent);
    component = fixture.componentInstance;

    component.caseField = CASE_FIELD;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should render provided value as GBP currency', () => {
    component.caseField.value = VALUE;
    fixture.detectChanges();

    expect(de.nativeElement.textContent).toEqual('£42.20');
  });

  it('should prefix pences with leading 0.', () => {
    component.caseField.value = 20;
    fixture.detectChanges();

    expect(de.nativeElement.textContent).toEqual('£0.20');
  });

  it('should format large number with commas', () => {
    component.caseField.value = 420000020;
    fixture.detectChanges();

    expect(de.nativeElement.textContent).toEqual('£4,200,000.20');
  });

  it('should render undefined value as empty string', () => {
    component.caseField.value = undefined;
    fixture.detectChanges();

    expect(de.nativeElement.textContent).toEqual('');
  });

  it('should render null value as empty string', () => {
    component.caseField.value = null;
    fixture.detectChanges();

    expect(de.nativeElement.textContent).toEqual('');
  });

  it('should render unsupported values as empty string', () => {
    component.caseField.value = 'bugger off, you who is reading that';
    fixture.detectChanges();

    expect(de.nativeElement.textContent).toEqual('');
  });
});
