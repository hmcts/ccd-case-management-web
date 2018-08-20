import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ccd-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class TcComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
