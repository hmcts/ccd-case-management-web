import { CaseField } from '../definition/case-field.model';
import { WizardPage } from '../wizard-page.model';
import { Type } from 'class-transformer';

export class CaseEventTrigger {

  id: string;
  name: string;
  description?: string;
  case_id?: string;

  @Type(() => CaseField)
  case_fields: CaseField[];

  event_token: string;

  @Type(() => WizardPage)
  wizard_pages: WizardPage[];

  show_summary?: boolean;
  show_event_notes?: boolean;
  end_button_label?: string;

  hasFields(): boolean {
    return this.case_fields !== undefined && this.case_fields.length !== 0;
  }

  hasPages(): boolean {
    return this.wizard_pages !== undefined && this.wizard_pages.length !== 0;
  }
}
