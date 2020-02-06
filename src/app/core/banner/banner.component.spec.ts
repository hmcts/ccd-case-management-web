import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
import { DebugElement } from '@angular/core';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';
import { text } from '../../test/helpers';
import { Banner } from '@hmcts/ccd-case-ui-toolkit';
import createSpyObj = jasmine.createSpyObj;
import { WindowService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/window';

describe('BannerComponent', () => {

  const CutAlertComponent: any = MockComponent({
    selector: 'cut-alert',
    inputs: ['type'],
    template: '<ng-content></ng-content>'
  });

  const BANNER: Banner = {
    bannerDescription: 'banner description',
    bannerUrlText: 'click here to see it. >>>',
    bannerUrl: 'http://localhost:3451/test',
    bannerViewed: false,
    bannerEnabled: true
  };

  const BANNER1: Banner = {
    bannerDescription: 'banner description2',
    bannerUrlText: 'click here to see it. >>>',
    bannerUrl: 'http://localhost:3451/test',
    bannerViewed: false,
    bannerEnabled: true
  };

  let fixture: ComponentFixture<BannerComponent>;
  let component: BannerComponent;
  let de: DebugElement;
  let windowService;

  beforeEach(async(() => {

    windowService = createSpyObj('windowService', ['setLocalStorage', 'getLocalStorage', 'removeLocalStorage']);

    TestBed
      .configureTestingModule({
        imports: [],
        declarations: [
          BannerComponent
        ],
        providers: [
          { provide: WindowService, useValue: windowService }
        ]
      })
      .compileComponents();
    fixture = TestBed.createComponent(BannerComponent);

    component = fixture.componentInstance;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should not display any alert initially', () => {
    expect(de.children.length).toBe(0);
  });

  it('should display one banner', () => {
    const BANNERS: Banner[] = [];
    BANNERS.push(BANNER);
    component.banners = BANNERS;
    fixture.detectChanges();

    expect(de.children.length).toBe(1);
  });

  it('should display two banners as received', () => {
    const BANNERS: Banner[] = [];
    BANNERS.push(BANNER);
    BANNERS.push(BANNER1);
    component.banners = BANNERS;
    fixture.detectChanges();

    expect(de.children.length).toBe(2);
  });

  it('should display one banner after changing the status to viewed', () => {
    const BANNERS: Banner[] = [];
    BANNERS.push(BANNER);
    BANNERS.push(BANNER1);
    component.banners = BANNERS;
    component.closeBanner(BANNER);
    fixture.detectChanges();

    expect(de.children.length).toBe(1);
  });
});
