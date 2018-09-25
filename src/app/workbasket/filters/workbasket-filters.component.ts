import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Jurisdiction } from '../../shared/domain/definition/jurisdiction.model';
import { CaseState } from '../../shared/domain/definition/case-state.model';
import { CaseType } from '../../shared/domain/definition/case-type.model';
import { JurisdictionService } from '../../shared/jurisdiction.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OrderService } from '../../core/order/order.service';
import { WorkbasketInputFilterService } from '../workbasket-input-filter.service';
import { WorkbasketInputModel } from '../workbasket-input.model';
import { AlertService } from '../../core/alert/alert.service';
import 'rxjs/add/operator/do';

@Component({
  selector: 'ccd-workbasket-filters',
  templateUrl: './workbasket-filters.html',
  styleUrls: ['./workbasket-filters.scss']
})
export class WorkbasketFiltersComponent implements OnInit {

  public static readonly PARAM_JURISDICTION = 'jurisdiction';
  public static readonly PARAM_CASE_TYPE = 'case-type';
  public static readonly PARAM_CASE_STATE = 'case-state';

  @Input()
  jurisdictions: Jurisdiction[];

  @Input()
  defaults;

  @Output()
  onApply: EventEmitter<any> = new EventEmitter();

  workbasketInputs: WorkbasketInputModel[];
  workbasketInputsReady: boolean;

  selected: {
    init?: boolean,
    jurisdiction?: Jurisdiction,
    caseType?: CaseType,
    caseState?: CaseState,
    formGroup?: FormGroup,
    page?: number,
    metadataFields?: string[]
  };

  formGroup: FormGroup = new FormGroup({});

  selectedJurisdictionCaseTypes?: CaseType[];
  selectedCaseTypeStates?: CaseState[];

