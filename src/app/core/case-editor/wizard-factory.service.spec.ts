import { WizardFactoryService } from './wizard-factory.service';
import { CaseEventTrigger, WizardPage, createCaseEventTrigger } from '@hmcts/ccd-case-ui-toolkit';

describe('WizardFactoryService', () => {

  const PAGE_1: WizardPage = new WizardPage();
  PAGE_1.id = 'page1';
  const PAGE_2: WizardPage = new WizardPage();
  PAGE_2.id = 'page2';

  let eventTrigger: CaseEventTrigger;

  let wizardFactory: WizardFactoryService;

  beforeEach(() => {
    eventTrigger = createCaseEventTrigger(
      'editCase',
      'Edit case',
      'caseId',
      false,
      [],
      [ PAGE_1, PAGE_2 ],
    );

    wizardFactory = new WizardFactoryService();
  });

  it('should return an instance of wizard', () => {
    let wizard = wizardFactory.create(eventTrigger);

    expect(wizard).toBeTruthy();
    expect(wizard.getPage('page1', _ => true)).toBe(PAGE_1);
    expect(wizard.getPage('page2', _ => true)).toBe(PAGE_2);
  });
});
