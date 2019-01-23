import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseHistory } from '../../core/cases/case-history.model';
import { OrderService } from '../../core/order/order.service';
import { CaseTab } from '../../core/cases/case-tab.model';
import { ShowCondition } from '../conditional-show/conditional-show.model';
import { CaseView } from '../../core/cases/case-view.model';

@Component({
  templateUrl: './case-history.component.html',
  styleUrls: ['./case-history.component.scss']
})
export class CaseHistoryComponent implements OnInit {

  caseHistory: CaseHistory;
  caseDetails: CaseView;
  tabs: CaseTab[];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.caseHistory = this.route.snapshot.data.caseHistory;
    this.caseDetails = this.route.snapshot.data.case;
    this.tabs = this.orderService.sort(this.caseHistory.tabs);
    this.tabs = this.sortTabFieldsAndFilterTabs(this.tabs);
  }

  private sortTabFieldsAndFilterTabs(tabs: CaseTab[]): CaseTab[] {
    return tabs
      .map(tab => Object.assign({}, tab, { fields: this.orderService.sort(tab.fields) }))
      .filter(tab => new ShowCondition(tab.show_condition).matchByCaseFields(tab.fields));
  }
}
