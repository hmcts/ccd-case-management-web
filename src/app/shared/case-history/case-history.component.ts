import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseHistoryView } from '../../core/cases/case-history-view.model';
import { OrderService } from '../../core/order/order.service';
import { CaseTab } from '../../core/cases/case-tab.model';
import { ShowCondition } from '../conditional-show/conditional-show.model';

@Component({
  templateUrl: './case-history.component.html',
  styleUrls: ['./case-history.component.scss']
})
export class CaseHistoryComponent implements OnInit {

  caseHistory: CaseHistoryView;
  tabs: CaseTab[];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.caseHistory = this.route.snapshot.data.caseHistory;
    this.tabs = this.sortTabFieldsAndFilterTabs(this.caseHistory.tabs);
  }

  private sortTabFieldsAndFilterTabs(tabs: CaseTab[]): CaseTab[] {
    return tabs
      .map(tab => Object.assign({}, tab, { fields: this.orderService.sort(tab.fields) }))
      .filter(tab => new ShowCondition(tab.show_condition).matchByCaseFields(tab.fields));
  }
}
