import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ccd-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class TcComponent {

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }
}
