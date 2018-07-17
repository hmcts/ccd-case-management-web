import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from './profile/profile.model';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { Subscription } from 'rxjs/Subscription';
import { AppConfig } from '../app.config';
import { OAuth2Service } from './auth/oauth2.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ccd-core',
  templateUrl: './core.component.html',
  styleUrls: ['./navigation.scss']
})
export class CoreComponent implements OnInit, OnDestroy {

  selectedJurisdictionName: string;
  subscription: Subscription;
  unsupportedBrowser = false;

  profile: Profile;

  constructor(public router: Router,
              private route: ActivatedRoute,
              private jurisdictionService: JurisdictionService,
              private appConfig: AppConfig,
              private deviceService: DeviceDetectorService,
              private oauth2Service: OAuth2Service) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.data.profile;
    this.unsupportedBrowser = this.isUnsupportedBrowser();
    this.subscription =  this.jurisdictionService.selectedJurisdiction.subscribe(
      selectedJurisdiction => {
        this.selectedJurisdictionName = selectedJurisdiction.name;
      }
    );
    this.jurisdictionService.announceSelectedJurisdiction(this.profile.jurisdictions.find(
      jurisdiction => jurisdiction.id === this.profile.default.workbasket.jurisdiction_id)
    );
  }

  getSmartSurveyUrl(): string {
    return this.appConfig.getSmartSurveyUrl();
  }

  signOut(): void {
    this.oauth2Service.signOut();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isSolicitor(): boolean {
    return this.profile.isSolicitor();
  }

  isUnsupportedBrowser(): boolean {

    let browser = this.deviceService.browser;
    let browser_full_version = this.deviceService.browser_version;
    let browser_version = parseInt(browser_full_version.substring(0, browser_full_version.indexOf('.')), 10);

    switch (browser) {
      case 'chrome':
        return browser_version < this.appConfig.getChromeMinRequiredVersion();
      case 'ie':
        return browser_version < this.appConfig.getIEMinRequiredVersion();
      case 'firefox':
        return browser_version < this.appConfig.getFirefoxMinRequiredVersion();
      case 'ms-edge':
        return browser_version < this.appConfig.getEdgeMinRequiredVersion();
      default:
        return false;
    }
  }
}
