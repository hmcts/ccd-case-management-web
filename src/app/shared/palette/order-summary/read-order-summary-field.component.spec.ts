import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadOrderSummaryFieldComponent } from './read-order-summary-field.component';
import { DebugElement } from '@angular/core';
import { FieldType } from '../../domain/definition/field-type.model';
import { CaseField } from '../../domain/definition/case-field.model';
import { By } from '@angular/platform-browser';
import { Jsonp } from '@angular/http';
import { text } from '../../../test/helpers';

describe('ReadOrderSummaryFieldComponent', () => {

  const FIELD_TYPE: FieldType = {
    id: 'PersonOrderSummary',
    type: 'OrderSummary'
  };

  class Fee {
    FeeCode: string;
    FeeAmount: string;
    FeeDescription?: string;
  }

  class FeeValue {
    value: Fee
  }

  class OrderSummary {
    PaymentReference: string;
    Fees: FeeValue[];
    PaymentTotal: string;
  }

  const VALUE: OrderSummary = {
    PaymentReference: 'RC-1521-1095-0964-3143',
    Fees: [
      {
        value: {
          FeeCode: 'FEE0001',
          FeeAmount: '4545',
          FeeDescription: 'First fee description'
        }
      },
      {
        value: {
          FeeCode: 'FEE0002',
          FeeAmount: '0455',
          FeeDescription: 'Second fee description'
        }
      }
    ],
    PaymentTotal: '5000'
  };

  const EMPTY = '';
  const CASE_FIELD: CaseField = {
    id: 'x',
    label: 'X',
    display_context: 'READONLY',
    field_type: FIELD_TYPE,
    value: VALUE
  };

  const $HEAD_ROW = By.css('table>thead>tr');
  const BODY = By.css('table>tbody');

  let fixture: ComponentFixture<ReadOrderSummaryFieldComponent>;
  let component: ReadOrderSummaryFieldComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [],
        declarations: [
          ReadOrderSummaryFieldComponent
        ],
        providers: []
      })
      .compileComponents();

    fixture = TestBed.createComponent(ReadOrderSummaryFieldComponent);
    component = fixture.componentInstance;

    component.caseField = CASE_FIELD;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('render provided order summary as a table', () => {
    component.caseField.value = VALUE;
    fixture.detectChanges();

    let headRow = de.query($HEAD_ROW);
    expect(headRow.children.length).toBe(3);
    expect(text(headRow.children[0])).toBe('Code');
    expect(text(headRow.children[1])).toBe('Description');
    expect(text(headRow.children[2])).toBe('Amount');

    let body = de.query(BODY);
    expect(body.children.length).toEqual(VALUE.Fees.length);

    for (let i = 1; i <= VALUE.Fees.length; i++) {

      let feeCode = text(de.query(By.css('table>tbody tr:nth-child(' + i + ') td:nth-child(1)')));
      let feeDescription = text(de.query(By.css('table>tbody tr:nth-child(' + i + ') td:nth-child(2)')));
      let feeAmount = text(de.query(By.css('table>tbody tr:nth-child(' + i + ') td:nth-child(3)')));

      expect(feeCode).toBe(VALUE.Fees[i - 1].value.FeeCode);
      expect(feeDescription).toBe(VALUE.Fees[i - 1].value.FeeDescription);
      expect(feeAmount).toBe(VALUE.Fees[i - 1].value.FeeAmount);
    }
  });

  it('render undefined value as empty table with header only', () => {
    component.caseField.value = undefined;
    fixture.detectChanges();

    let headRow = de.query($HEAD_ROW);
    expect(headRow.children.length).toBe(3);
    expect(text(headRow.children[0])).toBe('Code');
    expect(text(headRow.children[1])).toBe('Description');
    expect(text(headRow.children[2])).toBe('Amount');

    let body = de.query(BODY);
    console.log('valueRows=', body);
    expect(body.children.length).toBe(0);
  });

  it('render null value as empty table', () => {
    component.caseField.value = null;
    fixture.detectChanges();

    let headRow = de.query($HEAD_ROW);
    expect(headRow.children.length).toBe(3);
    expect(text(headRow.children[0])).toBe('Code');
    expect(text(headRow.children[1])).toBe('Description');
    expect(text(headRow.children[2])).toBe('Amount');

    let body = de.query(BODY);
    console.log('valueRows=', body);
    expect(body.children.length).toBe(0);
  });
});
