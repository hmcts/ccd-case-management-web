import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EventTriggerComponent } from './event-trigger.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    EventTriggerComponent
  ],
  exports: [
    EventTriggerComponent
  ]
})
export class EventTriggerModule {}
