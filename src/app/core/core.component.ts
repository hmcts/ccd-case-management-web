import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from './profile/profile.model';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { Subscription } from 'rxjs/Subscription';
import { AppConfig } from '../app.config';
import { OAuth2Service } from './auth/oauth2.service';

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

    let ua = window.navigator.userAgent;

    let chrome = ua.indexOf('Chrome/');
    if (chrome > 0) {
      if ( parseInt(ua.substring(chrome + 7, ua.indexOf('.', chrome)), 10) < this.appConfig.getChromeVersion() ) {
        return true;
      }
    }
    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
      let rv = ua.indexOf('rv:');
      if ( parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10) < this.appConfig.getIEVersion() ) {
        return true;
      }
    }
    let edge = ua.indexOf('Edge/');
    if (edge > 0) {
      let rv = ua.indexOf('rv:');
      if ( parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10) < this.appConfig.getEdgeVersion() ) {
        return true;
      }
    }
    let firefox = ua.indexOf('Firefox/');
    if (firefox > 0) {
      if ( parseInt(ua.substring(firefox + 8, ua.indexOf('.', firefox)), 10) < this.appConfig.getFirefoxVersion() ) {
        return true;
      }
    }
    return false;
  }
}
