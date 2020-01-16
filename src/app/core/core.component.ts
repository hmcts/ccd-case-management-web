import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppConfig } from '../app.config';
import { OAuth2Service } from './auth/oauth2.service';
import { CcdBrowserSupportComponent } from './ccd-browser-support/ccd-browser-support.component';
import { NavigationListenerService } from './utils/navigation-listener.service';
import { JurisdictionService, Profile, Banner, BannersService,
  WindowService, JurisdictionShutteringDialogComponent,
  JurisdictionUIConfig } from '@hmcts/ccd-case-ui-toolkit';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DOCUMENT } from '@angular/common';

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
  dialogConfig: MatDialogConfig;
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
              @Inject(DOCUMENT) private document: Document) {}

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
    this.jurisdictionService.getJurisdictionUIConfigs
                            (this.profile.jurisdictions.map(j => j.id))
                            .subscribe(value => {
                              if (value) {
                                this.jurisdictionConfigs = value
                                this.jurisdictionConfigs = this.jurisdictionConfigs.filter(j => j.shuttered);
                                let jurisdictionUIConfigsCached = this.windowService.getLocalStorage(CoreComponent.JURISDICTION_UI_CONFIGS_CACHED);
                                if (!jurisdictionUIConfigsCached && this.jurisdictionConfigs.length > 0) {
                                  this.windowService.setLocalStorage(CoreComponent.JURISDICTION_UI_CONFIGS_CACHED, JSON.stringify(true));
                                  this.initDialog();
                                  const dialogRef = this.dialog.open(JurisdictionShutteringDialogComponent, this.dialogConfig);
                                  dialogRef.afterClosed().subscribe(result => {
                                    if (result === 'NewApplication') {
                                      setTimeout(() => {
                                        this.document.location.href = this.appConfig.getShutterRedirectUrl();
                                      }, 0);
                                    }
                                  });
    }}});
    

    const ids: string[] = [];
    this.profile.jurisdictions.forEach(jurisdiction => {
      ids.push(jurisdiction.id);
    });
    let bannersCached = this.windowService.getLocalStorage('BANNERS');
    if (bannersCached) {
      this.banners = JSON.parse(bannersCached);
    } else {
      this.bannersService.getBanners(ids).subscribe(bannersReceived => {
        this.banners = bannersReceived;
        this.windowService.setLocalStorage('BANNERS', JSON.stringify(this.banners));
      });
    }
    this.navigationListenerService.init();
  }

  private initDialog() {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.ariaLabel = 'Label';
    this.dialogConfig.minHeight = '300px';
    this.dialogConfig.height = 'auto';
    this.dialogConfig.width = '700px';
    this.dialogConfig.panelClass = 'dialog';
    this.dialogConfig.data = {jurisdictionConfigs: this.jurisdictionConfigs}

    this.dialogConfig.closeOnNavigation = false;
    this.dialogConfig.position = {
      top: window.innerHeight / 2 - 120 + 'px', left: window.innerWidth / 2 - 275 + 'px'
    }
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
