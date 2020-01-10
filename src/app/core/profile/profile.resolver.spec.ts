import { ProfileResolver } from './profile.resolver';
import createSpyObj = jasmine.createSpyObj;
import { Observable } from 'rxjs';
import { Profile, JurisdictionConfig, Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

describe('ProfileResolver', () => {
  describe('resolve()', () => {

    const PROFILE: Profile = createSpyObj<any>('profile', ['toString']);
    const JURISDICTION: Jurisdiction = createSpyObj<any>('jurisdiction', ['toString']);
    const JURISDICTION_CONFIG: JurisdictionConfig = createSpyObj<any>('jurisdictionConfig', ['toString']);

    const SHUTTER_URL = 'shut';

    let profileResolver: ProfileResolver;

    let profileService: any;
    let jurisdictionService: any;
    let router: any;

    let profile: Profile;
    let jurisdictionConfigs: JurisdictionConfig[];
    let profileObs: Observable<Profile>;
    let jurisdictionConfigsObs: Observable<JurisdictionConfig[]>;

    beforeEach(() => {
      profileService = createSpyObj('profileService', ['get']);
      jurisdictionService = createSpyObj('jurisdictionService', ['getJurisdictionConfigs']);
      router = createSpyObj('router', ['navigate']);

      profile = createProfile(createJurisdictions(['ref1']));
      profileObs = Observable.of(profile);
      jurisdictionConfigs = createJurisdictionConfigs([true]);
      jurisdictionConfigsObs = Observable.of(jurisdictionConfigs);

      profileResolver = new ProfileResolver(profileService, jurisdictionService, router);
    });

    it('should resolve profile using profile service', () => {
      profileService.get.and.returnValue(profileObs);
      jurisdictionService.getJurisdictionConfigs.and.returnValue(jurisdictionConfigsObs);

      profileResolver.resolve().subscribe((p) => {
        expect(p).toBe(profile);
      });

      expect(profileService.get).toHaveBeenCalled();
      expect(jurisdictionService.getJurisdictionConfigs).toHaveBeenCalled();
    });

    it('should redirect to shutter page when all jurisdictions are shut', () => {
      const configs = createJurisdictionConfigs([true, true, true]);

      profileService.get.and.returnValue(profileObs);
      jurisdictionService.getJurisdictionConfigs.and.returnValue(Observable.of(configs));

      profileResolver.resolve().subscribe();

      expect(router.navigate).toHaveBeenCalledWith([SHUTTER_URL]);
    });

    it('should not redirect to shutter page when at least one jurisdiction is open', () => {
      const configs = createJurisdictionConfigs([true, false, true]);

      profileService.get.and.returnValue(profileObs);
      jurisdictionService.getJurisdictionConfigs.and.returnValue(Observable.of(configs));

      profileResolver.resolve().subscribe();

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

    function createJurisdictionConfigs(shuttered: boolean[]): JurisdictionConfig[] {
      return shuttered.map(shut => ({ ...JURISDICTION_CONFIG, shuttered: shut }));
    }

  });
});
