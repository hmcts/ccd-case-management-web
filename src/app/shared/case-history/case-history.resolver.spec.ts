import createSpyObj = jasmine.createSpyObj;
import { Observable } from 'rxjs/Observable';
import { CaseHistoryResolver } from './case-history.resolver';
import { CaseHistoryView } from '../../core/cases/case-history-view.model';

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
    const CASE_HISTORY: CaseHistoryView = createSpyObj<CaseHistoryView>('case', ['toString']);
    const CASE_OBS: Observable<CaseHistoryView> = Observable.of(CASE_HISTORY);

    let caseHistoryResolver: CaseHistoryResolver;

    let casesService: any;
    let route: any;
    let router: any;

    beforeEach(() => {
      casesService = createSpyObj('casesService', ['getCaseHistoryView']);

      router = createSpyObj('router', ['navigate']);
      caseHistoryResolver = new CaseHistoryResolver(casesService, router);

      route = {
        firstChild: {
          url: []
        },
        paramMap: createSpyObj('paramMap', ['get'])
      } ;
      route.paramMap.get.and.returnValues(JURISDICTION_ID, CASE_TYPE_ID, CASE_ID, EVENT_ID);
    });

    it('should resolve case history when the route is the one for case history view', () => {
      casesService.getCaseHistoryView.and.returnValue(CASE_OBS);

      caseHistoryResolver
        .resolve(route)
        .subscribe(caseData => {
          expect(caseData).toBe(CASE_HISTORY);
        });

      expect(casesService.getCaseHistoryView).toHaveBeenCalledWith(JURISDICTION_ID, CASE_TYPE_ID, CASE_ID, EVENT_ID);
      expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_JURISDICTION_ID);
      expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_CASE_TYPE_ID);
      expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_CASE_ID);
      expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_EVENT_ID);
    });

    it('should redirect to error page when case history cannot be retrieved', () => {
      casesService.getCaseHistoryView.and.returnValue(Observable.throw('Failed'));

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
