import { RouterModule, Routes } from '@angular/router';
import { WorkbasketComponent } from './workbasket/workbasket.component';
import { SearchComponent } from './search/search.component';
import { ProfileResolver } from './core/profile/profile.resolver';
import { CoreComponent } from './core/core.component';
import { CaseResolver } from './cases/case.resolver';
import { CaseViewerComponent } from './cases/viewer/case-viewer.component';
import { ErrorComponent } from './error/error.component';
import { EventTriggerResolver } from './cases/event-trigger/event-trigger.resolver';
import { CaseEventTriggerComponent } from './cases/event-trigger/case-event-trigger.component';
import { CaseCreatorComponent } from './cases/creator/case-creator.component';
import { CasePrinterComponent } from './cases/printer/case-printer.component';
import { CasePrintDocumentsResolver } from './cases/printer/case-print-documents.resolver';
import { CaseCreatorSubmitComponent } from './cases/creator/case-creator-submit.component';
import { CreateCaseEventTriggerResolver } from './cases/creator/create-case-event-trigger.resolver';
import { OAuth2RedirectComponent } from './oauth2/oauth2-redirect.component';
import { AppConfigGuard } from './app.config.guard';
import { ActivityResolver } from './core/activity/activity.resolver';
import { CaseHistoryComponent } from './shared/case-history/case-history.component';
import { CaseHistoryResolver } from './shared/case-history/case-history.resolver';
import { CookiesComponent } from './footer-nav/cookies.component';
import { PrivacyComponent } from './footer-nav/privacy.component';
import { TcComponent } from './footer-nav/tc.component';
import { ContactUsComponent } from './footer-nav/contact-us.component';
import { routing as caseEditRouting } from '@hmcts/ccd-case-ui-toolkit';

const caseViewChildRoutes: Routes = [
  {
    path: '',
    component: CaseViewerComponent
  },
  {
    path: 'print',
    component: CasePrinterComponent,
    resolve: {
      documents: CasePrintDocumentsResolver
    },
  },
  {
    path: 'trigger/:eid',
    resolve: {
      eventTrigger: EventTriggerResolver
    },
    component: CaseEventTriggerComponent,
    children: caseEditRouting
  },
  {
    path: 'event/:eid/history',
    resolve: {
      caseHistory: CaseHistoryResolver,
    },
    component: CaseHistoryComponent,
  }
];

const routes: Routes = [
  {
    path: 'oauth2redirect',
    component: OAuth2RedirectComponent,
    canActivate: [
      AppConfigGuard,
    ],
  },
  {
    path: '',
    component: CoreComponent,
    canActivate: [
      AppConfigGuard,
    ],
    resolve: {
      profile: ProfileResolver,
      activity: ActivityResolver,
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list/case' },
      { path: 'list/case', component: WorkbasketComponent },
      { path: 'error', component: ErrorComponent },
      { path: 'create/case',
        children: [
          {
            path: '',
            component: CaseCreatorComponent
          },
          {
            path: ':jid/:ctid/:eid',
            component: CaseCreatorSubmitComponent,
            resolve: {
              eventTrigger: CreateCaseEventTriggerResolver
            },
            children: caseEditRouting
          }
        ]
      },
      {
        path: 'case/:jid/:ctid/:cid',
        resolve: {
          case: CaseResolver
        },
        runGuardsAndResolvers: 'always',
        children: caseViewChildRoutes,
      },
      // While CCD is progressively moving to case ID only endpoints, routes have to be duplicated.
      {
        path: 'v2/case/:cid',
        resolve: {
          case: CaseResolver
        },
        runGuardsAndResolvers: 'always',
        children: caseViewChildRoutes,
      },
      { path: 'search', component: SearchComponent},
      { path: 'cookies', component: CookiesComponent },
      { path: 'privacy-policy', component: PrivacyComponent },
      { path: 'terms-and-conditions', component: TcComponent },
      { path: 'contact-us', component: ContactUsComponent },
    ]
  }
];

export const routing = RouterModule.forRoot(routes);
