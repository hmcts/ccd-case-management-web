import { CaseTab } from './case-tab.model';
import { CaseViewEvent } from './case-view-event.model';
import { Type } from 'class-transformer';

export class CaseHistory {
  case_id?: string;
  case_type: {
    id: string,
    name: string,
    description?: string,
    jurisdiction: {
      id: string,
      name: string,
      description?: string
    }
  };

  @Type(() => CaseTab)
  tabs: CaseTab[];

  @Type(() => CaseViewEvent)
  event: CaseViewEvent;
}
