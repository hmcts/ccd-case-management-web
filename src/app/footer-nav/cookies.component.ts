import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ccd-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class CookiesComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
