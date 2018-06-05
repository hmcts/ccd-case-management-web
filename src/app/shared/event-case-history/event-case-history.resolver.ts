import { CaseView } from '../../core/cases/case-view.model';
import { ActivatedRouteSnapshot, Resolve, Router, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CasesService } from '../../core/cases/cases.service';
import { Response } from '@angular/http';

import 'rxjs/add/operator/catch';

@Injectable()
export class EventCaseHistoryResolver implements Resolve<CaseView> {

  public static readonly PARAM_JURISDICTION_ID = 'jid';
  public static readonly PARAM_CASE_TYPE_ID = 'ctid';
  public static readonly PARAM_CASE_ID = 'cid';

  constructor(private casesService: CasesService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CaseView> {
    let {jid, ctid, cid} = this.getParams(route.paramMap);
    return this.getCaseView(jid, ctid, cid);
  }

  private getParams(pm: ParamMap) {
    const jid = pm.get(EventCaseHistoryResolver.PARAM_JURISDICTION_ID);
    const ctid = pm.get(EventCaseHistoryResolver.PARAM_CASE_TYPE_ID);
    const cid = pm.get(EventCaseHistoryResolver.PARAM_CASE_ID);

    return {jid, ctid, cid};
  }

  private getCaseView(jid, ctid, cid): Observable<CaseView> {
    return this.casesService
      .getCaseView(jid, ctid, cid)
      .catch((error: Response | any) => {
        // TODO Should be logged to remote logging infrastructure
        console.error(error);
        if (error.status !== 401 && error.status !== 403) {
          this.router.navigate(['/error']);
        }
        return Observable.throw(error);
      });
  }
}
