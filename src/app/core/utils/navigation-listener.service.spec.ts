import { NavigationListenerService } from './navigation-listener.service';
import { AlertService, NavigationNotifierService, NavigationOrigin } from '@hmcts/ccd-case-ui-toolkit';
import { Router } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;

describe('NavigationListenerService', () => {

  let navigationListenerService: NavigationListenerService;
  let alertService: AlertService;
  let navigationNotifier: NavigationNotifierService;
  let mockRouter: any;

  beforeEach(() => {
    alertService = jasmine.createSpyObj<AlertService>('alertService', ['setPreserveAlerts', 'success']);
    mockRouter = createSpyObj<Router>('router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));
    navigationNotifier = new NavigationNotifierService();
    navigationListenerService = new NavigationListenerService(alertService, navigationNotifier, mockRouter);
  });

  it('test DRAFT_DELETED navigation subscription', () => {
    let DRAFT_DELETED = NavigationOrigin.DRAFT_DELETED;
    navigationNotifier.announceNavigation({ action: DRAFT_DELETED });
    navigationListenerService.init();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['list/case']);
  });

  it('test ERROR_DELETING_DRAFT navigation subscription', () => {
    let ERROR_DELETING_DRAFT = NavigationOrigin.ERROR_DELETING_DRAFT;
    navigationNotifier.announceNavigation({ action: ERROR_DELETING_DRAFT });
    navigationListenerService.init();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['list/case']);
  });

  it('test NO_READ_ACCESS_REDIRECTION navigation subscription', () => {
    let NO_READ_ACCESS_REDIRECTION = NavigationOrigin.NO_READ_ACCESS_REDIRECTION;
    navigationNotifier.announceNavigation({ action: NO_READ_ACCESS_REDIRECTION });
    navigationListenerService.init();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list/case']);
  });

  it('test DRAFT_RESUMED navigation subscription', () => {

    let DRAFT_RESUMED = NavigationOrigin.DRAFT_RESUMED;
    let navParam = { action: DRAFT_RESUMED, jid: 'j001', ctid: 'c001', etid: 'e001', theQueryParams: 'id=1001' };
    navigationNotifier.announceNavigation(navParam);
    navigationListenerService.init();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['create/case',
      navParam.jid,
      navParam.ctid,
      navParam.etid], { queryParams: navParam.theQueryParams });
  });

  it('test EVENT_TRIGGERED navigation subscription', () => {
    let EVENT_TRIGGERED = NavigationOrigin.EVENT_TRIGGERED;
    let navParam = { action: EVENT_TRIGGERED, relativeTo: 'relativeTo', etid: 'e001', theQueryParams: 'id=1001' };
    navigationNotifier.announceNavigation(navParam);
    navigationListenerService.init();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['trigger',
      navParam.etid], { queryParams: navParam.theQueryParams, relativeTo: navParam.relativeTo });
  });
});
