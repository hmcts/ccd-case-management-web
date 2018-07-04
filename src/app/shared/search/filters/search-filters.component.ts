import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Jurisdiction } from '../../domain/definition/jurisdiction.model';
import { CaseState } from '../../domain/definition/case-state.model';
import { CaseType } from '../../domain/definition/case-type.model';
import { SearchService } from '../../../core/search/search.service';
import { SearchInput } from '../../../core/search/search-input.model';
import { FormGroup } from '@angular/forms';
import { JurisdictionService } from '../../jurisdiction.service';
import { OrderService } from '../../../core/order/order.service';
import { DefinitionsService } from '../../../core/definitions/definitions.service';
import { READ_ACCESS } from '../../domain/case-view/access-types.model';

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
              private definitionsService: DefinitionsService) { }

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
      return this.searchInputs.filter(searchInput => searchInput.field.metadata === true).map(function (searchInput) {
        return searchInput.field.id;
      });
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
    this.definitionsService.getCaseTypes(this.selected.jurisdiction.id, READ_ACCESS)
    .subscribe(caseTypes => {
      this.selectedJurisdictionCaseTypes = caseTypes;
      this.selectCaseType(this.selectedJurisdictionCaseTypes);
    });
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

  private selectCaseType(caseTypes: CaseType[]) {
    if (caseTypes.length === 1) {
      this.selected.caseType = caseTypes[0];
      this.onCaseTypeIdChange();
    }
  }
}
