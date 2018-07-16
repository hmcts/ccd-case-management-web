import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SearchResultView } from './search-result-view.model';
import { PaginationMetadata } from './pagination-metadata.model';
import { SearchResultViewColumn } from './search-result-view-column.model';
import { SearchResultViewItemComparator } from './sorting/search-result-view-item-comparator';
import { SortParameters } from './sorting/sort-parameters';
import { SortOrder } from './sorting/sort-order';
import { SearchResultViewItemComparatorFactory } from './sorting/search-result-view-item-comparator-factory';
import { Jurisdiction } from '../domain/definition/jurisdiction.model';
import { CaseState } from '../domain/definition/case-state.model';
import { DisplayMode } from '../../core/activity/activity.model';
import { AppConfig } from '../../app.config';
import { CaseType } from '../domain/definition/case-type.model';
import { FormGroup } from '@angular/forms';
import { ActivityService } from '../../core/activity/activity.service';

@Component({
  selector: 'ccd-search-result',
  templateUrl: './search-result.html',
  styleUrls: ['./search-result.scss']
})
export class SearchResultComponent implements OnChanges {

  ICON = DisplayMode.ICON;

  @Input()
  jurisdiction: Jurisdiction;

  @Input()
  caseType: CaseType;

  @Input()
  caseState: CaseState;

  @Input()
  caseFilterFG: FormGroup;

  @Input()
  resultView: SearchResultView;

  @Input()
  page: number;

  @Input()
  paginationMetadata: PaginationMetadata;

  @Output()
  changePage: EventEmitter<any> = new EventEmitter();

  paginationPageSize: number;

  hideRows: boolean;

  showCaseIdColumn: boolean;

  selected: {
    init?: boolean,
    jurisdiction?: Jurisdiction,
    caseType?: CaseType,
    caseState?: CaseState,
    formGroup?: FormGroup,
    page?: number
  } = {};

  sortParameters: SortParameters;
  searchResultViewItemComparatorFactory: SearchResultViewItemComparatorFactory;

  constructor(searchResultViewItemComparatorFactory: SearchResultViewItemComparatorFactory,
    appConfig: AppConfig, private activityService: ActivityService) {
    this.searchResultViewItemComparatorFactory = searchResultViewItemComparatorFactory;
    this.paginationPageSize = appConfig.getPaginationPageSize();
    this.hideRows = false;
    this.showCaseIdColumn = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resultView']) {
      this.hideRows = false;

      this.sortParameters = undefined;

      // Clone `resultView` to prevent sorting the external variable
      this.resultView = {
        columns: this.resultView.columns.slice(0),
        results: this.resultView.results.slice(0)
      };

      this.resultView.columns = this.resultView.columns.sort((a: SearchResultViewColumn, b: SearchResultViewColumn) => {
        return a.order - b.order;
      });

      // Show case id column when the first column in results in not a metadata field
      this.showCaseIdColumn = !(this.resultView.columns.length > 0 && this.resultView.columns[0].metadata);
    }
    if (changes['page']) {
      this.selected.page = (changes['page']).currentValue;
    }
  }

  goToPage(page): void {
    this.hideRows = true;
    this.selected.init = false;
    this.selected.jurisdiction = this.jurisdiction;
    this.selected.caseType = this.caseType;
    this.selected.caseState = this.caseState;
    this.selected.formGroup = this.caseFilterFG;
    this.selected.page = page;
    // Apply filters
    this.changePage.emit(this.selected);
  }

  hasResults(): any {
    return this.resultView.results.length && this.paginationMetadata.total_pages_count;
  }

  comparator(column: SearchResultViewColumn): SearchResultViewItemComparator {
    return this.searchResultViewItemComparatorFactory.createSearchResultViewItemComparator(column);
  }

  sort(column: SearchResultViewColumn) {
    if (this.isSortAscending(column)) {
      this.sortParameters = new SortParameters(this.comparator(column), SortOrder.ASCENDING);
    } else {
      this.sortParameters = new SortParameters(this.comparator(column), SortOrder.DESCENDING);
    }
  }

  sortWidget(column: SearchResultViewColumn) {
    return this.isSortAscending(column) ? '&#9660;' : '&#9650;';
  }

  activityEnabled(): boolean {
    return this.activityService.isEnabled;
  }

  private isSortAscending(column: SearchResultViewColumn): boolean {
    let currentSortOrder = this.currentSortOrder(column);
    return currentSortOrder === SortOrder.UNSORTED || currentSortOrder === SortOrder.DESCENDING;
  }

  private currentSortOrder(column: SearchResultViewColumn): SortOrder {

    let isAscending = true;
    let isDescending = true;

    for (let i = 0; i < this.resultView.results.length - 1; i++) {
      let comparison = this.comparator(column).compare(this.resultView.results[i], this.resultView.results[i + 1]);
      isDescending = isDescending && comparison <= 0;
      isAscending = isAscending && comparison >= 0;
      if (!isAscending && !isDescending) {
        break;
      }
    }
    return isAscending ? SortOrder.ASCENDING : isDescending ? SortOrder.DESCENDING : SortOrder.UNSORTED;
  }
}
