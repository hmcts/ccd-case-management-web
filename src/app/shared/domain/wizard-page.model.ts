import { Orderable } from '../../core/order/orderable.model';
import { WizardPageField } from './wizard-page-field.model';
import { CaseField } from './definition/case-field.model';
import { ShowCondition } from '../conditional-show/conditional-show.model';
import { Type } from 'class-transformer';

export class WizardPage implements Orderable {

  id: string;
  label: string;
  order?: number;

  @Type(() => WizardPageField)
  wizard_page_fields: WizardPageField[];

  @Type(() => CaseField)
  case_fields: CaseField[];

  show_condition?: string;

  @Type(() => ShowCondition)
  parsedShowCondition: ShowCondition;

  getCol1Fields: () => CaseField[];
  getCol2Fields: () => CaseField[];
  isMultiColumn: () => Boolean;

}
