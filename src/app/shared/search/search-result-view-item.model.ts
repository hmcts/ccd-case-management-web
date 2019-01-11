import { CaseField } from '@hmcts/ccd-case-ui-toolkit';

export class SearchResultViewItem {
  case_id: string;
  case_fields: object;
  hydrated_case_fields?: CaseField[];
  columns?: object;
}
