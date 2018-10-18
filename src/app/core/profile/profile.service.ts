import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../app.config';
import { plainToClass } from 'class-transformer';
import { HttpService, Profile } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class ProfileService {

  private static readonly URL = '/caseworkers/:uid/profile';

  constructor(private httpService: HttpService, private appConfig: AppConfig) {}

  get(): Observable<Profile> {
    let url = this.appConfig.getCaseDataUrl() + ProfileService.URL;

    return this.httpService
      .get(url)
      .pipe(
        map((response: Response) => response.json()),
        map((p: Object) => plainToClass(Profile, p))
      )
  }

}
