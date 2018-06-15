import { CaseHistory } from './case-history.model';
import { createCaseViewEvent } from './case-view-event.test.fixture';
import { createCaseTabArray } from './case-tab.test.fixture';

export let createCaseHistory = () => {
  const caseHistory = new CaseHistory();

  caseHistory.case_id = '1';
  caseHistory.case_type = {
    id: 'TestAddressBookCase',
    name: 'Test Address Book Case',
    jurisdiction: {
      id: 'TEST',
      name: 'Test',
    }
  };
  caseHistory.tabs = createCaseTabArray();
  caseHistory.event = createCaseViewEvent();

  return caseHistory;
};
