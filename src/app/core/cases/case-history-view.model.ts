import { CaseTab } from './case-tab.model';
import { CaseViewEvent } from './case-view-event.model';

export class CaseHistoryView {
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
  tabs: CaseTab[];
  event: CaseViewEvent;
}
