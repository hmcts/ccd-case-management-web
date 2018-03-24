import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLogComponent } from './event-log.component';
import { EventLogTableComponent } from './event-log-table.component';
import { EventLogDetailsComponent } from './event-log-details.component';
import { PaletteUtilsModule } from '../palette/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    PaletteUtilsModule
  ],
  declarations: [
    EventLogComponent,
    EventLogTableComponent,
    EventLogDetailsComponent
  ],
  exports: [
    EventLogComponent
  ]
})
export class EventLogModule {}
