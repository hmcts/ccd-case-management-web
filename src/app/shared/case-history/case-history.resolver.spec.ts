import createSpyObj = jasmine.createSpyObj;
import { Observable } from 'rxjs';
import { CaseHistoryResolver } from './case-history.resolver';
import { CaseHistory } from '../../core/cases/case-history.model';

describe('CaseHistoryResolver', () => {
  describe('resolve()', () => {

    const PARAM_JURISDICTION_ID = CaseHistoryResolver.PARAM_JURISDICTION_ID;
    const PARAM_CASE_TYPE_ID = CaseHistoryResolver.PARAM_CASE_TYPE_ID;
    const PARAM_CASE_ID = CaseHistoryResolver.PARAM_CASE_ID;
    const PARAM_EVENT_ID = CaseHistoryResolver.PARAM_EVENT_ID;

    const JURISDICTION_ID = 'TEST';
    const CASE_TYPE_ID = 'TEST_CASE_TYPE';
    const CASE_ID = '42';
    const EVENT_ID = '100';
    const CASE_HISTORY: CaseHistory = createSpyObj<CaseHistory>('case', ['toString']);
    const CASE_OBS: Observable<CaseHistory> = Observable.of(CASE_HISTORY);

    let caseHistoryResolver: CaseHistoryResolver;

    let caseHistoryService: any;
    let route: any;
    let router: any;

    beforeEach(() => {
      caseHistoryService = createSpyObj('caseHistoryService', ['get']);

      router = createSpyObj('router', ['navigate']);
      caseHistoryResolver = new CaseHistoryResolver(caseHistoryService, router);

      route = {
        firstChild: {
          url: []
        },
        paramMap: createSpyObj('paramMap', ['get'])
      } ;
      route.paramMap.get.and.returnValues(JURISDICTION_ID, CASE_TYPE_ID, CASE_ID, EVENT_ID);
    });

    it('should resolve case history when the route is the one for case history view', () => {
      caseHistoryService.get.and.returnValue(CASE_OBS);

      caseHistoryResolver
        .resolve(route)
        .subscribe(caseData => {
          expect(caseData).toBe(CASE_HISTORY);
        });

      expect(caseHistoryService.get).toHaveBeenCalledWith(JURISDICTION_ID, CASE_TYPE_ID, CASE_ID, EVENT_ID);
      expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_JURISDICTION_ID);
      expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_CASE_TYPE_ID);
      expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_CASE_ID);
      expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_EVENT_ID);
    });

    it('should redirect to error page when case history cannot be retrieved', () => {
      caseHistoryService.get.and.returnValue(Observable.throw('Failed'));

      caseHistoryResolver
        .resolve(route)
        .subscribe(data => {
          expect(data).toBeFalsy();
        }, err => {
          expect(err).toBeTruthy();
        });

      expect(router.navigate).toHaveBeenCalledWith(['/error']);
    });
  });
});
