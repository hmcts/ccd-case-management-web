import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from '../core/pagination/pagination.service';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { Profile, Jurisdiction, AlertService, CaseType, CaseState, SearchResultView, SearchService, JurisdictionService,
  WindowService, PaginationMetadata, SearchResultComponent} from '@hmcts/ccd-case-ui-toolkit';

const ATTRIBUTE_SEPARATOR = '.';

@Component({
  templateUrl: 'workbasket.component.html',
  styleUrls: ['./workbasket.scss']
})
export class WorkbasketComponent implements OnInit {

  private static readonly CASE_FILTER = 'caseFilter';
  private static readonly METADATA_FILTER = 'metadataFilter';

  profile: Profile;
  jurisdiction: Jurisdiction;
  caseType: CaseType;
  caseState: CaseState;
  resultView: SearchResultView;
  page: number;
  paginationMetadata: PaginationMetadata;
  caseFilterFG: FormGroup;
  metadataFields: string[];

  @ViewChild('searchResults')
  searchResults: SearchResultComponent;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private paginationService: PaginationService,
    private jurisdictionService: JurisdictionService,
    private alertService: AlertService,
    private windowService: WindowService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.profile = this.route.parent.snapshot.data.profile;
  }

  applyFilter(returnValue): void {
    const filter = returnValue.selected;
    if (this.searchResults) {
      this.searchResults.hideRows = true;
    }
    if (!filter.init) {
      this.notifyDefaultJurisdiction();
    }

    this.caseFilterFG = filter.formGroup;
    this.metadataFields = filter.metadataFields;

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
    const filters = this.getCaseFilterFromFormGroup(!filter.init, filter.formGroup);

    const caseFilters = filters[WorkbasketComponent.CASE_FILTER];
    const metadataFilters = Object.assign(searchParams, filters[WorkbasketComponent.METADATA_FILTER]);
    const metadataPaginationParams = Object.assign(paginationParams, filters[WorkbasketComponent.METADATA_FILTER]);

    let searchObservable = this.searchService
      .search(filter.jurisdiction.id, filter.caseType.id, metadataFilters, caseFilters, SearchService.VIEW_WORKBASKET);

    let paginationMetadataObservable = this.paginationService
      .getPaginationMetadata(filter.jurisdiction.id, filter.caseType.id, metadataPaginationParams, caseFilters);

    forkJoin(searchObservable, paginationMetadataObservable)
        .subscribe(results => {
          this.resultView = plainToClass(SearchResultView, results[0]);
          this.jurisdiction = filter.jurisdiction;
          this.caseType = filter.caseType;
          this.caseState = filter.caseState;
          this.page = filter.page;
          this.paginationMetadata = results[1];
          if (this.resultView.result_error) {
            this.alertService.warning(this.resultView.result_error);
          }
        });

    this.scrollToTop();

    this.router.navigate(['/list/case'], {
      queryParams: returnValue.queryParams
    });
  }

  applyReset() {
    this.router.navigate(['/list/case']);
  }

  private getCaseFilterFromFormGroup(isFormApply: boolean, formGroup?: FormGroup): object {
    const result = {};
    result[WorkbasketComponent.METADATA_FILTER] = {};
    result[WorkbasketComponent.CASE_FILTER] = {};

    if (isFormApply) {
      const formValue = this.windowService.getLocalStorage('workbasket-filter-form-group-value');

      if (formValue) {
        let formValueObject = JSON.parse(formValue);
        this.buildSearchCaseDetails('', result, formValueObject);
      }
    } else {
      if (formGroup) {
        this.buildSearchCaseDetails('', result, formGroup.value);
      }
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
      if (this.isStringOrNumber(value)) {
        const filterType = this.getFilterType(attributeName);
        attributeName = this.sanitiseMetadataFieldName(filterType, attributeName);
        target[filterType][prefix + attributeName] = value;
      } else if (value) {
        this.buildSearchCaseDetails(attributeName, target, value);
      }
    }
  }

  private isStringOrNumber(value: any): boolean {
    return (typeof value === 'string' && value.length !== 0) || (typeof value === 'number');
  }

  private notifyDefaultJurisdiction() {
    Promise.resolve(null).then(() => {
      let profile = this.route.parent.snapshot.data.profile;
      if (profile.default.workbasket && profile.default.workbasket.jurisdiction_id) {
        let defaultJurisdiction = profile.jurisdictions.find(j => j.id === profile.default.workbasket.jurisdiction_id);
        this.jurisdictionService.announceSelectedJurisdiction(defaultJurisdiction);
      }
    });
  }

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  private getFilterType(fieldName: string): string {
    return (this.metadataFields && (this.metadataFields.indexOf(fieldName) > -1)) ?
      WorkbasketComponent.METADATA_FILTER : WorkbasketComponent.CASE_FILTER;
  }

  private sanitiseMetadataFieldName(filterType: string, fieldName: string): string {
    if (filterType === WorkbasketComponent.METADATA_FILTER) {
      fieldName = fieldName.replace(/\[(.*?)]/g, '$1').toLocaleLowerCase();
    }
    return fieldName;
  }
}
