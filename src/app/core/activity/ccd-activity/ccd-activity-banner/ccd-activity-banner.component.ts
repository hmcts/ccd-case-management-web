import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ccd-activity-banner',
  templateUrl: './ccd-activity-banner.component.html',
  styleUrls: ['./ccd-activity-banner.component.css']
})
export class CcdActivityBannerComponent implements OnInit {
  @Input()
  public bannerType: string;

  @Input()
  public description: string;

  @Input()
  public imageLink: string;

  constructor() { }

  ngOnInit() {
  }
}
