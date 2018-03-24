import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../core/profile/profile.model';
import { SearchResultView } from '../shared/search/search-result-view.model';
import { PaginationMetadata } from '../shared/search/pagination-metadata.model';
import { SearchService } from '../core/search/search.service';
import { FormGroup } from '@angular/forms/forms';
import { Jurisdiction } from '../shared/domain/definition/jurisdiction.model';
import { CaseState } from '../shared/domain/definition/case-state.model';
import { PaginationService } from '../core/pagination/pagination.service';
import { CaseType } from '../shared/domain/definition/case-type.model';

const ATTRIBUTE_SEPERATOR = '.';

@Component({
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {
  jurisdiction: Jurisdiction;
  caseType: CaseType;
  caseState: CaseState;
  caseFilterFG: FormGroup;
  profile: Profile;
  resultView: SearchResultView;
  paginationMetadata: PaginationMetadata;

  constructor(private route: ActivatedRoute, private searchService: SearchService, private paginationService: PaginationService) { }

  ngOnInit() {
    this.profile = this.route.parent.snapshot.data.profile;
  }

  applyFilter(filter): void {
    const paginationParams = {};
    const searchParams = {};

    this.caseFilterFG = filter.formGroup;
    const caseFilters = this.getCaseFilterFromFormGroup(filter.formGroup);

    if (filter.caseState) {
      paginationParams['state'] = filter.caseState.id;
      searchParams['state'] = filter.caseState.id;
    }

    this.paginationService
      .getPaginationMetadata(filter.jurisdiction.id, filter.caseType.id, paginationParams, caseFilters)
      .subscribe(paginationMetadataResult => {
        this.paginationMetadata = paginationMetadataResult;
      });

    if (filter.page) {
      searchParams['page'] = filter.page;
    }

    this.searchService
      .search(filter.jurisdiction.id, filter.caseType.id, searchParams, caseFilters)
      .subscribe(resultView => {
        this.resultView = resultView;

        this.jurisdiction = filter.jurisdiction;
        this.caseType = filter.caseType;
        this.caseState = filter.caseState;

        this.scrollToTop();
      });
  }

  private getCaseFilterFromFormGroup(formGroup?: FormGroup): object {
    const result = {};
    if (formGroup) {
      this.buildFormDetails('', result, formGroup.value);
    }
    return result;
  }

  private buildFormDetails(parentPrefix: string, target: object, formGroupValue: object): void {
    let prefix = parentPrefix;
    if (parentPrefix && parentPrefix.length > 0) {
      prefix = parentPrefix + ATTRIBUTE_SEPERATOR;
    }
    for (let attributeName of Object.keys(formGroupValue)) {
      let value = formGroupValue[attributeName];
      if (this.isString(value)) {
        target[prefix + attributeName] = value;
      } else if (value) {
        this.buildFormDetails(attributeName, target, value);
      }
    }
  }

  private isString(value: any): boolean {
    return (typeof value === 'string');
  }

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }

}
