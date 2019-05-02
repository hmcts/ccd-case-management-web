import { NgModule } from '@angular/core';
import { CaseUIToolkitModule, FormValueService, FormErrorService, AddressesService, HttpErrorService, HttpService, AuthService,
  DocumentManagementService, OrderService, WizardFactoryService, CaseEditWizardGuard, RouterHelperService, DraftService,
  CasesService, ProfileService, ActivityService, ActivityPollingService, RequestOptionsBuilder, WindowService, SearchService,
  JurisdictionService, SearchResultViewItemComparatorFactory } from '@hmcts/ccd-case-ui-toolkit';
import { DefinitionsService } from './definitions/definitions.service';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    CaseUIToolkitModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    CasesService,
    DraftService,
    HttpErrorService,
    DefinitionsService,
    DocumentService,
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
    ActivityService,
    ActivityResolver,
    ActivityPollingService,
    DocumentManagementService,
    AddressesService,
    AuthService,
    OAuth2Service,
    CcdBrowserSupportComponent,
    SearchResultViewItemComparatorFactory,
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
