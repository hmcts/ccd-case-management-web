import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Jurisdiction } from '../../domain/definition/jurisdiction.model';
import { CaseState } from '../../domain/definition/case-state.model';
import { CaseType } from '../../domain/definition/case-type.model';
import { SearchService } from '../../../core/search/search.service';
import { SearchInput } from '../../../core/search/search-input.model';
import { WindowService } from '../../../core/utils/window.service';
import { FormGroup } from '@angular/forms';
import { PlatformLocation } from '@angular/common'
import { JurisdictionService } from '../../jurisdiction.service';
import { OrderService } from '../../../core/order/order.service';

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

  searchInputs: SearchInput[];
  searchInputsReady: boolean;

  selected: {
    jurisdiction?: Jurisdiction,
    caseType?: CaseType,
    formGroup?: FormGroup,
    caseState?: CaseState,
    page?: number,
    metadataFields?: string[]
  };

  selectedJurisdictionCaseTypes?: CaseType[];

  formGroup: FormGroup = new FormGroup({});

  constructor(private searchService: SearchService,
    private orderService: OrderService,
    private jurisdictionService: JurisdictionService,
    private windowService: WindowService,
    private platformLocation: PlatformLocation) { }

  ngOnInit(): void {
    this.selected = {};
    if (this.jurisdictions.length === 1) {
      this.selected.jurisdiction = this.jurisdictions[0];
      const jurisdiction = this.windowService.getLocalStorage('jurisdiction');
      if (jurisdiction) {
        this.selected.jurisdiction = JSON.parse(jurisdiction);
      }
      console.log("jurisdiction", this.selected.jurisdiction);
      this.onJurisdictionIdChange();
    }

    if (this.autoApply === true) {
      console.log("Calling via apply...", this.selected);
      this.selected.formGroup = this.formGroup;
      this.selected.page = 1;
      this.selected.metadataFields = this.getMetadataFields();
      this.onApply.emit(this.selected);
    }
  }

  apply(): void {
    console.log("Calling apply button...", this.selected);
    this.selected.formGroup = this.formGroup;
    this.selected.page = 1;
    this.selected.metadataFields = this.getMetadataFields();
    this.populateValuesInLocalStorage();
    this.onApply.emit(this.selected);
  }
  populateValuesInLocalStorage(): void {
    console.log(1);
    this.windowService.setLocalStorage('search-form-group-value',
      JSON.stringify(this.selected.formGroup.value));
    console.log(2);
    this.windowService.setLocalStorage('search-metadata-fields', JSON.stringify(this.selected.metadataFields));
    console.log(3);
    this.windowService.setLocalStorage('search-jurisdiction', JSON.stringify(this.selected.jurisdiction));
    console.log("4", this.selected.caseType);
    if (this.selected.caseType) {
      this.windowService.setLocalStorage('search-caseType', JSON.stringify(this.selected.caseType))
      console.log("5");
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

        const formValue = this.windowService.getLocalStorage('search-form-group-value');
        const formValueObject = JSON.parse(formValue);
        searchInputs.forEach(item => {
          item.field.label = item.label;
          item.field.value = formValueObject[item.field.id];
        });
      });
  }

  isJurisdictionSelected(): boolean {
    return this.selected.jurisdiction === null ||
      this.selected.jurisdiction === undefined;
  }

  private selectCaseType(caseTypes: CaseType[]) {

    if (caseTypes && caseTypes.length > 0) {
      this.selected.caseType = caseTypes[0];
      const caseType = this.windowService.getLocalStorage('search-caseType')

      if (caseType) {
        console.log(JSON.stringify(this.selected.caseType));
        const caseTypeObject = JSON.parse(caseType);
        const result = caseTypes.filter(c => c.id === caseTypeObject.id)

        this.selected.caseType = result[0];
      }
      this.onCaseTypeIdChange();
    }
  }
}
