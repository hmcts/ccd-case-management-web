import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from './profile/profile.model';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from './auth/auth.service';
import { AppConfig } from '../app.config';

@Component({
  selector: 'ccd-core',
  templateUrl: './core.component.html',
  styleUrls: ['./navigation.scss']
})
export class CoreComponent implements OnInit, OnDestroy {

  selectedJurisdictionName: string;
  subscription: Subscription;
  smartSurveryUrl: string;

  profile: Profile;

  constructor(public router: Router, private route: ActivatedRoute,
              private jurisdictionService: JurisdictionService, private authService: AuthService,
              private appConfig: AppConfig) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.data.profile;
    this.smartSurveryUrl = this.appConfig.getSmartSurveyUrl();
    this.subscription =  this.jurisdictionService.selectedJurisdiction.subscribe(
      selectedJurisdiction => {
        this.selectedJurisdictionName = selectedJurisdiction.name;
      }
    );
    this.jurisdictionService.announceSelectedJurisdiction(this.profile.jurisdictions.find(
      jurisdiction => jurisdiction.id === this.profile.default.workbasket.jurisdiction_id)
    );
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isSolicitor(): boolean {
    return this.profile.isSolicitor();
  }
}
