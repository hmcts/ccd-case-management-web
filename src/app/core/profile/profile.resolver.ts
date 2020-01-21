import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile, ProfileService, JurisdictionService } from '@hmcts/ccd-case-ui-toolkit';
import { map } from 'rxjs/operators';

const SHUTTER_URL = 'shutter';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

  constructor(private profileService: ProfileService,
              private jurisdictionService: JurisdictionService,
              private router: Router) { }

  resolve(): Observable<Profile> {
    return this.profileService.get().flatMap(profile => {
      const jurisdictionIds = profile.jurisdictions.map(j => j.id);
      return this.jurisdictionService.getJurisdictionUIConfigs(jurisdictionIds).pipe(map(configs => {
        if (this.jurisdictionService.isShuttered(configs, jurisdictionIds.length)) {
          this.router.navigate([SHUTTER_URL]);
        }
        return profile;
      }));
    });
  }
}
