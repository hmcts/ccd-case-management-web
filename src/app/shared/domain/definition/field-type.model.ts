import { FixedListItem } from './fixed-list-item.model';
import { FieldTypeEnum } from './field-type-enum.model';
import { CaseField } from './case-field.model';

export class FieldType {
  id: string;
  type: FieldTypeEnum;
  min?: number;
  max?: number;
  regular_expression?: string;
  fixed_list_items?: FixedListItem[];
  complex_fields?: CaseField[];
  collection_field_type?: FieldType;
}
