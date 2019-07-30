import {NavigationListenerService} from "./navigation-listener.service";
import {AlertService, NavigationNotifier, NavigationOrigin} from "@hmcts/ccd-case-ui-toolkit";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

fdescribe('NavigationListenerService', () => {

  let navigationListenerService:  NavigationListenerService;
  let alertService: AlertService;
  let navigationNotifier: NavigationNotifier;
  let router: Router;

  beforeEach(() => {
    alertService = jasmine.createSpyObj<AlertService>('alertService', ['success']);
    router = jasmine.createSpyObj<Router>('router', ['navigate']);
    navigationNotifier = new NavigationNotifier();
    activityService.verifyUserIsAuthorized.and.returnValue(true);
    navigationListenerService = new NavigationListenerService(alertService, navigationNotifier,router);
  });

  it('test DRAFT_DELETED navigation subscription', () => {
    let DRAFT_DELETED = NavigationOrigin.DRAFT_DELETED;
    navigationNotifier.announceNavigation({ action: DRAFT_DELETED})
    navigationListenerService.init();

  });

});
