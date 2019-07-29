import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AlertService, HttpError, NavigationNotifier, NavigationOrigin } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class NavigationListenerService {
  public static readonly CASE_CREATED_MSG = 'The case has been created successfully';

  callbackErrorsSubject: Subject<any> = new Subject();
  navigationSubscription: Subscription;

  constructor(
    private alertService: AlertService,
    private navigationNotifier: NavigationNotifier,
    private router: Router) {
  }

  public init() {
    this.navigationSubscription = this.navigationNotifier.navigation.subscribe(navigation => {
      switch (navigation.action) {
        case NavigationOrigin.DRAFT_DELETED:
          return this.router.navigate(['list/case'])
            .then(() => {
              this.alertService.setPreserveAlerts(true);
              this.alertService.success(`The draft has been successfully deleted`);
            });
        case NavigationOrigin.ERROR_DELETING_DRAFT:
          return this.router.navigate(['list/case']);
        case NavigationOrigin.DRAFT_RESUMED:
          return this.router.navigate(
            ['create/case',
              navigation.jid,
              navigation.ctid,
              navigation.etid], { queryParams: navigation.theQueryParams }).catch(error => {
            this.handleError(error, navigation.etid);
          });
        case NavigationOrigin.EVENT_TRIGGERED:
          return this.router.navigate(['trigger', navigation.etid], {
            queryParams: navigation.theQueryParams,
            relativeTo: navigation.relativeTo
          }).catch(error => {
            this.handleError(error, navigation.etid);
          });
        case NavigationOrigin.NO_READ_ACCESS_REDIRECTION:
          return this.router.navigate((['/list/case']));
      }
    });
  }

  private handleError(error: HttpError, triggerId: string) {
    if (error.status !== 401 && error.status !== 403) {
      error = error;
      console.log('error during triggering event:', triggerId);
      console.log(error);
      this.callbackErrorsSubject.next(error);
    }
  }
}
