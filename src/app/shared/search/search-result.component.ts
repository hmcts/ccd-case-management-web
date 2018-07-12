import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { SearchResultView } from './search-result-view.model';
import { PaginationMetadata } from './pagination-metadata.model';
import { SearchResultViewColumn } from './search-result-view-column.model';
import { SearchResultViewItemComparator } from './sorting/search-result-view-item-comparator';
import { SortParameters } from './sorting/sort-parameters';
import { SortOrder } from './sorting/sort-order';
import { SearchResultViewItemComparatorFactory } from './sorting/search-result-view-item-comparator-factory';
import { Jurisdiction } from '../../shared/domain/definition/jurisdiction.model';
import { CaseState } from '../../shared/domain/definition/case-state.model';
import { DisplayMode } from '../../core/activity/activity.model';
import { AppConfig } from '../../app.config';
import { CaseType } from '../domain/definition/case-type.model';
import { FormGroup } from '@angular/forms';
import { ActivityService } from '../../core/activity/activity.service';
import { CaseField } from '../domain/definition/case-field.model';
import { SearchResultViewItem } from './search-result-view-item.model';

@Component({
  selector: 'ccd-search-result',
  templateUrl: './search-result.html',
  styleUrls: ['./search-result.scss']
})
export class SearchResultComponent implements OnChanges {

  public static readonly PARAM_JURISDICTION = 'jurisdiction';
  public static readonly PARAM_CASE_TYPE = 'case-type';
  public static readonly PARAM_CASE_STATE = 'case-state';

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

      this.hydrateResultView();
    }
    if (changes['page']) {
      this.selected.page = (changes['page']).currentValue;
    }
  }

  /**
   * Hydrates result view with case field definitions.
   */
  // A longer term resolution is to move this piece of logic to the backend
  hydrateResultView(): void {
    this.resultView.results.forEach(result => {
      const caseFields = [];

      Object.keys(result.case_fields).forEach(fieldId => {

        const field = result.case_fields[fieldId];
        caseFields.push({
          id: fieldId,
          label: null,
          field_type: {},
          value: field,
          display_context: null,
        });
      });

      result.hydrated_case_fields = caseFields;

      result.columns = {};

      this.resultView.columns.forEach(col => {
        result.columns[col.case_field_id] = this.buildCaseField(col, result);
      });
    });
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

  buildCaseField(col: SearchResultViewColumn, result: SearchResultViewItem): CaseField {
    return {
      id: col.case_field_id,
      label: col.label,
      field_type: col.case_field_type,
      value: result.case_fields[col.case_field_id],
      display_context: null,
    };
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
