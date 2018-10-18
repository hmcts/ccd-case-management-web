import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { LevelToTypePipe } from './level-to-type.pipe';
import { CaseUIToolkitModule, AlertService } from '@hmcts/ccd-case-ui-toolkit';

@NgModule({
  imports: [
    CommonModule,
    CaseUIToolkitModule
  ],
  declarations: [
    AlertComponent,
    LevelToTypePipe
  ],
  providers: [
    AlertService
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule {}
