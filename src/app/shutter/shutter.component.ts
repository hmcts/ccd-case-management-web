import { Component, Inject, AfterViewInit, OnInit } from '@angular/core';
import { AppConfig } from '../app.config';
import { DOCUMENT } from '@angular/common';

@Component({
  templateUrl: 'shutter.component.html'
})
export class ShutterComponent implements OnInit, AfterViewInit {

  redirectDelaySecs: number;

  constructor(@Inject(DOCUMENT) private document: Document,
              private appConfig: AppConfig) { }

  ngOnInit() {
    this.redirectDelaySecs = this.appConfig.getShutterRedirectDelay();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.document.location.href = this.appConfig.getShutterRedirectUrl();
    }, this.redirectDelaySecs * 1000);
  }

  getSmartSurveyUrl(): string {
    return this.appConfig.getSmartSurveyUrl();
  }

}
