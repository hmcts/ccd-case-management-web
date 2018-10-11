import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { plainToClass } from 'class-transformer';
import { HttpService } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class ProfileService {

  private static readonly URL = '/caseworkers/:uid/profile';

  constructor(private httpService: HttpService, private appConfig: AppConfig) {}

  get(): Observable<Profile> {
    let url = this.appConfig.getCaseDataUrl() + ProfileService.URL;

    return this.httpService
      .get(url)
      .map((response: Response) => response.json())
      .map((p: Object) => plainToClass(Profile, p));
  }

}
