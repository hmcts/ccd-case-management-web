import { Component, Input } from '@angular/core';
import { Banner, WindowService } from '@hmcts/ccd-case-ui-toolkit';
@Component({
  selector: 'ccd-banner',
  templateUrl: './banner.html',
  styleUrls: [
    './banner.component.scss'
  ]
})
export class BannerComponent {

  @Input()
  public banners: Banner[] = [];

  constructor(private windowService: WindowService) {
  }

  closeBanner(bannerObject: Banner) {
    bannerObject.bannerViewed = true;
    this.windowService.setLocalStorage('BANNERS', JSON.stringify(this.banners));
  }

  showBanner(bannerObject: Banner) {
    return bannerObject.bannerEnabled && !bannerObject.bannerViewed;
  }
}
