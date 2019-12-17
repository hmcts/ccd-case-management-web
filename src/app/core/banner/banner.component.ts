import { Component, Input } from '@angular/core';
import { Banner } from '@hmcts/ccd-case-ui-toolkit';
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

  closeBanner(bannerObject: Banner) {
    bannerObject.bannerViewed = true;
  }
}
