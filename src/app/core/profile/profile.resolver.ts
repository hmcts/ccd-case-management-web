import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile, ProfileService } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

  constructor(private profileService: ProfileService) {}

  resolve(): Observable<Profile> {
    return this.profileService.get();
  }

}
