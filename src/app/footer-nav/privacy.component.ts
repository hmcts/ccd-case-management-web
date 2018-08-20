import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ccd-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