  initialised = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private workbasketInputFilterService: WorkbasketInputFilterService,
              private jurisdictionService: JurisdictionService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.selected = {};
    this.route.queryParams.subscribe(params => {
      if (!this.initialised || !params || !Object.keys(params).length) {
        this.initFilters();
        this.initialised = true;
      }
    });
  }

  apply(init): void {
    // Save filters as query parameters for current route
    let queryParams = {};
    if (this.selected.jurisdiction) {
      queryParams[WorkbasketFiltersComponent.PARAM_JURISDICTION] = this.selected.jurisdiction.id;
    }
    if (this.selected.caseType) {
      queryParams[WorkbasketFiltersComponent.PARAM_CASE_TYPE] = this.selected.caseType.id;
    }
    if (this.selected.caseState) {
      queryParams[WorkbasketFiltersComponent.PARAM_CASE_STATE] = this.selected.caseState.id;
    }
    // without explicitly preserving alerts any message on the page
    // would be cleared out because of this initial navigation.
    this.alertService.setPreserveAlerts(!this.initialised);
    this.router.navigate(['/list/case'], {
      queryParams: queryParams
    });
    this.selected.formGroup = this.formGroup;
    this.selected.init = init;
    this.selected.page = 1;
    this.selected.metadataFields = this.getMetadataFields();

    // Apply filters
    this.onApply.emit(this.selected);
  }

  getMetadataFields(): string[] {
    if (this.workbasketInputs) {
      return this.workbasketInputs
        .filter(workbasketInput => workbasketInput.field.metadata === true)
        .map(workbasketInput => workbasketInput.field.id);
    }
  }

  onJurisdictionIdChange() {
    this.jurisdictionService.announceSelectedJurisdiction(this.selected.jurisdiction);
    this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes.length > 0 ? this.selected.jurisdiction.caseTypes : null;
    this.selected.caseType = this.selectedJurisdictionCaseTypes ? this.selectedJurisdictionCaseTypes[0] : null;
    this.selected.caseState = this.selected.caseType ? this.selected.caseType.states[0] : null;
    this.clearWorkbasketInputs();
    if (!this.isApplyButtonDisabled()) {
      this.onCaseTypeIdChange();
    }
  }

  onCaseTypeIdChange(): void {
    this.selectedCaseTypeStates = this.sortStates(this.selected.caseType.states);
    this.selected.caseState = this.selectedCaseTypeStates[0];
    this.formGroup = new FormGroup({});
    this.clearWorkbasketInputs();
    if (!this.isApplyButtonDisabled()) {
      this.workbasketInputFilterService.getWorkbasketInputs(this.selected.jurisdiction.id, this.selected.caseType.id)
        .subscribe(workbasketInputs => {
          this.workbasketInputsReady = true;
          this.workbasketInputs = workbasketInputs
            .sort(this.orderService.sortAsc);
        });
    }
  }

  isCaseTypesDropdownDisabled(): boolean {
    return !this.selectedJurisdictionCaseTypes;
  }

  isCaseStatesDropdownDisabled(): boolean {
    return !this.selected.caseType || !(this.selected.caseType.states && this.selected.caseType.states.length > 0);
  }

  isApplyButtonDisabled(): boolean {
    return !(this.selected.jurisdiction && this.selected.caseType && this.selected.caseState);
  }

  private sortStates(states: CaseState[]) {
    return states.sort(this.orderService.sortAsc);
  }
  /**
   * Try to initialise filters based on query parameters or workbasket defaults.
   * Query parameters, when available, take precedence over workbasket defaults.
   */
  private initFilters() {
    let routeSnapshot: ActivatedRouteSnapshot = this.route.snapshot;

    let selectedJurisdictionId = routeSnapshot.queryParams[WorkbasketFiltersComponent.PARAM_JURISDICTION] || this.defaults.jurisdiction_id;
    this.selected.jurisdiction = this.jurisdictions.find(j => selectedJurisdictionId === j.id);
    if (this.selected.jurisdiction && this.selected.jurisdiction.caseTypes.length > 0) {
      this.selectedJurisdictionCaseTypes = this.selected.jurisdiction.caseTypes;
      this.selected.caseType = this.selectCaseType(this.selected, this.selectedJurisdictionCaseTypes, routeSnapshot);
      if (this.selected.caseType) {
        this.onCaseTypeIdChange();
        this.selected.caseState = this.selectCaseState(this.selected.caseType, routeSnapshot);
      }
    }
    this.apply(false);
  }

  private selectCaseState(caseType: CaseType, routeSnapshot: ActivatedRouteSnapshot): CaseState {
    let caseState;
    if (caseType) {
      let selectedCaseStateId = this.selectCaseStateIdFromQueryOrDefaults(routeSnapshot, this.defaults.state_id);
      caseState = caseType.states.find(ct => selectedCaseStateId === ct.id);
    }
    return caseState ? caseState : caseType.states[0];
  }

  private selectCaseStateIdFromQueryOrDefaults(routeSnapshot: ActivatedRouteSnapshot, defaultCaseStateId: string): string {
    return routeSnapshot.queryParams[WorkbasketFiltersComponent.PARAM_CASE_STATE] || defaultCaseStateId;
  }

  private selectCaseType(selected: any, caseTypes: CaseType[], routeSnapshot: ActivatedRouteSnapshot): CaseType {
    let caseType;
    if (selected.jurisdiction) {
      let selectedCaseTypeId = this.selectCaseTypeIdFromQueryOrDefaults(routeSnapshot, this.defaults.case_type_id);
      caseType = caseTypes.find(ct => selectedCaseTypeId === ct.id);
    }
    return caseType ? caseType : caseTypes[0];
  }

  private selectCaseTypeIdFromQueryOrDefaults(routeSnapshot: ActivatedRouteSnapshot, defaultCaseTypeId: string): string {
    return routeSnapshot.queryParams[WorkbasketFiltersComponent.PARAM_CASE_TYPE] || defaultCaseTypeId;
  }

  isSearchableAndWorkbasketInputsReady(): boolean {
    return this.selected.jurisdiction && this.selected.caseType && this.workbasketInputsReady;
  }

  private clearWorkbasketInputs() {
    this.workbasketInputsReady = false;
    this.workbasketInputs = [];
  }
}
