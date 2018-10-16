import { FieldType } from '@hmcts/ccd-case-ui-toolkit';

export class SearchResultViewColumn {
  case_field_id: string;
  case_field_type: FieldType;
  label: string;
  order: number;
}
