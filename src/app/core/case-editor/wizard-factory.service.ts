import { Wizard } from '../../shared/case-editor/wizard.model';
import { CaseEventTrigger } from '@hmcts/ccd-case-ui-toolkit';

export class WizardFactoryService {
  create(eventTrigger: CaseEventTrigger): Wizard {
    return new Wizard(eventTrigger.wizard_pages);
  }
}
