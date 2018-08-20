import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyComponent } from './privacy.component';
import { Location } from '@angular/common';
import { MockComponent } from 'ng2-mock-component';

describe('PrivacyComponent', () => {

  let AccordionComponent: any = MockComponent({ selector: 'ccd-accordion', inputs: [
      'title'
    ]});

  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PrivacyComponent,
        AccordionComponent,
      ],
      providers: [
        { provide: Location, useValue: location }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
