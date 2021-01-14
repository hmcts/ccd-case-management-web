import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewerWrapperComponent } from './media-viewer-wrapper.component';
import { MediaViewerWrapperRoutingModule } from './media-viewer-wrapper-routing.module';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/window';
import { MediaViewerModule } from '@hmcts/media-viewer';

@NgModule({
  imports: [
    CommonModule,
    MediaViewerWrapperRoutingModule,
    MediaViewerModule,
  ],
  declarations: [
    MediaViewerWrapperComponent,
  ],
  entryComponents: [
    MediaViewerWrapperComponent
  ],
  exports: [
    MediaViewerWrapperComponent
  ],
  providers: [
    WindowService
  ]
})
export class MediaViewerWrapperModule { }
