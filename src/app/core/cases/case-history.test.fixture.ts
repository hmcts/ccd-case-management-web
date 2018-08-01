import { CaseHistory, CaseHistoryCaseType } from './case-history.model';
import { createCaseViewEvent } from './case-view-event.test.fixture';
import { createCaseTabArray } from './case-tab.test.fixture';
import { createJurisdiction } from '../../shared/domain/definition/jurisdiction.test.fixture';

export let createCaseHistory = () => {
  const caseHistory = new CaseHistory();
  const caseHistoryCaseType = new CaseHistoryCaseType();

  caseHistory.case_id = '1';

  caseHistoryCaseType.id = 'TestAddressBookCase';
  caseHistoryCaseType.name = 'Test Address Book Case';
  caseHistoryCaseType.jurisdiction = createJurisdiction();
  caseHistory.caseType = caseHistoryCaseType;

  caseHistory.tabs = createCaseTabArray();
  caseHistory.event = createCaseViewEvent();

  return caseHistory;
};
