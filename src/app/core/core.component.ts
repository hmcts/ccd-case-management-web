import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from './profile/profile.model';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { Subscription } from 'rxjs/Subscription';
import { AppConfig } from '../app.config';
import { OAuth2Service } from "./auth/oauth2.service";

@Component({
  selector: 'ccd-core',
  templateUrl: './core.component.html',
  styleUrls: ['./navigation.scss']
})
export class CoreComponent implements OnInit, OnDestroy {

  selectedJurisdictionName: string;
  subscription: Subscription;

  profile: Profile;

  constructor(public router: Router,
              private route: ActivatedRoute,
              private jurisdictionService: JurisdictionService,
              private appConfig: AppConfig,
              private oauth2Service: OAuth2Service) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.data.profile;
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
}
