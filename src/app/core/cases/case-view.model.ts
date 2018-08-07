import { CaseTab } from './case-tab.model';
import { CaseViewEvent } from './case-view-event.model';
import { CaseViewTrigger } from '../../shared/domain/case-view/case-view-trigger.model';
import { CaseField } from '../../shared/domain/definition/case-field.model';
import { Type } from 'class-transformer';

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

  @Type(() => CaseTab)
  tabs: CaseTab[];

  @Type(() => CaseViewTrigger)
  triggers: CaseViewTrigger[];

  @Type(() => CaseViewEvent)
  events: CaseViewEvent[];

  @Type(() => CaseField)
  metadataFields?: CaseField[];

  getCaseFields(): CaseField[] {
    const caseDataFields = this.tabs.reduce((acc, tab) => {
      return acc.concat(tab.fields);
    }, []);

    return caseDataFields.concat(this.metadataFields);
  }
}
