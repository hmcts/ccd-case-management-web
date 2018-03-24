import { Orderable } from '../../core/order/orderable.model';
import { WizardPageField } from './wizard-page-field.model';
import { CaseField } from './definition/case-field.model';
import { ShowCondition } from '../conditional-show/conditional-show.model';

export class WizardPage implements Orderable {

  id: string;
  label: string;
  order?: number;
  wizard_page_fields: WizardPageField[];
  case_fields: CaseField[];
  show_condition?: string;
  parsedShowCondition: ShowCondition;

  getCol1Fields: () => CaseField[];
  getCol2Fields: () => CaseField[];
  isMultiColumn: () => Boolean;

}
