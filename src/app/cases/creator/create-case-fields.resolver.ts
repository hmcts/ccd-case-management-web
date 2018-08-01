import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CaseEventTrigger } from '../../shared/domain/case-view/case-event-trigger.model';
import { AlertService } from '../../core/alert/alert.service';
import { HttpError } from '../../core/http/http-error.model';
import { CasesService } from '../../core/cases/cases.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class CreateCaseFieldsResolver implements Resolve<CaseEventTrigger> {

  public static readonly PARAM_JURISDICTION_ID = 'jid';
  public static readonly PARAM_CASE_TYPE_ID = 'ctid';
  public static readonly PARAM_EVENT_ID = 'eid';
  public static readonly QUERY_PARAM_IGNORE_WARNING = 'ignoreWarning';
  private static readonly IGNORE_WARNING_VALUES = [ 'true', 'false' ];

  private cachedEventTrigger: CaseEventTrigger;

  constructor(
    private casesService: CasesService,
    private alertService: AlertService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CaseEventTrigger> {
    return this.isRootCreateRoute(route) ? this.getAndCacheEventTrigger(route)
    : this.cachedEventTrigger ? Observable.of(this.cachedEventTrigger)
    : this.getAndCacheEventTrigger(route);
  }

  private isRootCreateRoute(route: ActivatedRouteSnapshot) {
    // if route is ':jid/:ctid/:eid'
    return !route.firstChild || !route.firstChild.url.length;
  }

  getAndCacheEventTrigger(route: ActivatedRouteSnapshot): Observable<CaseEventTrigger> {
    let jurisdictionId = route.paramMap.get(CreateCaseFieldsResolver.PARAM_JURISDICTION_ID);
    let caseTypeId = route.paramMap.get(CreateCaseFieldsResolver.PARAM_CASE_TYPE_ID);
    let eventTriggerId = route.paramMap.get(CreateCaseFieldsResolver.PARAM_EVENT_ID);
    let ignoreWarning = route.queryParamMap.get(CreateCaseFieldsResolver.QUERY_PARAM_IGNORE_WARNING);

    if (-1 === CreateCaseFieldsResolver.IGNORE_WARNING_VALUES.indexOf(ignoreWarning)) {
      ignoreWarning = 'false';
    }

    return this.casesService
      .getEventTrigger(jurisdictionId, caseTypeId, eventTriggerId, undefined, ignoreWarning)
      .do(eventTrigger => this.cachedEventTrigger = eventTrigger)
      .catch((error: HttpError) => {
        this.alertService.error(error.message);

        return Observable.throw(error);
      });
  }

}
