import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyComponent } from './privacy.component';
import { Location } from '@angular/common';
import { MockComponent } from 'ng2-mock-component';
import { ActivatedRoute, provideRoutes } from '@angular/router';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';

describe('PrivacyComponent', () => {

  let AccordionComponent: any = MockComponent({ selector: 'ccd-accordion', inputs: [
      'title', 'lastAccordion'
    ]});

  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;
  let location: Location;
  let mockRoute;
  let RouterOutlet: any = MockComponent({ selector: 'router-outlet', inputs: []});
  let BlankComponent: any = MockComponent({ selector: 'blank-component', inputs: []});

  beforeEach(async(() => {
    mockRoute = {
      snapshot: {
        data: {
          profile: {}
        }
      }
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [
            {path: 'list/case', component: BlankComponent},
            {path: 'create/case', component: BlankComponent}
          ]
        )
      ],
      declarations: [
        PrivacyComponent,
        RouterOutlet,
        AccordionComponent,
      ],
      providers: [
        provideRoutes([]),
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Location, useValue: location }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  xit('should create', () => {
    spyOn(component.router, 'isActive').and.callFake((url) => {
      return url !== '/privacy-policy';
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
