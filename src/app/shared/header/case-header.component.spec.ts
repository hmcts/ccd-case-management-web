import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseHeaderComponent } from './case-header.component';
import { DebugElement } from '@angular/core';
import { CaseView } from '../../core/cases/case-view.model';
import { CaseReferencePipe } from '../utils/case-reference.pipe';
import { By } from '@angular/platform-browser';
import { text } from '../../test/helpers';

describe('CaseHeaderComponent', () => {

  const $HEADING = By.css('h2');

  const CASE_DETAILS: CaseView = {
    case_id: '1234567890123456',
    case_type: {
      id: 'TestAddressBookCase',
      name: 'Test Address Book Case',
      jurisdiction: {
        id: 'TEST',
        name: 'Test',
      }
    },
    channels: [],
    state: {
      id: 'CaseCreated',
      name: 'Case created'
    },
    tabs: [],
    triggers: [],
    events: []
  };

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

});
