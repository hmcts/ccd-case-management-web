import { Component, Input } from '@angular/core';
import { CaseEventTrigger } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'ccd-event-trigger-header',
  templateUrl: './event-trigger-header.html'
})
export class EventTriggerHeaderComponent {

  @Input()
  eventTrigger: CaseEventTrigger;

}
