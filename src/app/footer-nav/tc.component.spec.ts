import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcComponent } from './tc.component';
import { Location } from '@angular/common';
import { MockComponent } from 'ng2-mock-component';

describe('TcComponent', () => {

  let AccordionComponent: any = MockComponent({ selector: 'ccd-accordion', inputs: [
      'title', 'lastAccordion'
    ]});

  let component: TcComponent;
  let fixture: ComponentFixture<TcComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TcComponent,
        AccordionComponent,
      ],
      providers: [
        { provide: Location, useValue: location }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
