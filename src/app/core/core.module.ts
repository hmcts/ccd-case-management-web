import { NgModule } from '@angular/core';
import { CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
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
import { HttpService } from './http/http.service';
import { OrderService } from './order/order.service';
import { HttpErrorService } from './http/http-error.service';
import { AlertModule } from './alert/alert.module';
import { FormValueService } from './form/form-value.service';
import { FormErrorService } from './form/form-error.service';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { ActivityService } from './activity/activity.service';
import { ActivityPollingService } from './activity/activity.polling.service';
import { DocumentManagementService } from './documentManagement/documentManagement.service';
import { CaseEditWizardGuard } from './case-editor/case-edit-wizard.guard';
import { WizardFactoryService } from './case-editor/wizard-factory.service';
import { RouterHelperService } from './utils/router-helper.service';
import { RequestOptionsBuilder } from './request.options.builder';
import { AddressesService } from './addresses/addresses.service';
import { AuthService } from './auth/auth.service';
import { WorkbasketInputFilterService } from '../workbasket/workbasket-input-filter.service';
import { OAuth2Service } from './auth/oauth2.service';
import { ActivityResolver } from './activity/activity.resolver';
import { DraftService } from './draft/draft.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    CaseUIToolkitModule
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
    HttpErrorService,
    JurisdictionService,
    ActivityService,
    ActivityResolver,
    ActivityPollingService,
    DocumentManagementService,
    AddressesService,
    AuthService,
    OAuth2Service,
    WorkbasketInputFilterService,
  ],
  declarations: [
    CoreComponent
  ]
})
export class CoreModule { }
