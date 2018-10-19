import { Component, Input } from '@angular/core';
import { CaseViewEvent } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'ccd-event-log-details',
  templateUrl: './event-log-details.html',
  styleUrls: ['./event-log-details.scss']
})
export class EventLogDetailsComponent {
  @Input()
  event: CaseViewEvent;
}
