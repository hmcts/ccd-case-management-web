import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'ccd-browser-support',
  templateUrl: './ccd-browser-support.component.html',
  styleUrls: ['./ccd-browser-support.component.scss']
})
export class CcdBrowserSupportComponent implements OnInit {

  @Input()
  public isSolicitor: boolean;

  showUnsupportedBrowser: boolean;

  constructor(private appConfig: AppConfig) { }

  ngOnInit() {
    this.showUnsupportedBrowser = true;
  }

  getUnsupportedBrowserUrl(): string {
    return this.appConfig.getUnsupportedBrowserUrl();
  }

  hideUnsupportedBrowser() {
    this.showUnsupportedBrowser = false;
  }
}
