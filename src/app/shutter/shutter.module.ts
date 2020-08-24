import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShutterComponent } from './shutter.component';
import { ShutterRoutingModule } from './shutter-routing.module';
import { CaseUIToolkitModule, UrlTransformationService } from '@hmcts/ccd-case-ui-toolkit';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CaseUIToolkitModule,
    ShutterRoutingModule
  ],
  declarations: [
    ShutterComponent
  ],
  providers: [
    UrlTransformationService
  ]
})
export class ShutterModule {}
