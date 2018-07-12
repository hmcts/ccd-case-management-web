import { CaseField } from '../domain/definition/case-field.model';

export class SearchResultViewItem {
  case_id: string;
  case_fields: object;
  hydrated_case_fields?: CaseField[]
}
