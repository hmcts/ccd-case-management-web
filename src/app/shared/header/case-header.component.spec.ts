import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseHeaderComponent } from './case-header.component';
import { DebugElement } from '@angular/core';
import { CaseReferencePipe } from '../utils/case-reference.pipe';
import { By } from '@angular/platform-browser';
import { text } from '../../test/helpers';
import { createCaseView } from "../../core/cases/case-view.test.fixture";

describe('CaseHeaderComponent', () => {

  const $HEADING = By.css('h2');

  const CASE_DETAILS = createCaseView();

  let fixture: ComponentFixture<CaseHeaderComponent>;
  let component: CaseHeaderComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          CaseHeaderComponent,
          CaseReferencePipe
        ],
        providers: []
      })
      .compileComponents();

    fixture = TestBed.createComponent(CaseHeaderComponent);
    component = fixture.componentInstance;

    component.caseDetails = CASE_DETAILS;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should render a header based on the case details', () => {
    let header = de.query($HEADING);
    expect(header).toBeTruthy();
    expect(text(header)).toEqual('#1234-5678-9012-3456');
  });

  it('should render a header based on the case details', () => {
    let header = de.query($HEADING);
    expect(header).toBeTruthy();
    expect(text(header)).toEqual('#1234-5678-9012-3456');
  });

});
