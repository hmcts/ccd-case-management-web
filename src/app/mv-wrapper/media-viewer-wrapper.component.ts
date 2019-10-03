import { Component, Compiler, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ComponentFactory, ElementRef, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/window';

const MEDIA_VIEWER = 'media-viewer-info';

@Component({
  selector: 'ccd-media-viewer',
  templateUrl: './media-viewer-wrapper.component.html'
})
export class MediaViewerWrapperComponent implements OnInit {

  mediaURL = '';
  mediaFilename = '';
  mediaContentType = '';
  mediaAnnotationApiUrl = '';

  public constructor(public renderer: Renderer2,
                     private el: ElementRef,
                     private windowService: WindowService,
                     private readonly viewContainerRef: ViewContainerRef,
                     private componentFactoryResolver: ComponentFactoryResolver,
                     @Inject(PLATFORM_ID) private platformId: Object) {
  }

  async ngOnInit() {

    console.log('Platform ID is ' + this.platformId);

    const localStorageMedia = this.windowService.getLocalStorage(MEDIA_VIEWER);
    if (localStorageMedia) {
      const media = JSON.parse(localStorageMedia);
      this.mediaURL = media.document_binary_url;
      this.mediaFilename = media.document_filename;
      this.mediaContentType = media.content_type;
      this.mediaAnnotationApiUrl = media.annotation_api_url;
    }
    this.removeSideBar();
  }

  removeSideBar() {
    if (this.el.nativeElement) {
      let tempElement = this.el.nativeElement.parentElement
      while (tempElement) {
        if (tempElement.tagName === 'HTML') {
          this.renderer.setStyle(tempElement, 'background-color', '#ffffff');
        }
        tempElement = tempElement.parentElement;
      }
    }
  }
}
