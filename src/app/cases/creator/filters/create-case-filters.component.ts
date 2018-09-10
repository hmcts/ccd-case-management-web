import { Component, Input, OnInit } from '@angular/core';
import { Jurisdiction } from '../../../shared/domain/definition/jurisdiction.model';
import { CaseType } from '../../../shared/domain/definition/case-type.model';
import { FormControl, FormGroup } from '@angular/forms';
import { CaseEvent } from '../../../shared/domain/definition/case-event.model';
import { OrderService } from '../../../core/order/order.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { CallbackErrorsContext } from '../../../shared/error/error-context';
import { CallbackErrorsComponent } from '../../../shared/error/callback-errors.component';
import { HttpError } from '../../../core/http/http-error.model';
import { AlertService } from '../../../core/alert/alert.service';

@Component({
  selector: 'ccd-create-case-filters',
  templateUrl: './create-case-filters.html',
  styleUrls: ['./create-case-filters.scss']
})
export class CreateCaseFiltersComponent implements OnInit {

  @Input()
  jurisdictions: Jurisdiction[];

  @Input()
  formGroup: FormGroup = new FormGroup({});

  callbackErrorsSubject: Subject<any> = new Subject();

  selected: {
    jurisdiction?: Jurisdiction,
    caseType?: CaseType,
    event?: CaseEvent,
    formGroup?: FormGroup
  };

  selectedJurisdictionCaseTypes?: CaseType[];
  selectedCaseTypeEvents?: CaseEvent[];

  filterJurisdictionControl: FormControl;
  filterCaseTypeControl: FormControl;
  filterEventControl: FormControl;

  triggerText: string = CallbackErrorsComponent.TRIGGER_TEXT_START;
  ignoreWarning = false;
  error: HttpError;

  constructor(private router: Router,
              private orderService: OrderService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.selected = {};
    this.initControls();
    this.selectJurisdiction(this.jurisdictions, this.filterJurisdictionControl);
  }

  onJurisdictionIdChange(): void {
    this.resetCaseType();
    this.resetEvent();
    if (this.filterJurisdictionControl.value !== '') {
      this.formGroup.controls['caseType'].enable();
      this.selected.jurisdiction = this.findJurisdiction(this.jurisdictions, this.filterJurisdictionControl.value);
      this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes;
      this.selectCaseType(this.selectedJurisdictionCaseTypes, this.filterCaseTypeControl);
    }
  }

  onCaseTypeIdChange(): void {
    this.resetEvent();
    if (this.filterCaseTypeControl.value !== '') {
      this.selected.caseType = this.findCaseType(this.selectedJurisdictionCaseTypes, this.filterCaseTypeControl.value);
      this.formGroup.controls['event'].enable();
      this.selectedCaseTypeEvents = this.sortEvents(this.selected.caseType.events);
      this.selectEvent(this.selectedCaseTypeEvents, this.filterEventControl);
    }
  }

  onEventIdChange(): void {
    this.resetErrors();
    if (this.filterEventControl.value !== '') {
      this.selected.event = this.findEvent(this.selectedCaseTypeEvents, this.filterEventControl.value);
    } else {
      this.selected.event = null;
    }
  }

  isCreatable(): boolean {
    return !this.isEmpty(this.selected) &&
      !this.isEmpty(this.selected.jurisdiction) &&
      !this.isEmpty(this.selected.caseType) &&
      !this.isEmpty(this.selected.event) &&
      !this.hasCallbackErrors() &&
      !this.hasInvalidData();
  }

  apply(): Promise<boolean | void> {
    let queryParams = {};
    if (this.ignoreWarning) {
      queryParams['ignoreWarning'] = this.ignoreWarning;
    }
    return this.router.navigate(['/create/case', this.selected.jurisdiction.id, this.selected.caseType.id, this.selected.event.id], {
      queryParams
    }).catch(error => {
      this.error = error;
      this.callbackErrorsSubject.next(error);
    });
  }

  callbackErrorsNotify(errorContext: CallbackErrorsContext) {
    this.ignoreWarning = errorContext.ignore_warning;
    this.triggerText = errorContext.trigger_text;
  }

  private sortEvents(events: CaseEvent[]) {
    return this.orderService.sort(this.retainEventsWithNoPreStates(events));
  }

  private retainEventsWithNoPreStates(events: CaseEvent[]) {
    return events.filter(event => event.pre_states.length === 0);
  }

  private selectJurisdiction(jurisdictions: Jurisdiction[], filterJurisdictionControl: FormControl) {
    if (jurisdictions.length === 1) {
      filterJurisdictionControl.setValue(jurisdictions[0].id);
      this.onJurisdictionIdChange();
    }
  }

  private selectCaseType(caseTypes: CaseType[], filterCaseTypeControl: FormControl) {
    if (caseTypes.length === 1) {
      filterCaseTypeControl.setValue(caseTypes[0].id);
      this.onCaseTypeIdChange();
    }
  }

  private selectEvent(events: CaseEvent[], filterEventControl: FormControl) {
    if (events.length === 1) {
      filterEventControl.setValue(events[0].id);
      this.onEventIdChange();
    }
  }

  private findJurisdiction(jurisdictions: Jurisdiction[], id: string): Jurisdiction {
    return jurisdictions.find(j => j.id === id);
  }

  private findCaseType(caseTypes: CaseType[], id: string): CaseType {
    return caseTypes.find(caseType => caseType.id === id);
  }

  private findEvent(events: CaseEvent[], id: string): CaseEvent {
    return events.find(event => event.id === id);
  }

  private initControls(): void {
    this.filterJurisdictionControl = new FormControl('');
    this.formGroup.addControl('jurisdiction', this.filterJurisdictionControl);
    this.filterCaseTypeControl = new FormControl({ value: '', disabled: true });
    this.formGroup.addControl('caseType', this.filterCaseTypeControl);
    this.filterEventControl = new FormControl({ value: '', disabled: true });
    this.formGroup.addControl('event', this.filterEventControl);
  }

  private resetCaseType(): void {
    this.resetErrors();
    this.filterCaseTypeControl.setValue('');
    this.selected.caseType = null;
    this.selectedJurisdictionCaseTypes = [];
    this.formGroup.controls['caseType'].disable();
  }

  private resetEvent(): void {
    this.resetErrors();
    this.filterEventControl.setValue('');
    this.selected.event = null;
    this.selectedCaseTypeEvents = [];
    this.formGroup.controls['event'].disable();
  }

  private resetErrors(): void {
    this.error = null;
    this.callbackErrorsSubject.next(null);
    this.alertService.clear();
  }

  private hasCallbackErrors(): boolean {
    return this.error
      && this.error.callbackErrors
      && this.error.callbackErrors.length;
  }

  private hasInvalidData(): boolean {
    return this.error
      && this.error.details
      && this.error.details.field_errors
      && this.error.details.field_errors.length;
  }

  private isEmpty(value: any): boolean {
    return value === null || value === undefined;
  }

}
