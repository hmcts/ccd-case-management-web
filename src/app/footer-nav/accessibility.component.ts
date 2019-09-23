import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ccd-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class AccessibilityComponent {

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }
}
