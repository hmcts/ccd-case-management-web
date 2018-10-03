import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AppConfig } from './app.config';
import { Injectable } from '@angular/core';
import { AbstractAppConfig } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class AppConfigGuard implements CanActivate {

  constructor(private appConfig: AppConfig, private abstractAppConfig: AbstractAppConfig) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.appConfig.load()
      .then(() => {
        console.log('2appConfig', this.appConfig);
        console.log('2abstractAppConfig', this.abstractAppConfig);
        return true;
      });
  }

}
