import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { BannerComponent } from './banner.component';

@NgModule({
  imports: [
    CommonModule,
    CaseUIToolkitModule
  ],
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule {}
