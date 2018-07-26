import { CaseView } from './case-view.model';

export let createCaseView = () => {
  const caseView = new CaseView();
  caseView.case_id = '1234567890123456';
  caseView.case_type = {
    id: 'TestAddressBookCase',
    name: 'Test Address Book Case',
    jurisdiction: {
      id: 'TEST',
      name: 'Test',
    }
  };
  caseView.state = {
    id: 'CaseCreated',
    name: 'Case created'
  };

  return caseView;
};
