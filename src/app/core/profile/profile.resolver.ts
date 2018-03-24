import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Profile } from './profile.model';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

  constructor(private profileService: ProfileService) {}

  resolve(): Observable<Profile> | Promise<Profile> | Profile {
    return this.profileService.get();
  }

}
