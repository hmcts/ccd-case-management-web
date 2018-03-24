import { Orderable } from '../../../core/order/orderable.model';
import { FieldType } from './field-type.model';
import { WizardPageField } from '../wizard-page-field.model';

export class CaseField implements Orderable {
  id: string;
  label: string;
  order?: number;
  field_type: FieldType;
  value?: any;

  hint_text?: string;
  security_label?: string;
  display_context: string;
  show_condition?: string;
  show_summary_change_option?: boolean;
  wizardProps?: WizardPageField;
}
