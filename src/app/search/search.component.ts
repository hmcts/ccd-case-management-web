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
import { AlertService } from '../core/alert/alert.service';
import { plainToClass } from 'class-transformer';

const ATTRIBUTE_SEPERATOR = '.';

@Component({
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {

  private static readonly CASE_FILTER = 'caseFilter';
  private static readonly METADATA_FILTER = 'metadataFilter';

  jurisdiction: Jurisdiction;
  caseType: CaseType;
  caseState: CaseState;
  caseFilterFG: FormGroup;
  profile: Profile;
  resultView: SearchResultView;
  paginationMetadata: PaginationMetadata;
  metadataFields: string[];

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private paginationService: PaginationService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.profile = this.route.parent.snapshot.data.profile;
  }

  applyFilter(filter): void {
    const paginationParams = {};
    const searchParams = {};

    this.caseFilterFG = filter.formGroup;
    this.metadataFields = filter.metadataFields;

    if (filter.caseState) {
      paginationParams['state'] = filter.caseState.id;
      searchParams['state'] = filter.caseState.id;
    }

    if (filter.page) {
      searchParams['page'] = filter.page;
    }

    const filters = this.getCaseFilterFromFormGroup(filter.formGroup);
    const caseFilters = filters[SearchComponent.CASE_FILTER];
    const metadataFilters = Object.assign(searchParams, filters[SearchComponent.METADATA_FILTER]);
    const metadataPaginationParams = Object.assign(paginationParams, filters[SearchComponent.METADATA_FILTER]);

    this.paginationService
      .getPaginationMetadata(filter.jurisdiction.id, filter.caseType.id, metadataPaginationParams, caseFilters)
      .subscribe(paginationMetadataResult => {
        this.paginationMetadata = paginationMetadataResult;
      });

    this.searchService
      .search(filter.jurisdiction.id, filter.caseType.id, metadataFilters, caseFilters)
      .subscribe(resultView => {
        this.resultView = plainToClass(SearchResultView, resultView);
        if (this.resultView.result_error) {
          this.alertService.warning(this.resultView.result_error);
        }
        this.jurisdiction = filter.jurisdiction;
        this.caseType = filter.caseType;
        this.caseState = filter.caseState;

        this.scrollToTop();
      });
  }

  private getCaseFilterFromFormGroup(formGroup?: FormGroup): object {
    const result = {};
    result[SearchComponent.METADATA_FILTER] = {};
    result[SearchComponent.CASE_FILTER] = {};

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
      if (this.isStringOrNumber(value)) {
        const filterType = this.getFilterType(attributeName);
        attributeName = this.sanitiseMetadataFieldName(filterType, attributeName);
        target[filterType][prefix + attributeName] = value;
      } else if (value) {
        this.buildFormDetails(attributeName, target, value);
      }
    }
  }

  private isStringOrNumber(value: any): boolean {
    return (typeof value === 'string' && value.length !== 0) || (typeof value === 'number');
  }

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  private getFilterType(fieldName: string): string {
    return (this.metadataFields && (this.metadataFields.indexOf(fieldName) > -1)) ?
      SearchComponent.METADATA_FILTER : SearchComponent.CASE_FILTER;
  }

  private sanitiseMetadataFieldName(filterType: string, fieldName: string): string {
    if (filterType === SearchComponent.METADATA_FILTER) {
      fieldName = fieldName.replace(/\[(.*?)]/g, '$1').toLocaleLowerCase();
    }
    return fieldName;
  }
}
