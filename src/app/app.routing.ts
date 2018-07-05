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
import { CreateCaseFieldsResolver } from './cases/creator/create-case-fields.resolver';
import { CaseEditSubmitComponent } from './shared/case-editor/case-edit-submit.component';
import { CaseEditPageComponent } from './shared/case-editor/case-edit-page.component';
import { CaseEditWizardGuard } from './core/case-editor/case-edit-wizard.guard';
import { OAuth2RedirectComponent } from './oauth2/oauth2-redirect.component';
import { CaseEditConfirmComponent } from './shared/case-editor/case-edit-confirm.component';
import { AppConfigGuard } from './app.config.guard';
import { ActivityResolver } from './core/activity/activity.resolver';
import { CaseHistoryComponent } from './shared/case-history/case-history.component';
import { CaseHistoryResolver } from './shared/case-history/case-history.resolver';

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
              eventTrigger: CreateCaseFieldsResolver
            },
            children: [
              {
                path: '',
                resolve: {
                  caseEditWizardGuard: CaseEditWizardGuard,
                },
                component: CaseEditPageComponent,
              },
              {
                path: 'submit',
                component: CaseEditSubmitComponent,
              },
              {
                path: 'confirm',
                component: CaseEditConfirmComponent,
              },
              {
                path: ':page',
                resolve: {
                  caseEditWizardGuard: CaseEditWizardGuard,
                },
                component: CaseEditPageComponent,
              }
            ]
          }
        ]
      },
      {
        path: 'case/:jid/:ctid/:cid',
        resolve: {
          case: CaseResolver
        },
        runGuardsAndResolvers: 'always',
        children: [
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
            children: [
              {
                path: '',
                resolve: {
                  caseEditWizardGuard: CaseEditWizardGuard,
                },
                component: CaseEditPageComponent,
              },
              {
                path: 'submit',
                component: CaseEditSubmitComponent,
              },
              {
                path: 'confirm',
                component: CaseEditConfirmComponent,
              },
              {
                path: ':page',
                resolve: {
                  caseEditWizardGuard: CaseEditWizardGuard,
                },
                component: CaseEditPageComponent,
              }
            ]
          },
          {
            path: 'event/:eid/history',
            resolve: {
              caseHistory: CaseHistoryResolver,
            },
            component: CaseHistoryComponent,
          }
        ]
      },
      { path: 'search', component: SearchComponent}
    ]
  }
];

export const routing = RouterModule.forRoot(routes);
