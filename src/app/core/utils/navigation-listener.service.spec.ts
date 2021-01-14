import { NavigationListenerService } from './navigation-listener.service';
import { AlertService, NavigationNotifierService, NavigationOrigin, ErrorNotifierService } from '@hmcts/ccd-case-ui-toolkit';
import { Router } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;

describe('NavigationListenerService', () => {

  let navigationListenerService: NavigationListenerService;
  let mockAlertService: any;
  let navigationNotifierService: NavigationNotifierService;
  let errorNotifierService: ErrorNotifierService;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = createSpyObj<Router>('router', ['navigate']);
    mockAlertService = jasmine.createSpyObj<AlertService>('mockAlertService', ['setPreserveAlerts', 'success']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));
    errorNotifierService = createSpyObj<any>('errorNotifierService', ['announceError']);
    navigationNotifierService = new NavigationNotifierService();
    navigationListenerService = new NavigationListenerService(mockAlertService, errorNotifierService, navigationNotifierService,
      mockRouter);
    navigationListenerService.init();
  });

  it('test DRAFT_DELETED navigation subscription', () => {
    mockRouter.navigate.and.returnValue(Promise.resolve());
    let navigationResult = Promise.resolve('someResult');
    navigationNotifierService.announceNavigation({ action: NavigationOrigin.DRAFT_DELETED });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['list/case']);
    navigationResult.then(() => {
      expect(mockAlertService.setPreserveAlerts).toHaveBeenCalledWith(true);
      expect(mockAlertService.success).toHaveBeenCalledWith(NavigationListenerService.DRAFT_DELETED_MSG);
    });
  });

  it('test ERROR_DELETING_DRAFT navigation subscription', () => {
    let ERROR_DELETING_DRAFT = NavigationOrigin.ERROR_DELETING_DRAFT;
    navigationNotifierService.announceNavigation({ action: ERROR_DELETING_DRAFT });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['list/case']);
  });

  it('test DRAFT_RESUMED navigation subscription', () => {
    let navParam = {
      action: NavigationOrigin.DRAFT_RESUMED,
      jid: 'j001', ctid: 'c001', etid: 'e001', queryParams: 'id=1001'
    };
    navigationNotifierService.announceNavigation(navParam);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['create/case',
      navParam.jid,
      navParam.ctid,
      navParam.etid], { queryParams: navParam.queryParams });
  });

  it('test error on DRAFT_RESUMED navigation subscription', () => {
    const VALID_ERROR = {
      callbackErrors: ['error1', 'error2'],
      callbackWarnings: ['warning1', 'warning2']
    };
    let navParam = {
      action: NavigationOrigin.DRAFT_RESUMED
      , jid: 'j001', ctid: 'c001', etid: 'e001', queryParams: 'id=1001'
    };
    mockRouter.navigate.and.returnValue({ catch: (error) => error(VALID_ERROR) });
    navigationNotifierService.announceNavigation(navParam);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['create/case',
      navParam.jid,
      navParam.ctid,
      navParam.etid], { queryParams: navParam.queryParams });
    expect(errorNotifierService.announceError).toHaveBeenCalledWith(VALID_ERROR);
  });

  it('test EVENT_TRIGGERED navigation subscription', () => {
    let navParam = {
      action: NavigationOrigin.EVENT_TRIGGERED,
      relativeTo: 'relativeTo', etid: 'e001', queryParams: 'id=1001'
    };
    navigationNotifierService.announceNavigation(navParam);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['trigger',
      navParam.etid], { queryParams: navParam.queryParams, relativeTo: navParam.relativeTo });
  });

  it('test error on EVENT_TRIGGERED navigation subscription', () => {
    const VALID_ERROR = {
      callbackErrors: ['error1', 'error2'],
      callbackWarnings: ['warning1', 'warning2']
    };
    let navParam = {
      action: NavigationOrigin.EVENT_TRIGGERED,
      relativeTo: 'relativeTo', etid: 'e001', queryParams: 'id=1001'
    };
    mockRouter.navigate.and.returnValue({ catch: (error) => error(VALID_ERROR) });
    navigationNotifierService.announceNavigation(navParam);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['trigger',
      navParam.etid], { queryParams: navParam.queryParams, relativeTo: navParam.relativeTo });
    expect(errorNotifierService.announceError).toHaveBeenCalledWith(VALID_ERROR);
  });

  it('test NO_READ_ACCESS_REDIRECTION navigation subscription', () => {
    mockRouter.navigate.and.returnValue(Promise.resolve());
    let navigationResult = Promise.resolve('someResult');
    navigationNotifierService.announceNavigation({ action: NavigationOrigin.NO_READ_ACCESS_REDIRECTION });
    navigationListenerService.init();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list/case']);
    navigationResult.then(() => {
      expect(mockAlertService.success).toHaveBeenCalledWith(NavigationListenerService.CASE_CREATED_MSG);
    });
  });
});
