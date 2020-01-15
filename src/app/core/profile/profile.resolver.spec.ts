import { ProfileResolver } from './profile.resolver';
import createSpyObj = jasmine.createSpyObj;
import { Observable } from 'rxjs';
import { Profile, AbstractAppConfig, HttpService, JurisdictionService } from '@hmcts/ccd-case-ui-toolkit';
import { Router } from '@angular/router';

describe('ProfileResolver', () => {
  describe('resolve()', () => {

    const PROFILE: Profile = createSpyObj<any>('profile', ['toString']);
    const PROFILE_OBS: Observable<Profile> = Observable.of(PROFILE);

    let profileResolver: ProfileResolver;

    let profileService: any;
    let mockJurisdictionService: JurisdictionService;
    let mockRouter: any;

    beforeEach(() => {
      profileService = createSpyObj('profileService', ['get']);
      mockRouter = createSpyObj<Router>('router', ['navigate']);
      mockJurisdictionService = createSpyObj<any>('jurisdictionService', ['getJurisdictionConfigs']);

      profileResolver = new ProfileResolver(profileService, mockJurisdictionService, mockRouter);
    });

    it('should resolve profile using profile service', () => {
      profileService.get.and.returnValue(PROFILE_OBS);

      let resolved = profileResolver.resolve();

      expect(profileService.get).toHaveBeenCalled();
      expect(resolved).toBe(PROFILE_OBS);
    });
  });
});
