import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCaseHistoryComponent } from './event-case-history.component';

describe('EventCaseHistoryComponent', () => {
  let component: EventCaseHistoryComponent;
  let fixture: ComponentFixture<EventCaseHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCaseHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
