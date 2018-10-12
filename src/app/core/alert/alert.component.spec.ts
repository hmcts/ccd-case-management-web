import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { DebugElement } from '@angular/core';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';
import { text } from '../../test/helpers';
import { LevelToTypePipe } from './level-to-type.pipe';
import { Alert, AlertService } from '@hmcts/ccd-case-ui-toolkit';

describe('AlertComponent', () => {

  const CutAlertComponent: any = MockComponent({
    selector: 'cut-alert',
    inputs: ['type'],
    template: '<ng-content></ng-content>'
  });

  const ALERT: Alert = {
    level: 'error',
    message: 'Some error message'
  };
  const ALERT_SUCCESS: Alert = {
    level: 'success',
    message: 'Some success message'
  };

  let alertObserver;
  let alertService = {
    alerts: {
      subscribe: observer => alertObserver = observer
    }
  };

  let fixture: ComponentFixture<AlertComponent>;
  let component: AlertComponent;
  let de: DebugElement;

  beforeEach(async(() => {

    TestBed
      .configureTestingModule({
        imports: [],
        declarations: [
          AlertComponent,
          LevelToTypePipe,

          // Mock
          CutAlertComponent
        ],
        providers: [
          {provide: AlertService, useValue: alertService}
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);

    component = fixture.componentInstance;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should not display any alert initially', () => {
    expect(de.children.length).toBe(0);
  });

  it('should display any alert received', () => {
    alertObserver(ALERT);
    fixture.detectChanges();

    expect(de.children.length).toBe(1);

    let alertElement = de.query(By.directive(CutAlertComponent));
    expect(alertElement).toBeTruthy();

    let alert = alertElement.componentInstance;
    expect(alert.type).toBe('error');
    expect(text(alertElement)).toBe(ALERT.message);
  });

  it('should only display the last alert received', () => {
    alertObserver(ALERT);
    fixture.detectChanges();

    alertObserver(ALERT_SUCCESS);
    fixture.detectChanges();

    expect(de.children.length).toBe(1);

    let alertElement = de.query(By.directive(CutAlertComponent));
    expect(alertElement).toBeTruthy();

    let alert = alertElement.componentInstance;
    expect(alert.type).toBe('success');
    expect(text(alertElement)).toBe(ALERT_SUCCESS.message);
  });

  it('should not display any alert when alert service is cleared', () => {
    alertObserver(ALERT);
    fixture.detectChanges();

    alertObserver(null);
    fixture.detectChanges();

    expect(de.children.length).toBe(0);
  });
});
