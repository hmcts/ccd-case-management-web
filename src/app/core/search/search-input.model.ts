import { Field } from './field.model';
import { Orderable } from '@hmcts/ccd-case-ui-toolkit';

export class SearchInput implements Orderable {
    constructor(
      public label: string,
      public order: number,
      public field: Field,
      public metadata?: boolean) {
    }
}
