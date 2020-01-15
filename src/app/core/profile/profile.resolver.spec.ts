import { ProfileResolver } from './profile.resolver';
import createSpyObj = jasmine.createSpyObj;
import { Observable } from 'rxjs';
import { Profile, JurisdictionUIConfig, Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

describe('ProfileResolver', () => {
  describe('resolve()', () => {

    const PROFILE: Profile = createSpyObj<any>('profile', ['toString']);
    const JURISDICTION: Jurisdiction = createSpyObj<any>('jurisdiction', ['toString']);
    const JURISDICTION_CONFIG: JurisdictionUIConfig = createSpyObj<any>('jurisdictionConfig', ['toString']);

    const SHUTTER_URL = 'shutter';

    let profileResolver: ProfileResolver;

    let profileService: any;
    let jurisdictionService: any;
    let router: any;

    let profile: Profile;
    let jurisdictionConfigs: JurisdictionUIConfig[];
    let profileObs: Observable<Profile>;
    let jurisdictionConfigsObs: Observable<JurisdictionUIConfig[]>;
    beforeEach(() => {
      profileService = createSpyObj('profileService', ['get']);
      jurisdictionService = createSpyObj('jurisdictionService', ['getJurisdictionUIConfigs', 'isShuttered']);
      router = createSpyObj('router', ['navigate']);

      profile = createProfile(createJurisdictions(['ref1']));
      profileObs = Observable.of(profile);
      jurisdictionConfigs = createJurisdictionUIConfigs([true]);
      jurisdictionConfigsObs = Observable.of(jurisdictionConfigs);

      profileResolver = new ProfileResolver(profileService, jurisdictionService, router);


    beforeEach(() => {
      profileService = createSpyObj('profileService', ['get']);
    
      profileResolver = new ProfileResolver(profileService, jurisdictionService, router);
    });

    it('should resolve profile using profile service', () => {
      profileService.get.and.returnValue(profileObs);
      jurisdictionService.getJurisdictionUIConfigs.and.returnValue(jurisdictionConfigsObs);

      profileResolver.resolve().subscribe((p) => {
        expect(p).toBe(profile);
      });

      expect(profileService.get).toHaveBeenCalled();
      expect(jurisdictionService.getJurisdictionUIConfigs).toHaveBeenCalled();
    });

    it('should redirect to shutter page when all jurisdictions are shut', () => {
      jurisdictionService.isShuttered.and.returnValue(true);
      const configs = createJurisdictionUIConfigs([true, true, true]);

      profileService.get.and.returnValue(profileObs);
      jurisdictionService.getJurisdictionUIConfigs.and.returnValue(Observable.of(configs));

      profileResolver.resolve().subscribe();

      expect(jurisdictionService.isShuttered).toHaveBeenCalledWith(configs, 1);
      expect(router.navigate).toHaveBeenCalledWith([SHUTTER_URL]);
    });

    it('should not redirect to shutter page when at least one jurisdiction is open', () => {
      jurisdictionService.isShuttered.and.returnValue(false);
      const configs = createJurisdictionUIConfigs([true, false, true]);

      profileService.get.and.returnValue(profileObs);
      jurisdictionService.getJurisdictionUIConfigs.and.returnValue(Observable.of(configs));

      profileResolver.resolve().subscribe();

      expect(jurisdictionService.isShuttered).toHaveBeenCalledWith(configs, 1);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    function createProfile(jurisdictions: Jurisdiction[]): Profile {
      return {
        ...PROFILE,
        jurisdictions,
        isSolicitor: () => (true),
        isCourtAdmin: () => (true)
      };
    }

    function createJurisdictions(refs: string[]): Jurisdiction[] {
      return refs.map(ref => ({ ...JURISDICTION, id: ref }));
    }

    function createJurisdictionUIConfigs(shuttered: boolean[]): JurisdictionUIConfig[] {
      return shuttered.map(shut => ({ ...JURISDICTION_CONFIG, shuttered: shut }));
    }

  });
})
});
