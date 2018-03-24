import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ccd-activity-icon',
  templateUrl: './ccd-activity-icon.component.html',
  styleUrls: ['./ccd-activity-icon.component.css']
})
export class CcdActivityIconComponent implements OnInit {
  @Input()
  public description: string;

  @Input()
  public imageLink: string;

  constructor() { }

  ngOnInit() {
  }
}
