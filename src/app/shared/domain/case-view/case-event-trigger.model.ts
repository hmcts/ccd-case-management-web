import { CaseField } from '../definition/case-field.model';
import { WizardPage } from '../wizard-page.model';

export class CaseEventTrigger {

  id: string;
  name: string;
  description?: string;
  case_id?: string;
  case_fields: CaseField[];
  event_token: string;
  wizard_pages: WizardPage[];
  show_summary?: boolean;
  show_event_notes?: boolean;
  end_button_label?: string;
}
