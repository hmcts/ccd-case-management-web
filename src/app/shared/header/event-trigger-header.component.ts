import { Component, Input } from '@angular/core';
import { CaseEventTrigger } from '../domain/case-view/case-event-trigger.model';

@Component({
  selector: 'ccd-event-trigger-header',
  templateUrl: './event-trigger-header.html'
})
export class EventTriggerHeaderComponent {

  @Input()
  eventTrigger: CaseEventTrigger;

}
