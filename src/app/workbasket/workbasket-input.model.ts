import { Orderable } from '@hmcts/ccd-case-ui-toolkit';
import { Field } from '../core/search/field.model';

export class WorkbasketInputModel implements Orderable {
    constructor(
      public label: string,
      public order: number,
      public field: Field,
      public metadata?: boolean) {
    }
}
