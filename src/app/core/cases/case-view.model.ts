import { CaseTab } from './case-tab.model';
import { CaseViewEvent } from './case-view-event.model';
import { CaseViewTrigger } from '../../shared/domain/case-view/case-view-trigger.model';
import { CaseField } from '../../shared/domain/definition/case-field.model';

export class CaseView {
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
  state: {
    id: string,
    name: string,
    description?: string
    title_display?: string
  };
  channels: string[];
  tabs: CaseTab[];
  triggers: CaseViewTrigger[];
  events: CaseViewEvent[];
  metadataFields?: CaseField[];
}
