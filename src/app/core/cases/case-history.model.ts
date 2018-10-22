import { CaseTab } from './case-tab.model';
import { Type } from 'class-transformer';
import { CaseViewEvent, Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

export class CaseHistoryCaseType {
  id: string;
  name: string;
  description?: string;

  @Type(() => Jurisdiction)
  jurisdiction: Jurisdiction;
}

export class CaseHistory {
  case_id?: string;

  @Type(() => CaseHistoryCaseType)
  caseType: CaseHistoryCaseType;

  @Type(() => CaseTab)
  tabs: CaseTab[];

  @Type(() => CaseViewEvent)
  event: CaseViewEvent;
}
