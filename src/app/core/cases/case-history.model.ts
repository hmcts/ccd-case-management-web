import { CaseTab } from './case-tab.model';
import { CaseViewEvent } from './case-view-event.model';
import { Type } from 'class-transformer';
import { Jurisdiction } from '../../shared/domain/definition/jurisdiction.model';

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
