import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationNotifier, AlertService, HttpError, NavOrigins } from '@hmcts/ccd-case-ui-toolkit';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
    templateUrl: 'case-viewer-consumer.component.html'
  })
export class CaseViewerConsumerComponent implements OnInit, OnDestroy {

    public static readonly CASE_CREATED_MSG = 'The case has been created successfully';

    callbackErrorsSubject: Subject<any> = new Subject();
    navigationSubscription: Subscription;

    constructor(
        private alertService: AlertService,
        private navigationNotifier: NavigationNotifier,
        private router: Router) {}

    ngOnInit() {
        this.navigationSubscription = this.navigationNotifier.navigation.subscribe(navigation => {
            console.log('navigation=', navigation);
            switch (navigation.action) {
                case NavOrigins.DRAFT_DELETED:
                    return this.router.navigate(['list/case'])
                        .then(() => {
                            this.alertService.setPreserveAlerts(true);
                            this.alertService.success(`The draft has been successfully deleted`);
                        });
                case NavOrigins.ERROR_DELETING_DRAFT:
                    return this.router.navigate(['list/case']);
                case NavOrigins.DRAFT_RESUMED:
                    return this.router.navigate(
                        ['create/case',
                            navigation.jid,
                            navigation.ctid,
                            navigation.etid], { queryParams: navigation.theQueryParams } ).catch(error => {
                        this.handleError(error, navigation.etid)
                        });
                case NavOrigins.EVENT_TRIGGERED:
                    return this.router.navigate(['trigger', navigation.etid], {
                        queryParams: navigation.theQueryParams,
                        relativeTo: navigation.relativeTo
                    }).catch(error => {
                        this.handleError(error, navigation.etid)
                    });
            }
        });
    }

    ngOnDestroy() {
        console.log('destroy');
        this.navigationSubscription.unsubscribe();
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
