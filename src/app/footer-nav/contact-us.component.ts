import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ccd-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(public router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
