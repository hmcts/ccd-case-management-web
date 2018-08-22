import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ccd-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() title: string;
  isHidden = true;

  @Input() lastAccordion: boolean;

  constructor() { }

  ngOnInit() {
  }

  getImage() {
    if (this.isHidden) {
      return 'img/accordion-plus.png';
    } else {
      return 'img/accordion-minus.png';
    }
  }
}
