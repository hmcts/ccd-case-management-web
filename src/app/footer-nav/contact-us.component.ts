import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ccd-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class ContactUsComponent {

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }
}
