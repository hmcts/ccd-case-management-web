import { ActivatedRouteSnapshot, ParamMap, Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import { CaseHistory } from '../../core/cases/case-history.model';
import { CaseHistoryService } from '../../core/cases/case-history.service';

@Injectable()
export class CaseHistoryResolver implements Resolve<CaseHistory> {

  public static readonly PARAM_JURISDICTION_ID = 'jid';
  public static readonly PARAM_CASE_TYPE_ID = 'ctid';
  public static readonly PARAM_CASE_ID = 'cid';
  public static readonly PARAM_EVENT_ID = 'eid';

  constructor(private caseHistoryService: CaseHistoryService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CaseHistory> {
    let {jid, ctid, cid, eid} = this.getParams(route.paramMap);
    return this.getCaseHistoryView(jid, ctid, cid, eid);
  }

  private getParams(pm: ParamMap) {
    const jid = pm.get(CaseHistoryResolver.PARAM_JURISDICTION_ID);
    const ctid = pm.get(CaseHistoryResolver.PARAM_CASE_TYPE_ID);
    const cid = pm.get(CaseHistoryResolver.PARAM_CASE_ID);
    const eid = pm.get(CaseHistoryResolver.PARAM_EVENT_ID);

    return {jid, ctid, cid, eid};
  }

  private getCaseHistoryView(jid, ctid, cid, eid): Observable<CaseHistory> {
    return this.caseHistoryService
      .get(jid, ctid, cid, eid)
      .catch((error: Response | any) => {
        console.error(error);
        if (error.status !== 401 && error.status !== 403) {
          this.router.navigate(['/error']);
        }
        return Observable.throw(error);
      });
  }
}
