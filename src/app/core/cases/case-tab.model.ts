import { CaseField, Orderable } from '@hmcts/ccd-case-ui-toolkit';

export class CaseTab implements Orderable {
  id: string;
  label: string;
  order?: number;
  fields: CaseField[];
  show_condition?: string;
}
