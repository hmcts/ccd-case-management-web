import { FieldType } from '../../shared/domain/definition/field-type.model';

export class Field {
    constructor(
      public id: string,
      public field_type: FieldType,
      public label?: string,
      public metadata?: boolean
    ) { }
}
