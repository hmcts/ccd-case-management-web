import { ProfileResolver } from './profile.resolver';
import createSpyObj = jasmine.createSpyObj;
import { Observable } from 'rxjs';
import { Profile } from '@hmcts/ccd-case-ui-toolkit';

describe('ProfileResolver', () => {
  describe('resolve()', () => {

    const PROFILE: Profile = createSpyObj<Profile>('profile', ['toString']);
    const PROFILE_OBS: Observable<Profile> = Observable.of(PROFILE);

    let profileResolver: ProfileResolver;

    let profileService: any;

    beforeEach(() => {
      profileService = createSpyObj('profileService', ['get']);

      profileResolver = new ProfileResolver(profileService);
    });

    it('should resolve profile using profile service', () => {
      profileService.get.and.returnValue(PROFILE_OBS);

      let resolved = profileResolver.resolve();

      expect(profileService.get).toHaveBeenCalled();
      expect(resolved).toBe(PROFILE_OBS);
    });
  });
});
