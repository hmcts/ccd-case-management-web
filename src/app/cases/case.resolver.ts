import { CaseView } from '../core/cases/case-view.model';
import { ActivatedRouteSnapshot, ParamMap, Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CasesService } from '../core/cases/cases.service';
import { Response } from '@angular/http';
import { AlertService } from '../core/alert/alert.service';

import 'rxjs/add/operator/catch';
import { DraftService } from '../core/draft/draft.service';

@Injectable()
export class CaseResolver implements Resolve<CaseView> {

  public static readonly PARAM_JURISDICTION_ID = 'jid';
  public static readonly PARAM_CASE_TYPE_ID = 'ctid';
  public static readonly PARAM_CASE_ID = 'cid';
  public static readonly CASE_CREATED_MSG = 'The case has been created successfully';
  public static readonly DRAFT = 'DRAFT';

  // we need to run the CaseResolver on every child route of 'case/:jid/:ctid/:cid'
  // this is achieved with runGuardsAndResolvers: 'always' configuration
  // we cache the case view to avoid retrieving it for each child route
  public cachedCaseView: CaseView;

  constructor(private casesService: CasesService,
               private draftService: DraftService,
               private router: Router,
               private alertService: AlertService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CaseView> {

    let {jid, ctid, cid} = this.getParams(route.paramMap);

    if (jid && ctid && !cid) {
      // when redirected to case view after a case created, and the user has no READ access,
      // the post returns no id
      this.navigateToCaseList();
    } else {
      return this.isCaseViewRoute(route) ? this.getAndCacheCaseView(jid, ctid, cid)
        : this.cachedCaseView ? Observable.of(this.cachedCaseView)
        : this.getAndCacheCaseView(jid, ctid, cid);
    }
  }

  private getParams(pm: ParamMap) {
    const jid = pm.get(CaseResolver.PARAM_JURISDICTION_ID);
    const ctid = pm.get(CaseResolver.PARAM_CASE_TYPE_ID);
    const cid = pm.get(CaseResolver.PARAM_CASE_ID);

    return {jid, ctid, cid};
  }

  private navigateToCaseList() {
    this.router.navigate(['/list/case'])
    .then(() => this.alertService.success(CaseResolver.CASE_CREATED_MSG));
  }

  private isCaseViewRoute(route: ActivatedRouteSnapshot) {
    // this strategy to detect if route is the case view route is a bit fragile
    return !route.firstChild || !route.firstChild.url.length;
  }

  private getAndCacheCaseView(jid, ctid, cid): Observable<CaseView> {
    if (cid.startsWith(CaseResolver.DRAFT)) {
      return this.getAndCacheDraft(jid, ctid, cid);
    } else {
    return this.casesService
          .getCaseView(jid, ctid, cid)
          .do(caseView => this.cachedCaseView = caseView)
          .catch((error: Response | any) => this.checkAuthorizationError(error));
    }
  }

  private getAndCacheDraft(jid, ctid, cid): Observable<CaseView> {
    return this.draftService
      .getDraft(jid, ctid, cid)
      .do(caseView => this.cachedCaseView = caseView)
      .catch((error: Response | any) => this.checkAuthorizationError(error));
  }

  private checkAuthorizationError(error: any) {
    // TODO Should be logged to remote logging infrastructure
    console.error(error);
    if (error.status !== 401 && error.status !== 403) {
      this.router.navigate(['/error']);
    }
    return Observable.throw(error);
  }
}
