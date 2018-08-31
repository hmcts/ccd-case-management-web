import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ccd-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class CookiesComponent {

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }
}
