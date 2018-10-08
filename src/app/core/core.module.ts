import { NgModule } from '@angular/core';
import { CaseUIToolkitModule, FormValueService, FormErrorService, AddressesService, HttpErrorService, HttpService, AuthService,
  DocumentManagementService, OrderService } from '@hmcts/ccd-case-ui-toolkit';
import { CasesService } from './cases/cases.service';
import { DefinitionsService } from './definitions/definitions.service';
import { WindowService } from './utils/window.service';
import { DocumentService } from './utils/document.service';
import { CoreComponent } from './core.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileResolver } from './profile/profile.resolver';
import { ProfileService } from './profile/profile.service';
import { SearchService } from './search/search.service';
import { PaginationService } from './pagination/pagination.service';
import { AlertModule } from './alert/alert.module';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { ActivityService } from './activity/activity.service';
import { ActivityPollingService } from './activity/activity.polling.service';
import { CaseEditWizardGuard } from './case-editor/case-edit-wizard.guard';
import { WizardFactoryService } from './case-editor/wizard-factory.service';
import { RouterHelperService } from './utils/router-helper.service';
import { RequestOptionsBuilder } from './request.options.builder';
import { WorkbasketInputFilterService } from '../workbasket/workbasket-input-filter.service';
import { OAuth2Service } from './auth/oauth2.service';
import { ActivityResolver } from './activity/activity.resolver';
import { CookiesComponent } from '../footer-nav/cookies.component';
import { PrivacyComponent } from '../footer-nav/privacy.component';
import { TcComponent } from '../footer-nav/tc.component';
import { ContactUsComponent } from '../footer-nav/contact-us.component';
import { AccordionComponent } from '../shared/accordion/accordion.component';
import { DraftService } from './draft/draft.service';
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
    WorkbasketInputFilterService,
    CcdBrowserSupportComponent,
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
