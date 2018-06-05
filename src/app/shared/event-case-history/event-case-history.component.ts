import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CaseView } from "../../core/cases/case-view.model";

@Component({
  templateUrl: './event-case-history.component.html',
  styleUrls: ['./event-case-history.component.scss']
})
export class EventCaseHistoryComponent implements OnInit {

  caseDetails: CaseView;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.caseDetails = this.route.snapshot.data.case;
  }

}
