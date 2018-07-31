import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ccd-browser-support',
  templateUrl: './ccd-browser-support.component.html',
  styleUrls: ['./ccd-browser-support.component.scss']
})
export class CcdBrowserSupportComponent implements OnInit {

  @Input()
  public isSolicitor: boolean;

  showUnsupportedBrowser: boolean;

  constructor(private appConfig: AppConfig,
              private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.showUnsupportedBrowser = true;
  }

  getUnsupportedBrowserUrl(): string {
    return this.appConfig.getUnsupportedBrowserUrl();
  }

  hideUnsupportedBrowser() {
    this.showUnsupportedBrowser = false;
  }

  isUnsupportedBrowser(): boolean {
    let browser = this.deviceService.getDeviceInfo().browser;
    let browser_full_version = this.deviceService.getDeviceInfo().browser_version;
    let browser_version = parseInt(browser_full_version.substring(0, browser_full_version.indexOf('.')), 10);

    switch (browser) {
      case 'chrome':
        return browser_version < this.appConfig.getChromeMinRequiredVersion();
      case 'ie':
        return browser_version < this.appConfig.getIEMinRequiredVersion();
      case 'firefox':
        return browser_version < this.appConfig.getFirefoxMinRequiredVersion();
      case 'ms-edge':
        return browser_version < this.appConfig.getEdgeMinRequiredVersion();
      default:
        return false;
    }
  }
}
