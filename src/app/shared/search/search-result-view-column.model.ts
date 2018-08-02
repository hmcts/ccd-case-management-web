import { FieldType } from '../domain/definition/field-type.model';

export class SearchResultViewColumn {
  case_field_id: string;
  case_field_type: FieldType;
  label: string;
  order: number;
}
