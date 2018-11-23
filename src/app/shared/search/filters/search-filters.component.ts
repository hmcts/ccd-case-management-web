import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../core/search/search.service';
import { SearchInput } from '../../../core/search/search-input.model';
import { WindowService } from '../../../core/utils/window.service';
import { FormGroup } from '@angular/forms';
import { PlatformLocation } from '@angular/common'
import { JurisdictionService } from '../../jurisdiction.service';
import { CaseState, CaseTypeLite, Jurisdiction, OrderService } from '@hmcts/ccd-case-ui-toolkit';

const JURISDICTION_LOC_STORAGE = 'search-jurisdiction';
const META_FIELDS_LOC_STORAGE = 'search-metadata-fields';
const FORM_GROUP_VALUE_LOC_STORAGE = 'search-form-group-value';
const CASE_TYPE_LOC_STORAGE = 'search-caseType';
@Component({
  selector: 'ccd-search-filters',
  templateUrl: './search-filters.html',
})

export class SearchFiltersComponent implements OnInit {

  @Input()
  jurisdictions: Jurisdiction[];

  @Input()
  autoApply: boolean;

  @Output()
  onApply: EventEmitter<any> = new EventEmitter();

  @Output()
  onReset: EventEmitter<any> = new EventEmitter();

  searchInputs: SearchInput[];
  searchInputsReady: boolean;

  selected: {
    jurisdiction?: Jurisdiction,
    caseType?: CaseTypeLite,
    formGroup?: FormGroup,
    caseState?: CaseState,
    page?: number,
    metadataFields?: string[]
  };

  selectedJurisdictionCaseTypes?: CaseTypeLite[];

  formGroup: FormGroup = new FormGroup({});

  constructor(private searchService: SearchService,
    private orderService: OrderService,
    private jurisdictionService: JurisdictionService,
    private windowService: WindowService) {
  }

  ngOnInit(): void {
    this.selected = {};
    const jurisdiction = this.windowService.getLocalStorage(JURISDICTION_LOC_STORAGE);
    if (this.jurisdictions.length === 1 || jurisdiction) {
      this.selected.jurisdiction = this.jurisdictions[0];
      if (jurisdiction) {
        const localStorageJurisdiction = JSON.parse(jurisdiction);
        this.selected.jurisdiction = this.jurisdictions.filter(j => j.id === localStorageJurisdiction.id)[0];
      }
      this.onJurisdictionIdChange();
    }

    if (this.autoApply === true) {
      this.selected.formGroup = this.formGroup;
      this.selected.page = 1;
      this.selected.metadataFields = this.getMetadataFields();
      this.onApply.emit(this.selected);
    }
  }

  reset(): void {
    this.windowService.removeLocalStorage(FORM_GROUP_VALUE_LOC_STORAGE);
    this.windowService.removeLocalStorage(CASE_TYPE_LOC_STORAGE);
    this.windowService.removeLocalStorage(JURISDICTION_LOC_STORAGE);
    this.windowService.removeLocalStorage(META_FIELDS_LOC_STORAGE);
    this.selected = {};
    if (this.jurisdictions.length === 1) {
      this.selected.jurisdiction = this.jurisdictions[0];
      this.onJurisdictionIdChange();
    }
    this.onReset.emit();
  }

  apply(): void {
    this.selected.formGroup = this.formGroup;
    this.selected.page = 1;
    this.selected.metadataFields = this.getMetadataFields();
    this.populateValuesInLocalStorage();
    this.onApply.emit(this.selected);
  }

  populateValuesInLocalStorage(): void {
    this.windowService.setLocalStorage(FORM_GROUP_VALUE_LOC_STORAGE,
      JSON.stringify(this.selected.formGroup.value));
    this.windowService.setLocalStorage(META_FIELDS_LOC_STORAGE, JSON.stringify(this.selected.metadataFields));
    this.windowService.setLocalStorage(JURISDICTION_LOC_STORAGE, JSON.stringify(this.selected.jurisdiction));
    if (this.selected.caseType) {
      this.windowService.setLocalStorage(CASE_TYPE_LOC_STORAGE, JSON.stringify(this.selected.caseType))
    }
  }

  getMetadataFields(): string[] {
    if (this.searchInputs) {
      return this.searchInputs
        .filter(searchInput => searchInput.field.metadata === true)
        .map(searchInput => searchInput.field.id);
    }
  }

  isSearchable(): boolean {
    let result: boolean;
    result = this.selected.jurisdiction !== undefined && this.selected.jurisdiction !== null;
    result = result && this.selected.caseType !== undefined && this.selected.caseType !== null;
    return result;
  }

  isSearchableAndSearchInputsReady(): boolean {
    return this.isSearchable() && this.searchInputsReady;
  }

  onJurisdictionIdChange(): void {
    this.selected.caseType = null;
    this.jurisdictionService.announceSelectedJurisdiction(this.selected.jurisdiction);
    this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes;
    this.selectCaseType(this.selectedJurisdictionCaseTypes);
  }

  onCaseTypeIdChange(): void {
    this.formGroup = new FormGroup({});
    this.searchInputsReady = false;
    this.searchInputs = [];
    this.searchService.getSearchInputs(
      this.selected.jurisdiction.id,
      this.selected.caseType.id
    )
      .do(() => this.searchInputsReady = true)
      .subscribe(searchInputs => {
        this.searchInputs = searchInputs
          .sort(this.orderService.sortAsc);

        const formValue = this.windowService.getLocalStorage(FORM_GROUP_VALUE_LOC_STORAGE);
        let formValueObject = null;
        if (formValue) {
          formValueObject = JSON.parse(formValue);
        }
        searchInputs.forEach(item => {
          item.field.label = item.label;
          if (formValueObject) {
            item.field.value = formValueObject[item.field.id];
          }
        });
      }, error => {
        console.log('Search input fields request will be discarded reason: ', error.message);
      });
  }

  isJurisdictionSelected(): boolean {
    return this.selected.jurisdiction === null ||
      this.selected.jurisdiction === undefined;
  }

  private selectCaseType(caseTypes: CaseTypeLite[]) {
    if (caseTypes && caseTypes.length > 0) {
      this.selected.caseType = caseTypes[0];
      const caseType = this.windowService.getLocalStorage(CASE_TYPE_LOC_STORAGE)

      if (caseType) {
        const caseTypeObject = JSON.parse(caseType);
        const result = caseTypes.filter(c => c.id === caseTypeObject.id)
        this.selected.caseType = result[0];
      }
      this.onCaseTypeIdChange();
    }
  }
}
