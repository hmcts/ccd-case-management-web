import { NgModule } from '@angular/core';
import { CaseUIToolkitModule, FormValueService, FormErrorService, AddressesService, HttpErrorService, HttpService, AuthService,
  DocumentManagementService, OrderService, WizardFactoryService, CaseEditWizardGuard, RouterHelperService, DraftService,
  CasesService, ProfileService, ActivityService, ActivityPollingService, RequestOptionsBuilder, WindowService, SearchService,
  JurisdictionService, SearchResultViewItemComparatorFactory, ErrorNotifierService, BannersService, UrlTransformationService } from '@hmcts/ccd-case-ui-toolkit';
import { DocumentService } from './utils/document.service';
import { CoreComponent } from './core.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileResolver } from './profile/profile.resolver';
import { PaginationService } from './pagination/pagination.service';
import { AlertModule } from './alert/alert.module';
import { OAuth2Service } from './auth/oauth2.service';
import { ActivityResolver } from './activity/activity.resolver';
import { CookiesComponent } from '../footer-nav/cookies.component';
import { PrivacyComponent } from '../footer-nav/privacy.component';
import { TcComponent } from '../footer-nav/tc.component';
import { ContactUsComponent } from '../footer-nav/contact-us.component';
import { AccordionComponent } from '../shared/accordion/accordion.component';
import { CcdBrowserSupportComponent } from './ccd-browser-support/ccd-browser-support.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NavigationListenerService } from './utils/navigation-listener.service';
import { BannerModule } from './banner/banner.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    BannerModule,
    CaseUIToolkitModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    CasesService,
    DraftService,
    HttpErrorService,
    DocumentService,
    NavigationListenerService,
    FormErrorService,
    FormValueService,
    CaseEditWizardGuard,
    WizardFactoryService,
    OrderService,
    ProfileResolver,
    ProfileService,
    WindowService,
    RouterHelperService,
    SearchService,
    PaginationService,
    RequestOptionsBuilder,
    HttpService,
    JurisdictionService,
    BannersService,
    ActivityService,
    ActivityResolver,
    ActivityPollingService,
    DocumentManagementService,
    AddressesService,
    AuthService,
    OAuth2Service,
    CcdBrowserSupportComponent,
    SearchResultViewItemComparatorFactory,
    ErrorNotifierService,
    UrlTransformationService,
  ],
  declarations: [
    CoreComponent,
    CookiesComponent,
    PrivacyComponent,
    TcComponent,
    ContactUsComponent,
    AccordionComponent,
    CcdBrowserSupportComponent
  ]
})
export class CoreModule { }
