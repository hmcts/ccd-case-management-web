import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppConfig } from '../app.config';
import { OAuth2Service } from './auth/oauth2.service';
import { CcdBrowserSupportComponent } from './ccd-browser-support/ccd-browser-support.component';
import { NavigationListenerService } from './utils/navigation-listener.service';
import { JurisdictionService, Profile } from '@hmcts/ccd-case-ui-toolkit';

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
              private oauth2Service: OAuth2Service,
              private browserSupportComponent: CcdBrowserSupportComponent,
              private navigationListenerService: NavigationListenerService) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.data.profile;
    this.unsupportedBrowser = this.isUnsupportedBrowser();
    this.subscription =  this.jurisdictionService.selectedJurisdiction.subscribe(
      selectedJurisdiction => {
        this.selectedJurisdictionName = selectedJurisdiction.name;
      }
    );
    if (this.profile.default.workbasket.jurisdiction_id) {
      this.jurisdictionService.announceSelectedJurisdiction(this.profile.jurisdictions.find(
        jurisdiction => jurisdiction.id === this.profile.default.workbasket.jurisdiction_id)
      );
    }
    this.navigationListenerService.init();
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

  isCourtAdmin(): boolean {
    return this.profile.isCourtAdmin();
  }

  isUnsupportedBrowser(): boolean {
    return this.browserSupportComponent.isUnsupportedBrowser();
  }

  getMainContentLink(): string {
    return this.router.url + '#main-content';
  }
}
