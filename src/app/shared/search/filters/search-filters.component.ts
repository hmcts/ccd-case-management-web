import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from '../../../core/search/search.service';
import { SearchInput } from '../../../core/search/search-input.model';
import { FormGroup } from '@angular/forms';
import { JurisdictionService } from '../../jurisdiction.service';
import { CaseState, CaseTypeLite, Jurisdiction, OrderService } from '@hmcts/ccd-case-ui-toolkit';

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
              private jurisdictionService: JurisdictionService) { }

  ngOnInit(): void {
    this.selected = {};
    if (this.jurisdictions.length === 1) {
      this.selected.jurisdiction = this.jurisdictions[0];
      this.onJurisdictionIdChange();
    }
    if (this.autoApply === true) {
      this.apply();
    }
  }

  apply(): void {
    this.selected.formGroup = this.formGroup;
    this.selected.page = 1;
    this.selected.metadataFields = this.getMetadataFields();
    this.onApply.emit(this.selected);
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
    .do(() => this.searchInputsReady = true )
    .subscribe(searchInputs => {
      this.searchInputs = searchInputs
        .sort(this.orderService.sortAsc);
    });
  }

  isJurisdictionSelected(): boolean {
    return this.selected.jurisdiction === null  ||
           this.selected.jurisdiction === undefined;
  }

  private selectCaseType(caseTypes: CaseTypeLite[]) {
    if (caseTypes && caseTypes.length > 0) {
      this.selected.caseType = caseTypes[0];
      this.onCaseTypeIdChange();
    }
  }
}
