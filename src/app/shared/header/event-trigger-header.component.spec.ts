import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventTriggerHeaderComponent } from './event-trigger-header.component';
import { DebugElement } from '@angular/core';
import { text } from '../../test/helpers';
import { By } from '@angular/platform-browser';
import { CaseEventTrigger, createCaseEventTrigger } from '@hmcts/ccd-case-ui-toolkit';

describe('EventTriggerHeaderComponent', () => {

  const $HEADING = By.css('h1');

  const EVENT_TRIGGER: CaseEventTrigger = createCaseEventTrigger('TEST_TRIGGER', 'Test Trigger', '456', false, []);

  let fixture: ComponentFixture<EventTriggerHeaderComponent>;
  let component: EventTriggerHeaderComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          EventTriggerHeaderComponent
        ],
        providers: []
      })
      .compileComponents();

    fixture = TestBed.createComponent(EventTriggerHeaderComponent);
    component = fixture.componentInstance;

    component.eventTrigger = EVENT_TRIGGER;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should render a header based on the case details', () => {
    let header = de.query($HEADING);
    expect(header).toBeTruthy();
    expect(text(header)).toEqual('Test Trigger');
  });

});
