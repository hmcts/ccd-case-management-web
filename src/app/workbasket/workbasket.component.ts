import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../core/profile/profile.model';
import { SearchResultView } from '../shared/search/search-result-view.model';
import { PaginationMetadata } from '../shared/search/pagination-metadata.model';
import { SearchService } from '../core/search/search.service';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { Jurisdiction } from '../shared/domain/definition/jurisdiction.model';
import { CaseState } from '../shared/domain/definition/case-state.model';
import { PaginationService } from '../core/pagination/pagination.service';
import { CaseType } from '../shared/domain/definition/case-type.model';
import { FormGroup } from '@angular/forms';
import { SearchResultComponent } from '../shared/search/search-result.component';
import { Observable } from 'rxjs/Observable';

const ATTRIBUTE_SEPARATOR = '.';

@Component({
  templateUrl: 'workbasket.component.html',
  styleUrls: ['./workbasket.scss']
})
export class WorkbasketComponent implements OnInit {
  profile: Profile;
  jurisdiction: Jurisdiction;
  caseType: CaseType;
  caseState: CaseState;
  resultView: SearchResultView;
  caseTypes: CaseType[];
  page: number;
  paginationMetadata: PaginationMetadata;
  caseFilterFG: FormGroup;

  @ViewChild('searchResults')
  searchResults: SearchResultComponent;

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private paginationService: PaginationService,
              private jurisdictionService: JurisdictionService) { }

  ngOnInit() {
    this.profile = this.route.parent.snapshot.data.profile;
  }

  applyFilter(filter): void {
    if (this.searchResults) {
      this.searchResults.hideRows = true;
    }
    if (!filter.init) {
      this.notifyDefaultJurisdiction();
    }

    this.caseFilterFG = filter.formGroup;
    const caseFilters = this.getCaseFilterFromFormGroup(filter.formGroup);
    const paginationParams = {};
    const searchParams = {};

    if (!filter.jurisdiction || !filter.caseType) {
      return;
    }

    if (filter.caseState) {
      paginationParams['state'] = filter.caseState.id;
      searchParams['state'] = filter.caseState.id;
    }

    if (filter.page) {
      searchParams['page'] = filter.page;
    }

    let searchObservable = this.searchService
      .search(filter.jurisdiction.id, filter.caseType.id, searchParams, caseFilters, SearchService.VIEW_WORKBASKET);

    let paginationMetadataObservable = this.paginationService
    .getPaginationMetadata(filter.jurisdiction.id, filter.caseType.id, paginationParams, caseFilters);

    Observable.forkJoin(searchObservable, paginationMetadataObservable)
        .subscribe(results => {
          this.resultView = results[0];
          this.jurisdiction = filter.jurisdiction;
          this.caseType = filter.caseType;
          this.caseState = filter.caseState;
          this.page = filter.page;
          this.paginationMetadata = results[1];
        });

    this.scrollToTop();
  }

  private getCaseFilterFromFormGroup(formGroup?: FormGroup): object {
    const result = {};
    if (formGroup) {
      this.buildSearchCaseDetails('', result, formGroup.value);
    }
    return result;
  }

  private buildSearchCaseDetails(parentPrefix: string, target: object, formGroupValue: object): void {
    let prefix = parentPrefix;
    if (parentPrefix && parentPrefix.length > 0) {
      prefix = parentPrefix + ATTRIBUTE_SEPARATOR;
    }
    for (let attributeName of Object.keys(formGroupValue)) {
      let value = formGroupValue[attributeName];
      if (this.isString(value)) {
        target[prefix + attributeName] = value;
      } else if (value) {
        this.buildSearchCaseDetails(attributeName, target, value);
      }
    }
  }

  private isString(value: any): boolean {
    return (typeof value === 'string');
  }

  private notifyDefaultJurisdiction() {
    Promise.resolve(null).then(() => {
      let profile = this.route.parent.snapshot.data.profile;
      let defaultJurisdiction = profile.jurisdictions.find( j => j.id === profile.default.workbasket.jurisdiction_id);
      this.jurisdictionService.announceSelectedJurisdiction(defaultJurisdiction);
    });
  }

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
