import { CaseView } from './case-view.model';
import { createCaseTabArray } from './case-tab.test.fixture';
import { CaseField } from '../../shared/domain/definition/case-field.model';
import { FieldType } from '../../shared/domain/definition/field-type.model';

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

  caseView.tabs = createCaseTabArray();

  const metadataField = new CaseField();
  metadataField.id = '[STATE]';
  metadataField.label = 'State';
  metadataField.display_context = 'READONLY';
  const fieldType = new FieldType();
  fieldType.id = 'Text';
  fieldType.type = 'Text';
  metadataField.field_type = fieldType;
  metadataField.order = 2;
  metadataField.value = 'State1';
  caseView.metadataFields = [metadataField];

  return caseView;
};
