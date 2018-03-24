import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaseViewEvent } from '../../core/cases/case-view-event.model';

@Component({
  selector: 'ccd-event-log-table',
  templateUrl: './event-log-table.html',
  styleUrls: ['./event-log-table.scss']
})
export class EventLogTableComponent {

  @Input()
  events: CaseViewEvent[];

  @Input()
  selected: CaseViewEvent;

  @Output()
  onSelect = new EventEmitter<CaseViewEvent>();

  select(event: CaseViewEvent): void {
    this.selected = event;
    this.onSelect.emit(event);
  }
}
