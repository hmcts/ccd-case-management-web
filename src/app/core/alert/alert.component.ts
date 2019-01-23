import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Alert, AlertService } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'ccd-alert',
  templateUrl: './alert.html'
})
export class AlertComponent implements OnInit, OnDestroy {

  alert: Alert;
  private alertSubscription: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService
      .alerts
      .subscribe(alert => this.alert = alert);
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }
}
