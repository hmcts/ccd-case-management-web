import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ccd-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class PrivacyComponent {

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }
}
