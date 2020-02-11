import { Component, Inject, AfterViewInit, OnInit } from '@angular/core';
import { AppConfig } from '../app.config';
import { DOCUMENT } from '@angular/common';
import { UrlTransformationService } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  templateUrl: 'shutter.component.html'
})
export class ShutterComponent implements OnInit, AfterViewInit {

  redirectWaitSecs: number;

  constructor(@Inject(DOCUMENT) private document: Document,
              private appConfig: AppConfig,
              private urlTransformationService: UrlTransformationService) { }

  ngOnInit() {
    this.redirectWaitSecs = this.appConfig.getShutterRedirectWait();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const redirectUrl = this.urlTransformationService.getPreferredEquivalentOf(this.appConfig.getShutterRedirectUrl());
      this.document.location.href = redirectUrl;
    }, this.redirectWaitSecs * 1000);
  }

  getSmartSurveyUrl(): string {
    return this.appConfig.getSmartSurveyUrl();
  }

}
