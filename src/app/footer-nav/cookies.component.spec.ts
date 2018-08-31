import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesComponent } from './cookies.component';
import { Location } from '@angular/common';
import { MockComponent } from 'ng2-mock-component';

describe('CookiesComponent', () => {

  let AccordionComponent: any = MockComponent({ selector: 'ccd-accordion', inputs: [
      'title', 'lastAccordion'
    ]});

  let component: CookiesComponent;
  let fixture: ComponentFixture<CookiesComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CookiesComponent,
        AccordionComponent,
      ],
      providers: [
        { provide: Location, useValue: location }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
