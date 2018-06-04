import { Injectable } from '@angular/core';
import { CaseField } from '../../domain/definition/case-field.model';

@Injectable()
export class MoneyGBPCaseFieldBuilder {
    buildMoneyGBPCaseField(amount): CaseField {
        return {
          id: 'PaymentTotal',
          label: 'Total',
          field_type: {
            id: 'MoneyGBP',
            type: 'MoneyGBP'
          },
          display_context: 'READONLY',
          value: amount
        };
      }
}
