import { Component, OnDestroy, OnInit } from '@angular/core';
import { CaseView } from '../../core/cases/case-view.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CaseTab } from '../../core/cases/case-tab.model';
import { OrderService } from '../../core/order/order.service';
import { CaseViewTrigger } from '../../shared/domain/case-view/case-view-trigger.model';
import { Subject } from 'rxjs/Subject';
import { CallbackErrorsContext } from '../../shared/error/error-context';
import { CallbackErrorsComponent } from '../../shared/error/callback-errors.component';
import { Activity, DisplayMode } from '../../core/activity/activity.model';
import { ActivityPollingService } from '../../core/activity/activity.polling.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CaseField } from '../../shared/domain/definition/case-field.model';
import { ShowCondition } from '../../shared/conditional-show/conditional-show.model';
import { HttpError } from '../../core/http/http-error.model';
import { DraftService } from '../../core/draft/draft.service';
import { Draft } from '../../shared/domain/draft';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteOrCancelDialogComponent } from '../../shared/delete-or-cancel-dialog/delete-or-cancel-dialog.component';
import { AlertService } from '../../core/alert/alert.service';
import { CaseCreatorSubmitComponent } from '../creator/case-creator-submit.component';

@Component({
  templateUrl: './case-viewer.component.html',
  styleUrls: ['./case-viewer.scss']
})
export class CaseViewerComponent implements OnInit, OnDestroy {
  BANNER = DisplayMode.BANNER;

  caseDetails: CaseView;
  sortedTabs: CaseTab[];
  caseFields: CaseField[];
  error: any;
  triggerText: string = CallbackErrorsComponent.TRIGGER_TEXT_GO;
  ignoreWarning = false;
  subscription: Subscription;
  dialogConfig: MatDialogConfig;

  callbackErrorsSubject: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private activityPollingService: ActivityPollingService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private draftService: DraftService
  ) {}

  ngOnInit(): void {
    this.initDialog();

    this.caseDetails = this.route.snapshot.data.case;

    // Clone and sort tabs array
    this.sortedTabs = this.orderService.sort(this.caseDetails.tabs);

    this.caseFields = this.getTabFields();

    this.sortedTabs = this.sortTabFieldsAndFilterTabs(this.sortedTabs);

    this.subscription = this.postViewActivity().subscribe((_resolved) => {
      // console.log('Posted VIEW activity and result is: ' + JSON.stringify(resolved));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  postViewActivity(): Observable<Activity[]> {
    return this.activityPollingService.postViewActivity(this.caseDetails.case_id);
  }

  private sortTabFieldsAndFilterTabs(tabs: CaseTab[]): CaseTab[] {
    return tabs
      .map(tab => Object.assign({}, tab, { fields: this.orderService.sort(tab.fields) }))
      .filter(tab => new ShowCondition(tab.show_condition).matchByCaseFields(this.caseFields));
  }

  clearErrorsAndWarnings() {
    this.error = null;
    this.ignoreWarning = false;
    this.triggerText = CallbackErrorsComponent.TRIGGER_TEXT_GO;
  }

  applyTrigger(trigger: CaseViewTrigger): Promise<boolean | void> {
    this.error = null;

    let theQueryParams: Params = {};

    if (this.ignoreWarning) {
      theQueryParams['ignoreWarning'] = this.ignoreWarning;
    }

    // we may need to take care of different triggers in the future
    if (trigger.id === CaseViewTrigger.DELETE) {
      const dialogRef = this.dialog.open(DeleteOrCancelDialogComponent, this.dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'Delete') {
          this.draftService.deleteDraft(this.caseDetails.case_type.jurisdiction.id,
            this.caseDetails.case_type.id,
            this.caseDetails.case_id)
            .subscribe(_ => {
              return this.router.navigate(['list/case'])
                .then(() => {
                  this.alertService.setPreserveAlerts(true);
                  this.alertService.success(`The draft has been successfully deleted`);
                });
            }, _ => {
              return this.router.navigate(['list/case']);
            });
        }
      });
    } else if (this.isDraft() && trigger.id !== CaseViewTrigger.DELETE) {
      theQueryParams[Draft.DRAFT_QUERY_PARAM] = this.caseDetails.case_id;
      theQueryParams[CaseCreatorSubmitComponent.ORIGIN_QUERY_PARAM] = 'viewDraft';
      return this.router.navigate(
        ['create/case',
          this.caseDetails.case_type.jurisdiction.id,
          this.caseDetails.case_type.id,
          trigger.id], { queryParams: theQueryParams } ).catch(error => {
        this.handleError(error, trigger)
      });
    } else {
      return this.router.navigate(['trigger', trigger.id], {
        queryParams: theQueryParams,
        relativeTo: this.route
      }).catch(error => {
        this.handleError(error, trigger)
      });
    }
  }

  private initDialog() {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.ariaLabel = 'Label';
    this.dialogConfig.height = '245px';
    this.dialogConfig.width = '550px';
    this.dialogConfig.panelClass = 'dialog';

    this.dialogConfig.closeOnNavigation = false;
    this.dialogConfig.position = {
      top: window.innerHeight / 2 - 120 + 'px', left: window.innerWidth / 2 - 275 + 'px'
    }
  }

  callbackErrorsNotify(callbackErrorsContext: CallbackErrorsContext) {
    this.ignoreWarning = callbackErrorsContext.ignore_warning;
    this.triggerText = callbackErrorsContext.trigger_text;
  }

  private getTabFields(): CaseField[] {
    const caseDataFields = this.sortedTabs.reduce((acc, tab) => {
      return acc.concat(tab.fields);
    }, []);

    return caseDataFields.concat(this.caseDetails.metadataFields);
  }

  isDraft(): boolean {
    return Draft.isDraft(this.caseDetails.case_id);
  }

  private handleError(error: HttpError, trigger: CaseViewTrigger) {
    if (error.status !== 401 && error.status !== 403) {
      this.error = error;
      console.log('error during triggering event:', trigger.id);
      console.log(error);
      this.callbackErrorsSubject.next(this.error);
    }
  }
}
