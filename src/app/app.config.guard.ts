import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AppConfig } from './app.config';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigGuard implements CanActivate {

  constructor(private appConfig: AppConfig) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.appConfig.load()
      .then(() => true);
  }

}
