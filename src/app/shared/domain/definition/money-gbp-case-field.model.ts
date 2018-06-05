import { Orderable } from '../../../core/order/orderable.model';
import { FieldType } from './field-type.model';
import { WizardPageField } from '../wizard-page-field.model';
import { CaseField } from './case-field.model';

export class MoneyGBPCaseField extends CaseField {

  constructor(amount) {
    super();
    this.id = 'PaymentTotal';
    this.label = 'Total';
    this.field_type = {
       id: 'MoneyGBP',
       type: 'MoneyGBP'
    };
    this.display_context = 'READONLY';
    this.value = amount;
  }
}
