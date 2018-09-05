import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ccd-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

  @Input() title: string;
  isHidden = true;

  @Input() lastAccordion: boolean;

  getImage() {
    if (this.isHidden) {
      return 'img/accordion-plus.png';
    } else {
      return 'img/accordion-minus.png';
    }
  }
}
