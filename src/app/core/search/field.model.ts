import { FieldType } from '@hmcts/ccd-case-ui-toolkit';

export class Field {
    constructor(
      public id: string,
      public field_type: FieldType,
      public label?: string,
      public metadata?: boolean
    ) { }
}
