import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import createSpyObj = jasmine.createSpyObj;
import { CcdActivityComponent } from './ccd-activity.component';
import { DebugElement } from '@angular/core';
import { ActivityPollingService } from '../activity.polling.service';
import { MockComponent } from 'ng2-mock-component';
import { Activity, DisplayMode } from '../activity.model';

describe('CcdActivityComponent', () => {
  let BANNER: any = DisplayMode.BANNER;
  let ICON: any = DisplayMode.ICON;
  let CASE_ID = '1507217479821551';
  let activityPollingService: any;
  let fixture: ComponentFixture<CcdActivityComponent>;
  let component: CcdActivityComponent;
  let de: DebugElement;

  const ACTIVITY_WOUT_EDITOR_AND_VIEWER: Activity = {
    caseId: CASE_ID,
    editors: [],
    unknownEditors: 0,
    viewers: [],
    unknownViewers: 0
  };

  const ACTIVITY_W_EDITOR: Activity = {
    caseId: CASE_ID,
    editors: [{forename: 'Bob', surname: 'Ross'}],
    unknownEditors: 0,
    viewers: [],
    unknownViewers: 0
  };

  const ACTIVITY_W_UNKNOWN_EDITOR: Activity = {
    caseId: CASE_ID,
    editors: [],
    unknownEditors: 1,
    viewers: [],
    unknownViewers: 0
  };
  const ACTIVITY_W_VIEWER: Activity = {
    caseId: CASE_ID,
    editors: [],
    unknownEditors: 0,
    viewers: [{forename: 'Jamie', surname: 'Olivier'}],
    unknownViewers: 0
  };
  const ACTIVITY_W_UNKNOWN_VIEWER: Activity = {
    caseId: CASE_ID,
    editors: [],
    unknownEditors: 0,
    viewers: [],
    unknownViewers: 1
  };
  const ACTIVITY_W_BOTH: Activity = {
    caseId: CASE_ID,
    editors: [{forename: 'Bob', surname: 'Ross'}],
    unknownEditors: 0,
    viewers: [{forename: 'Jamie', surname: 'Olivier'}],
    unknownViewers: 1
  };

  let CcdActivityIconComponent: any = MockComponent({
    selector: 'ccd-activity-icon',
    inputs: ['description', 'imageLink']
  });

  let CcdActivityBannerComponent: any = MockComponent({
    selector: 'ccd-activity-banner',
    inputs: ['description', 'imageLink', 'bannerType']
  });

  beforeEach(async(() => {
    activityPollingService = createSpyObj<ActivityPollingService>('activityPollingService',
      ['subscribeToActivity', 'unsubscribeFromActivity']);
    activityPollingService.subscribeToActivity.and.returnValue();
    activityPollingService.unsubscribeFromActivity.and.returnValue();
    activityPollingService.isEnabled = true;
    TestBed
      .configureTestingModule({
        imports: [],
        declarations: [
          CcdActivityComponent,
          // Mocks
          CcdActivityIconComponent,
          CcdActivityBannerComponent
        ],
        providers: [
          {provide: ActivityPollingService, useValue: activityPollingService}
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CcdActivityComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    component.caseId = CASE_ID;
    component.displayMode = BANNER;
    component.onActivityChange(ACTIVITY_W_VIEWER);
    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should render create when activity is disabled', () => {
    activityPollingService = fixture.debugElement.injector.get(ActivityPollingService);
    activityPollingService.isEnabled = false;
    fixture.detectChanges();
    let activityElement = de.query(By.css('.activityComponent'));

    expect(activityElement).toBeFalsy();
  });

  it('should render a case activity banner', () => {
    let banner = de.query(By.directive(CcdActivityBannerComponent));
    expect(activityPollingService.subscribeToActivity.toHaveBeenCalled);
    expect(banner).toBeTruthy();
  });

  it('should render single viewer banner', () => {
    let banner = de.queryAll(By.directive(CcdActivityBannerComponent));
    expect(banner).toBeTruthy();
    expect(banner.length).toEqual(1);
    expect(banner[0].componentInstance.bannerType).toBe('viewer');
  });

  it('should render single editor banner', () => {
    component.onActivityChange(ACTIVITY_W_EDITOR);
    fixture.detectChanges();
    let banner = de.queryAll(By.directive(CcdActivityBannerComponent));
    expect(banner).toBeTruthy();
    expect(banner.length).toEqual(1);
    expect(banner[0].componentInstance.bannerType).toBe('editor');
  });

  it('should render single editor banner FOR Unknown Editors', () => {
    component.onActivityChange(ACTIVITY_W_UNKNOWN_EDITOR);
    fixture.detectChanges();
    let banner = de.queryAll(By.directive(CcdActivityBannerComponent));
    expect(banner).toBeTruthy();
    expect(banner.length).toEqual(1);
    expect(banner[0].componentInstance.bannerType).toBe('editor');
  });

  it('should render single editor banner FOR Unknown Viewers', () => {
    component.onActivityChange(ACTIVITY_W_UNKNOWN_VIEWER);
    fixture.detectChanges();
    let banner = de.queryAll(By.directive(CcdActivityBannerComponent));
    expect(banner).toBeTruthy();
    expect(banner.length).toEqual(1);
    expect(banner[0].componentInstance.bannerType).toBe('viewer');
  });

  it('should render both banners', () => {
    component.onActivityChange(ACTIVITY_W_BOTH);
    fixture.detectChanges();
    let banner = de.queryAll(By.directive(CcdActivityBannerComponent));
    expect(banner).toBeTruthy();
    expect(banner.length).toEqual(2);
    expect(banner[0].componentInstance.bannerType).toBe('editor');
    expect(banner[1].componentInstance.bannerType).toBe('viewer');
  });

  it('should render single case VIEWER icon', () => {
    component.displayMode = ICON;
    fixture.detectChanges();
    let icon = de.queryAll(By.directive(CcdActivityIconComponent));
    expect(icon).toBeTruthy();
    expect(icon[0].componentInstance.imageLink).toContain('viewer.png');
  });

  it('should render single case EDITOR icon', () => {
    component.displayMode = ICON;
    component.onActivityChange(ACTIVITY_W_EDITOR);
    fixture.detectChanges();
    let icon = de.queryAll(By.directive(CcdActivityIconComponent));
    expect(icon).toBeTruthy();
    expect(icon[0].componentInstance.imageLink).toContain('editor.png');
  });

  it('should render both VIEWER & EDITOR icons', () => {
    component.displayMode = ICON;
    component.onActivityChange(ACTIVITY_W_BOTH);
    fixture.detectChanges();
    let icon = de.queryAll(By.directive(CcdActivityIconComponent));
    expect(icon).toBeTruthy();
    expect(icon[0].componentInstance.imageLink).toContain('editor.png');
    expect(icon[1].componentInstance.imageLink).toContain('viewer.png');
  });

  it('should render dash if no editors and viewers in ICON mode', () => {
    component.onActivityChange(ACTIVITY_WOUT_EDITOR_AND_VIEWER);
    component.displayMode = ICON;
    fixture.detectChanges();
    let cell = de.query(By.css('div>div'));
    expect(cell).toBeTruthy();
    expect(cell.nativeElement.textContent.trim()).toBe('-');
  });

  it('should not render dash if an editor in ICON mode', () => {
    component.onActivityChange(ACTIVITY_W_EDITOR);
    component.displayMode = ICON;
    fixture.detectChanges();
    let cell = de.query(By.css('div>div'));
    expect(cell).toBeTruthy();
    expect(cell.nativeElement.textContent.trim()).toBe('');
  });

  it('should not render dash if an unknown editor in ICON mode', () => {
    component.onActivityChange(ACTIVITY_W_UNKNOWN_EDITOR);
    component.displayMode = ICON;
    fixture.detectChanges();
    let cell = de.query(By.css('div>div'));
    expect(cell).toBeTruthy();
    expect(cell.nativeElement.textContent.trim()).toBe('');
  });

  it('should not render dash if a viewer in ICON mode', () => {
    component.onActivityChange(ACTIVITY_W_VIEWER);
    component.displayMode = ICON;
    fixture.detectChanges();
    let cell = de.query(By.css('div>div'));
    expect(cell).toBeTruthy();
    expect(cell.nativeElement.textContent.trim()).toBe('');
  });

  it('should not render dash if an unknown viewer in ICON mode', () => {
    component.onActivityChange(ACTIVITY_W_UNKNOWN_VIEWER);
    component.displayMode = ICON;
    fixture.detectChanges();
    let cell = de.query(By.css('div>div'));
    expect(cell).toBeTruthy();
    expect(cell.nativeElement.textContent.trim()).toBe('');
  });

  it('should not render dash if no editors and viewers in BANNER mode', () => {
    component.onActivityChange(ACTIVITY_WOUT_EDITOR_AND_VIEWER);
    component.displayMode = BANNER;
    fixture.detectChanges();
    let cell = de.query(By.css('div>div'));
    expect(cell).toBeTruthy();
    expect(cell.nativeElement.textContent.trim()).toBe('');
  });
});
