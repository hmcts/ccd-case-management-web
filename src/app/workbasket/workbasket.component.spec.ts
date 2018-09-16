import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, provideRoutes } from '@angular/router';
import { DebugElement } from '@angular/core';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';
import { WorkbasketComponent } from './workbasket.component';
import { SearchService } from '../core/search/search.service';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { SearchResultView } from '../shared/search/search-result-view.model';
import { Observable } from 'rxjs/Observable';
import { Jurisdiction } from '../shared/domain/definition/jurisdiction.model';
import { CaseState } from '../shared/domain/definition/case-state.model';
import { PaginationService } from '../core/pagination/pagination.service';
import { CaseType } from '../shared/domain/definition/case-type.model';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '../core/alert/alert.service';
import createSpyObj = jasmine.createSpyObj;

describe('WorkbasketComponent', () => {

  const TEMPLATE =
    `<div class="global-display">
        <ng-content select="[topBody]"></ng-content>
        <ng-content select="[leftBody]"></ng-content>
        <ng-content select="[rightBody]"></ng-content>
    </div>
    `;

  let BodyComponent: any = MockComponent({ selector: 'cut-body', template: TEMPLATE});

  let WorkbasketFiltersComponent: any = MockComponent({ selector: 'ccd-workbasket-filters', inputs: [
       'jurisdictions',
       'defaults'
  ], outputs: [
       'onApply'
  ]});

  let SearchResultComponent: any = MockComponent({ selector: 'ccd-search-result', inputs: [
       'jurisdiction',
       'caseType',
       'caseState',
       'resultView',
       'paginationMetadata',
       'page',
       'caseFilterFG',
       'metadataFields'
  ]});

  const  JURISDICTIONS = [
    {
      id: 'J_ID',
      name: 'Jurisdiction 1'
    },
    {
      id: 'J_ID2',
      name: 'Jurisdiction 2'
    },
    {
      id: 'J_ID3',
      name: 'Jurisdiction 3'
    }
  ];

  const PROFILE = {
    jurisdictions: JURISDICTIONS,
    default: {
      workbasket: {
        jurisdiction_id: 'J_ID',
        case_type_id: 'C_ID',
        state_id: 'S_ID'
      }
    }
  };

  let mockRoute: any = {
    parent: {
      snapshot: {
        data: {
          profile: PROFILE
        }
      }
    }
  };

  const RESULT_VIEW: SearchResultView = {
    columns: [],
    results: [],
    hasDrafts: () => false
  };

  const JURISDICTION: Jurisdiction = {
    id: 'J1',
    name: 'Jurisdiction 1',
    description: '',
    caseTypes: []
  };

  const CASE_TYPES: CaseType[] = [
    {
        id: 'CT0',
        name: 'Case type 0',
        description: '',
        states: [],
        events: [],
        case_fields: [],
        jurisdiction: JURISDICTION
    }
  ];

  const CASE_TYPE = CASE_TYPES[0];

  const CASE_STATE: CaseState = {
    id: 'TEST_STATE',
    name: 'Test Case State',
    description: 'A test Case State'
  };

  const RESULT_VIEW_OBS: Observable<SearchResultView> = Observable.of(RESULT_VIEW);

  const $BODY = By.css('div cut-body');

  let comp: WorkbasketComponent;
  let fixture: ComponentFixture<WorkbasketComponent>;
  let de: DebugElement;
  let mockSearchService: any;
  let mockPaginationService: any;
  let mockJurisdictionService: JurisdictionService;
  let alertService: AlertService;

  beforeEach(async(() => {

    mockSearchService = createSpyObj<SearchService>('searchService', ['search']);
    mockSearchService.search.and.returnValue(RESULT_VIEW_OBS);
    mockPaginationService = createSpyObj<PaginationService>('paginationService', ['getPaginationMetadata']);
    mockPaginationService.getPaginationMetadata.and.returnValue(Observable.of({}));
    mockJurisdictionService = createSpyObj<JurisdictionService>('jurisdictionService', ['search']);
    alertService = createSpyObj<AlertService>('alertService', ['warning']);

    TestBed
      .configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [
          WorkbasketComponent,
          // Mocks
          BodyComponent,
          WorkbasketFiltersComponent,
          SearchResultComponent
        ],
        providers: [
          provideRoutes([]),
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: SearchService, useValue: mockSearchService },
          { provide: PaginationService, useValue: mockPaginationService },
          { provide: JurisdictionService, useValue: mockJurisdictionService },
          { provide: AlertService, useValue: alertService}
        ]
      })
      .compileComponents();  // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkbasketComponent);
    fixture.detectChanges();

    comp = fixture.componentInstance;

    de = fixture.debugElement;
  });

  it('should have a `cut-body`', () => {
    let cutBodyEl = de.query($BODY);

    expect(cutBodyEl).not.toBeNull();
    expect(cutBodyEl.nativeElement.tagName).toBe('CUT-BODY');
  });

  it('should make inputs fields turn into query parameters', () => {
    let filter = {
        init: true,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        caseState: CASE_STATE,
        page: 1
    };

    comp.applyFilter(filter);

    expect(mockPaginationService.getPaginationMetadata).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id,
      { state: CASE_STATE.id }, {});

    expect(mockSearchService.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id,
      { page: 1, state: CASE_STATE.id }, {}, 'WORKBASKET');
  });

  it('should make inputs fields turn into query parameters with structure', () => {
    const nameControl = new FormControl();
    const NAME_VALUE = 'something';

    nameControl.setValue(NAME_VALUE);
    const filterContents = {
      'name': nameControl,
      'child': new FormGroup({ 'childName': new FormControl('childValue') })
    };
    let formGroup = new FormGroup(filterContents);
    let filter = {
      init: true,
      jurisdiction: JURISDICTION,
      caseType: CASE_TYPES[0],
      caseState: CASE_STATE,
      formGroup: formGroup
    };

    comp.applyFilter(filter);

    expect(mockPaginationService.getPaginationMetadata).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id,
      { state: CASE_STATE.id }, {
        'name': NAME_VALUE,
        'child.childName': 'childValue'
      });

    expect(mockSearchService.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id,
      { state: CASE_STATE.id }, {
        'name': NAME_VALUE,
        'child.childName': 'childValue'
      }, 'WORKBASKET');

  });

  it('should not proceed to search when no jurisdiction is defines', () => {
    let filter = {
      init: true,
      jurisdiction: null
    };
    comp.applyFilter(filter);
    expect(mockSearchService.search).not.toHaveBeenCalled();
  });

  it('should make metadata inputs fields turn into query parameters', () => {
    const nameControl1 = new FormControl();
    const NAME_VALUE1 = 'something';
    nameControl1.setValue(NAME_VALUE1);

    const nameControl2 = new FormControl();
    const NAME_VALUE2 = 100;
    nameControl2.setValue(NAME_VALUE2);

    const filterContents = {
      'name': nameControl1,
      '[META]': nameControl2
    };
    let formGroup = new FormGroup(filterContents);
    let filter = {
      formGroup: formGroup,
      jurisdiction: JURISDICTION,
      caseType: CASE_TYPES[0],
      page: 1,
      metadataFields: ['[META]']
    };

    comp.applyFilter(filter);

    expect(mockPaginationService.getPaginationMetadata).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, {meta: NAME_VALUE2}, {
      'name': NAME_VALUE1
    });

    expect(mockSearchService.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, {page: 1, meta: NAME_VALUE2},
      {'name': NAME_VALUE1}, SearchService.VIEW_WORKBASKET);

  });
});
