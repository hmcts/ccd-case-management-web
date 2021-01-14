import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkbasketComponent } from './workbasket/workbasket.component';
import { SearchComponent } from './search/search.component';
import { ProfileResolver } from './core/profile/profile.resolver';
import { CoreComponent } from './core/core.component';
import { ErrorComponent } from './error/error.component';
import { CaseCreatorComponent } from './cases/creator/case-creator.component';
import { CaseCreatorSubmitComponent } from './cases/creator/case-creator-submit.component';
import { CreateCaseEventTriggerResolver } from './cases/creator/create-case-event-trigger.resolver';
import { OAuth2RedirectComponent } from './oauth2/oauth2-redirect.component';
import { AppConfigGuard } from './app.config.guard';
import { ActivityResolver } from './core/activity/activity.resolver';
import { CookiesComponent } from './footer-nav/cookies.component';
import { PrivacyComponent } from './footer-nav/privacy.component';
import { TcComponent } from './footer-nav/tc.component';
import { ContactUsComponent } from './footer-nav/contact-us.component';
import { editorRouting as caseEditRouting, viewerRouting as caseViewRouting, CaseResolver } from '@hmcts/ccd-case-ui-toolkit';

const routes: Routes = [
  {
    path: 'oauth2redirect',
    component: OAuth2RedirectComponent,
    canActivate: [
      AppConfigGuard,
    ],
  },
  {
    path: 'media-viewer',
    loadChildren: './mv-wrapper/media-viewer-wrapper.module#MediaViewerWrapperModule'
  },
  {
    path: 'shutter',
    canActivate: [
      AppConfigGuard,
    ],
    loadChildren: './shutter/shutter.module#ShutterModule'
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
        children: caseViewRouting,
      },
      // While CCD is progressively moving to case ID only endpoints, routes have to be duplicated.
      {
        path: 'v2/case/:cid',
        resolve: {
          case: CaseResolver
        },
        runGuardsAndResolvers: 'always',
        children: caseViewRouting,
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

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class AppRoutingModule { }
