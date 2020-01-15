import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile, ProfileService, JurisdictionService, JurisdictionConfig } from '@hmcts/ccd-case-ui-toolkit';
import { map } from 'rxjs/operators';

const SHUTTER_URL = 'shut';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

  constructor(private profileService: ProfileService,
              private jurisdictionService: JurisdictionService,
              private router: Router) { }

  resolve(): Observable<Profile> {
    return this.profileService.get().flatMap(profile => {
      const jurisdictionIds = profile.jurisdictions.map(j => j.id);
      return this.jurisdictionService.getJurisdictionConfigs(jurisdictionIds).pipe(map(configs => {
        if (this.isShuttered(configs)) {
          this.router.navigate([SHUTTER_URL]);
        }
        return profile;
      }));
    });
  }

  isShuttered(configs: JurisdictionConfig[]): boolean {
    return false && !configs.some(c => !c.shuttered);
  }

}
