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
import { CaseReferencePipe } from '../utils/case-reference.pipe';
import { Draft } from '../domain/draft';

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

  @Input()
  metadataFields: string[];

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
    metadataFields?: string[],
    page?: number
  } = {};

  sortParameters: SortParameters;
  searchResultViewItemComparatorFactory: SearchResultViewItemComparatorFactory;
  draftsCount: number;

  constructor(searchResultViewItemComparatorFactory: SearchResultViewItemComparatorFactory,
              appConfig: AppConfig,
              private activityService: ActivityService,
              private caseReferencePipe: CaseReferencePipe) {
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
        results: this.resultView.results.slice(0),
        hasDrafts: this.resultView.hasDrafts
      };

      this.resultView.columns = this.resultView.columns.sort((a: SearchResultViewColumn, b: SearchResultViewColumn) => {
        return a.order - b.order;
      });

      this.draftsCount = this.draftsCount ? this.draftsCount : this.numberOfDrafts();
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
    this.selected.metadataFields = this.metadataFields;
    this.selected.page = page;
    // Apply filters
    this.changePage.emit(this.selected);
  }

  hasResults(): any {
    return this.resultView.results.length && this.paginationMetadata.total_pages_count;
  }

  hasDrafts(): boolean {
    return this.resultView.hasDrafts();
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

  hyphenateIfCaseReferenceOrGet(col, result): any {
    return col.case_field_id === '[CASE_REFERENCE]' ?
      this.caseReferencePipe.transform(result.case_fields[col.case_field_id])
      : result.case_fields[col.case_field_id];
  }

  draftPrefixOrGet(col, result): any {
    return result.case_id.startsWith(Draft.DRAFT) ? Draft.DRAFT : this.hyphenateIfCaseReferenceOrGet(col, result);
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

  getFirstResult(): number {
    const currentPage = (this.selected.page ? this.selected.page : 1);
    return ( (currentPage - 1) * this.paginationPageSize ) + 1 + this.getDraftsCountIfNotPageOne(currentPage);
  }

  getLastResult(): number {
    const currentPage = (this.selected.page ? this.selected.page : 1);
    return ( (currentPage - 1) * this.paginationPageSize ) + this.resultView.results.length + this.getDraftsCountIfNotPageOne(currentPage);
  }

  getTotalResults(): number {
    return this.paginationMetadata.total_results_count + this.draftsCount;
  }

  private getDraftsCountIfNotPageOne(currentPage): number {
    return currentPage > 1 ? this.draftsCount : 0;
  }
  private numberOfDrafts(): number {
    return this.resultView.results.filter(_ => _.case_id.startsWith(Draft.DRAFT)).length;
  }
}
