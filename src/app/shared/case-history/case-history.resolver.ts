import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import { CaseHistory } from '../../core/cases/case-history.model';
import { CaseHistoryService } from '../../core/cases/case-history.service';
import { CaseView } from '../../core/cases/case-view.model';

@Injectable()
export class CaseHistoryResolver implements Resolve<CaseHistory> {
  public static readonly PARAM_EVENT_ID = 'eid';

  constructor(private caseHistoryService: CaseHistoryService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CaseHistory> {
    let caseView: CaseView = route.parent.data.case;
    let jurisdictionId = caseView.case_type.jurisdiction.id;
    let caseTypeId = caseView.case_type.id;
    let caseId = caseView.case_id;
    let triggerId = route.paramMap.get(CaseHistoryResolver.PARAM_EVENT_ID);
    return this.getCaseHistoryView(jurisdictionId, caseTypeId, caseId, triggerId);
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
