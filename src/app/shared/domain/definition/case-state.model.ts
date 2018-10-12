import { Orderable } from '@hmcts/ccd-case-ui-toolkit';

export class CaseState implements Orderable {
  id: string;
  name: string;
  description: string;
  order?: number;
}
