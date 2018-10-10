import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CaseViewTrigger } from '../domain/case-view/case-view-trigger.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../core/order/order.service';
import { AlertService } from '../../core/alert/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { HttpError } from '../../core/http/http-error.model';

@Component({
  selector: 'ccd-event-trigger',
  templateUrl: './event-trigger.html',
  styleUrls: ['./event-trigger.scss']
})
export class EventTriggerComponent implements OnInit, OnDestroy {

  @Input()
  triggers: CaseViewTrigger[];

  @Input()
  triggerText: string;

  @Input()
  callbackErrorsSubject: Subject<any> = new Subject();

  @Output()
  onTrigger = new EventEmitter<CaseViewTrigger>();

  error: HttpError;

  triggerForm: FormGroup;

  private changeSubscription: Subscription;

  constructor(private fb: FormBuilder, private orderService: OrderService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.triggers = this.orderService.sort(this.triggers);

    this.triggerForm = this.fb.group({
      'trigger': [this.getDefault(), Validators.required]
    });

    this.changeSubscription = this.triggerForm
      .valueChanges
      .subscribe(() => {
        this.resetErrors();
      });
    this.callbackErrorsSubject.subscribe(errorEvent => {
      this.error = errorEvent;
    });
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
    this.callbackErrorsSubject.unsubscribe();
  }

  isDisabled(): boolean {
    return !this.triggerForm.valid || this.hasErrors() || this.hasInvalidData();
  }

  private getDefault(): any {
    return this.triggers.length === 1 ? this.triggers[0] : '';
  }

  private resetErrors(): void {
    this.error = null;
    this.callbackErrorsSubject.next(null);
    this.alertService.clear();
  }

  private hasErrors(): boolean {
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

}
