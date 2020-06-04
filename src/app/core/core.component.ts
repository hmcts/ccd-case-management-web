import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppConfig } from '../app.config';
import { OAuth2Service } from './auth/oauth2.service';
import { CcdBrowserSupportComponent } from './ccd-browser-support/ccd-browser-support.component';
import { NavigationListenerService } from './utils/navigation-listener.service';
import { JurisdictionService, Profile, Banner, BannersService,
  WindowService, JurisdictionShutteringDialogComponent,
  JurisdictionUIConfig, UrlTransformationService } from '@hmcts/ccd-case-ui-toolkit';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DOCUMENT } from '@angular/common';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'ccd-core',
  templateUrl: './core.component.html',
  styleUrls: ['./navigation.scss']
})
export class CoreComponent implements OnInit, OnDestroy {

  private static readonly JURISDICTION_UI_CONFIGS_CACHED: string = 'UI_CONFIGS_CACHED';
  selectedJurisdictionName: string;
  subscription: Subscription;
  unsupportedBrowser = false;
  banners: Banner[] = [];

  profile: Profile;
  expertUIURL: string;
  jurisdictionConfigs: JurisdictionUIConfig[] = [];

  constructor(public router: Router,
              private route: ActivatedRoute,
              private jurisdictionService: JurisdictionService,
              private bannersService: BannersService,
              private appConfig: AppConfig,
              private oauth2Service: OAuth2Service,
              private browserSupportComponent: CcdBrowserSupportComponent,
              private navigationListenerService: NavigationListenerService,
              private windowService: WindowService,
              private dialog: MatDialog,
              @Inject(DOCUMENT) private document: Document,
              private urlTransformationService: UrlTransformationService) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.data.profile;
    this.unsupportedBrowser = this.isUnsupportedBrowser();
    this.subscription =  this.jurisdictionService.selectedJurisdiction.subscribe(
      selectedJurisdiction => {
        this.selectedJurisdictionName = selectedJurisdiction.name;
      }
    );
    if (this.profile.default.workbasket && this.profile.default.workbasket.jurisdiction_id) {
      this.jurisdictionService.announceSelectedJurisdiction(this.profile.jurisdictions.find(
        jurisdiction => jurisdiction.id === this.profile.default.workbasket.jurisdiction_id)
      );
    }
    this.jurisdictionService.getJurisdictionUIConfigs
                            (this.profile.jurisdictions.map(j => j.id))
                            .subscribe(value => this.handleShuttering(value));

    const ids: string[] = [];
    this.profile.jurisdictions.forEach(jurisdiction => {
      ids.push(jurisdiction.id);
    });
    let bannersCached = this.windowService.getLocalStorage('BANNERS');
    if (bannersCached) {
      this.banners = JSON.parse(bannersCached);
    } else {
      this.bannersService.getBanners(ids).map(bannersReceived => {
        bannersReceived.forEach(banner => {
          if (banner.bannerUrl) {
            banner.bannerUrl = this.urlTransformationService.getPreferredEquivalentOf(banner.bannerUrl);
          }
        })
        return bannersReceived;
      }).subscribe(bannersReceived => {
        this.banners = bannersReceived;
        this.windowService.setLocalStorage('BANNERS', JSON.stringify(this.banners));
      });
    }
    this.navigationListenerService.init();
  }

  private handleShuttering(value: any) {
    if (value) {
      this.jurisdictionConfigs = value
      this.jurisdictionConfigs = this.jurisdictionConfigs.filter(j => j.shuttered);
      let jurisdictionUIConfigsCached = this.windowService.getLocalStorage(CoreComponent.JURISDICTION_UI_CONFIGS_CACHED);
      if (!jurisdictionUIConfigsCached && this.jurisdictionConfigs.length > 0) {
        this.windowService.setLocalStorage(CoreComponent.JURISDICTION_UI_CONFIGS_CACHED, JSON.stringify(true));
        let dialogConfig = this.initDialog();
        const dialogRef = this.dialog.open(JurisdictionShutteringDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'NewApplication') {
            setTimeout(() => {
              this.document.location.href = this.urlTransformationService
                                            .getPreferredEquivalentOf(this.appConfig.getShutterRedirectUrl());
            }, 0);
          }
        });
      }
    }
  }

  private initDialog() {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.ariaLabel = 'Label';
    dialogConfig.minHeight = '300px';
    dialogConfig.height = 'auto';
    dialogConfig.width = '700px';
    dialogConfig.panelClass = 'dialog';
    dialogConfig.data = {jurisdictionConfigs: this.jurisdictionConfigs}

    dialogConfig.closeOnNavigation = false;
    dialogConfig.position = {
      top: window.innerHeight / 2 - 120 + 'px', left: window.innerWidth / 2 - 275 + 'px'
    }
    return dialogConfig;
  }

  getSmartSurveyUrl(): string {
    return this.appConfig.getSmartSurveyUrl();
  }

  signOut(): void {
    this.oauth2Service.signOut();
    this.windowService.removeLocalStorage('BANNERS');
    this.windowService.removeLocalStorage(CoreComponent.JURISDICTION_UI_CONFIGS_CACHED);
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
