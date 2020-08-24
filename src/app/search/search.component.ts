import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms/forms';
import { PaginationService } from '../core/pagination/pagination.service';
import { plainToClass } from 'class-transformer';
import {
  Jurisdiction, Profile, CaseType, CaseState, AlertService, SearchResultView, SearchService,
  WindowService, JurisdictionService, PaginationMetadata
} from '@hmcts/ccd-case-ui-toolkit';

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
              private jurisdictionService: JurisdictionService,
              private searchService: SearchService,
              private paginationService: PaginationService,
              private alertService: AlertService,
              private windowService: WindowService,
              private router: Router) {
  }

  ngOnInit() {
    this.profile = this.route.parent.snapshot.data.profile;
  }

  applyFilter(returnValue): void {
    const filter = returnValue.selected;
    const paginationParams = {};
    const searchParams = {};

    this.caseFilterFG = filter.formGroup;
    const metafields = this.windowService.getLocalStorage('search-metadata-fields');
    this.metadataFields = metafields ? JSON.parse(metafields) : filter.metadataFields;
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

    if (filter.jurisdiction) {
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
  }

  applyReset(filter): void {
    this.resultView = plainToClass(SearchResultView, {
      columns: [],
      results: [],
      hasDrafts: false
    });
  }

  applyJurisdiction(jurisdiction): void {
    this.jurisdictionService.announceSelectedJurisdiction(jurisdiction);
  }

  private getCaseFilterFromFormGroup(formGroup?: FormGroup): object {
    const result = {};
    result[SearchComponent.METADATA_FILTER] = {};
    result[SearchComponent.CASE_FILTER] = {};

    if (formGroup) {
      const formValue = this.windowService.getLocalStorage('search-form-group-value');
      this.buildFormDetails('', result, formValue ? JSON.parse(formValue) : formGroup.value);
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
