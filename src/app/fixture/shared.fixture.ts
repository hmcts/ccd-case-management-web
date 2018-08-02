import { CaseField } from '../shared/domain/definition/case-field.model';
import { CaseEventTrigger } from '../shared/domain/case-view/case-event-trigger.model';

export let createCaseEventTrigger = (id: string,
                                      name: string,
                                      case_id: string,
                                      show_summary: boolean,
                                      case_fields: CaseField[],
                                      wizard_pages = []) => {
  const eventTrigger = new CaseEventTrigger();

  eventTrigger.id = id;
  eventTrigger.name = name;
  eventTrigger.case_id = case_id;
  eventTrigger.show_summary = show_summary;
  eventTrigger.case_fields = [];
  eventTrigger.wizard_pages = [];
  eventTrigger.event_token = 'test-token';
  eventTrigger.case_fields = case_fields;
  eventTrigger.wizard_pages = wizard_pages;
  return eventTrigger;
};
