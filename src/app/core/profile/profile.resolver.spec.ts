import { ProfileResolver } from './profile.resolver';
import createSpyObj = jasmine.createSpyObj;
import { Observable } from 'rxjs';
import { Profile, JurisdictionUIConfig, Jurisdiction, ProfileService, JurisdictionService } from '@hmcts/ccd-case-ui-toolkit';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('ProfileResolver', () => {
  const JURISDICTION: Jurisdiction = createSpyObj<any>('jurisdiction', ['toString']);
  const JURISDICTION_CONFIG: JurisdictionUIConfig = createSpyObj<any>('jurisdictionConfig', ['toString']);

  describe('resolve()', () => {

    const PROFILE: Profile = createSpyObj<any>('profile', ['toString']);
    const SHUTTER_URL = 'shutter';

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

      TestBed.configureTestingModule({
        providers: [ProfileResolver,
          { provide: ProfileService, useValue: profileService },
          { provide: JurisdictionService, useValue: jurisdictionService },
          { provide: Router, useValue: router }
        ]
      });

      function createProfile(jurisdictions: Jurisdiction[]): Profile {
        return {
          ...PROFILE,
          jurisdictions,
          isSolicitor: () => (true),
          isCourtAdmin: () => (true)
        };
      }
    });

    it('should create profile resolver', inject([ProfileResolver],
      (resolver: ProfileResolver) => {
        expect(resolver).toBeTruthy();
      }));

    it('should resolve profile using profile service', inject([ProfileResolver],
      (resolver: ProfileResolver) => {
        profileService.get.and.returnValue(profileObs);
        jurisdictionService.getJurisdictionUIConfigs.and.returnValue(jurisdictionConfigsObs);

        resolver.resolve().subscribe((p) => {
          expect(p).toBe(profile);
        });
        expect(profileService.get).toHaveBeenCalled();
        expect(jurisdictionService.getJurisdictionUIConfigs).toHaveBeenCalled();
      }));

    it('should redirect to shutter page when all jurisdictions are shut', inject([ProfileResolver],
      (resolver: ProfileResolver) => {
        jurisdictionService.isShuttered.and.returnValue(true);
        const configs = createJurisdictionUIConfigs([true, true, true]);

        profileService.get.and.returnValue(profileObs);
        jurisdictionService.getJurisdictionUIConfigs.and.returnValue(Observable.of(configs));

        resolver.resolve().subscribe();

        expect(jurisdictionService.isShuttered).toHaveBeenCalledWith(configs, 1);
        expect(router.navigate).toHaveBeenCalledWith([SHUTTER_URL]);
      }));

    it('should not redirect to shutter page when at least one jurisdiction is open', inject([ProfileResolver],
      (resolver: ProfileResolver) => {
        jurisdictionService.isShuttered.and.returnValue(false);
        const configs = createJurisdictionUIConfigs([true, false, true]);

        profileService.get.and.returnValue(profileObs);
        jurisdictionService.getJurisdictionUIConfigs.and.returnValue(Observable.of(configs));

        resolver.resolve().subscribe();

        expect(jurisdictionService.isShuttered).toHaveBeenCalledWith(configs, 1);
        expect(router.navigate).not.toHaveBeenCalled();
      }));
  });

  function createJurisdictions(refs: string[]): Jurisdiction[] {
    return refs.map(ref => ({ ...JURISDICTION, id: ref }));
  }

  function createJurisdictionUIConfigs(shuttered: boolean[]): JurisdictionUIConfig[] {
    return shuttered.map(shut => ({ ...JURISDICTION_CONFIG, shuttered: shut }));
  }
});
