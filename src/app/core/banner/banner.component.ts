import { Component, Input } from '@angular/core';
import { Banner } from './banner.model';

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
