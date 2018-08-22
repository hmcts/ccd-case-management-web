import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ccd-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(public router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
