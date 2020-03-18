import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, provideRoutes, Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';
import { WorkbasketComponent } from './workbasket.component';
import { Observable } from 'rxjs';
import { PaginationService } from '../core/pagination/pagination.service';
import { FormControl, FormGroup } from '@angular/forms';
import createSpyObj = jasmine.createSpyObj;
import {
  Jurisdiction, CaseType, CaseState, AlertService, SearchService, WindowService, JurisdictionService,
  SearchResultView,
  Banner
} from '@hmcts/ccd-case-ui-toolkit';

describe('WorkbasketComponent', () => {

  const TEMPLATE =
    `<div class="global-display">
        <ng-content select="[topBody]"></ng-content>
        <ng-content select="[leftBody]"></ng-content>
        <ng-content select="[rightBody]"></ng-content>
    </div>
    `;

  let BodyComponent: any = MockComponent({ selector: 'cut-body', template: TEMPLATE });

  let WorkbasketFiltersComponent: any = MockComponent({
    selector: 'ccd-workbasket-filters', inputs: [
      'jurisdictions',
      'defaults'
    ], outputs: [
      'onApply'
    ]
  });

  let SearchResultComponent: any = MockComponent({
    selector: 'ccd-search-result', inputs: [
      'caseLinkUrlTemplate',
      'jurisdiction',
      'caseType',
      'caseState',
      'resultView',
      'paginationMetadata',
      'page',
      'caseFilterFG',
      'metadataFields'
    ]
  });

  const JURISDICTIONS = [
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
    },
    navigate: (param) => true
  };

  const RESULT_VIEW: SearchResultView = {
    columns: [],
    results: [],
    hasDrafts: () => false
  };

  const RESULT_VIEW_ERROR: SearchResultView = {
    columns: [],
    results: [],
    result_error: 'ERROR',
    hasDrafts: () => false
  };

  const BANNERS: Banner[] = [
    {
      bannerDescription: 'Test Banner Description',
      bannerEnabled: true,
      bannerUrl: 'http://localhost:3451/test',
      bannerUrlText: 'click here to see it.>>>',
      bannerViewed: false
    }
  ];

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
  const RESULT_VIEW_ERROR_OBS: Observable<SearchResultView> = Observable.of(RESULT_VIEW_ERROR);

  const $BODY = By.css('div cut-body');
  const workbasketfiltervalue = `{\"PersonLastName\":null,\"PersonFirstName\":\"CaseFirstName\",`
    + `\"PersonAddress\":{\"AddressLine1\":null,\"AddressLine2\":null,\"AddressLine3\":null,`
    + `\"PostTown\":null,\"County\":null,\"PostCode\":null,\"Country\":null}}`
  let comp: WorkbasketComponent;
  let fixture: ComponentFixture<WorkbasketComponent>;
  let de: DebugElement;
  let mockSearchService: any;
  let mockPaginationService: any;
  let mockJurisdictionService: JurisdictionService;
  let alertService: AlertService;
  let windowService;
  let mockRouter;

  beforeEach(async(() => {

    mockSearchService = createSpyObj<SearchService>('searchService', ['search']);
    mockSearchService.search.and.returnValue(RESULT_VIEW_OBS);
    mockPaginationService = createSpyObj<PaginationService>('paginationService', ['getPaginationMetadata']);
    mockPaginationService.getPaginationMetadata.and.returnValue(Observable.of({}));
    mockJurisdictionService = createSpyObj<any>('jurisdictionService', ['search']);
    alertService = createSpyObj<AlertService>('alertService', ['warning', 'clear']);
    windowService = createSpyObj('windowService', ['setLocalStorage', 'getLocalStorage']);
    mockRouter = createSpyObj<Router>('router', ['navigate']);
    mockRouter.navigate.and.callThrough();

    TestBed
      .configureTestingModule({
        imports: [],
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
          { provide: AlertService, useValue: alertService },
          { provide: WindowService, useValue: windowService },
          { provide: Router, useValue: mockRouter }
        ]
      })
      .compileComponents();  // compile template and css

    fixture = TestBed.createComponent(WorkbasketComponent);
    fixture.detectChanges();

    comp = fixture.componentInstance;

    de = fixture.debugElement;
  }));

  it('should have a `cut-body`', () => {
    let cutBodyEl = de.query($BODY);

    expect(cutBodyEl).not.toBeNull();
    expect(cutBodyEl.nativeElement.tagName).toBe('CUT-BODY');
  });

  it('should make inputs fields turn into query parameters', () => {
    let filter = {
      selected: {
        init: true,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        caseState: CASE_STATE,
        page: 1
      }
    };

    comp.applyFilter(filter);

    expect(mockPaginationService.getPaginationMetadata).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id,
      { state: CASE_STATE.id }, {});

    expect(mockSearchService.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id,
      { page: 1, state: CASE_STATE.id }, {}, 'WORKBASKET');
  });

  it('should alert warning when result has error', () => {
    mockSearchService.search.and.returnValue(RESULT_VIEW_ERROR_OBS);
    let filter = {
      selected: {
        init: true,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        caseState: CASE_STATE,
        page: 1
      }
    };

    comp.applyFilter(filter);

    expect(alertService.warning).toHaveBeenCalledWith('ERROR');
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
      selected: {
        init: true,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        caseState: CASE_STATE,
        formGroup: formGroup
      }
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
      selected: {
        init: true,
        jurisdiction: null
      }
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
      selected: {
        formGroup: formGroup,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        page: 1,
        metadataFields: ['[META]']
      }
    };
    windowService.getLocalStorage.and.returnValue(workbasketfiltervalue);
    comp.applyFilter(filter);

    expect(mockPaginationService.getPaginationMetadata)
      .toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, {}, { PersonFirstName: 'CaseFirstName' });

    expect(mockSearchService.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, { page: 1 },
      { PersonFirstName: 'CaseFirstName' }, SearchService.VIEW_WORKBASKET);

  });

  it('should pick from existing defaults when local storage is empty', () => {
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
      selected: {
        formGroup: formGroup,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        page: 1,
        metadataFields: ['[META]']
      }
    };
    comp.applyFilter(filter);
    expect(mockPaginationService.getPaginationMetadata)
      .toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, {}, {});

    expect(mockSearchService.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, { page: 1 },
      {}, SearchService.VIEW_WORKBASKET);

  });

  it('should navigate when filter applied', () => {
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
      selected: {
        formGroup: formGroup,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        page: 1,
        metadataFields: ['[META]']
      }
    };
    comp.applyFilter(filter);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list/case'], { queryParams: undefined });

  });

  it('should navigate when reset called', () => {
    comp.applyReset();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list/case']);

  });
});

describe('WorkbasketComponent when no defaults in the profile', () => {

  const TEMPLATE =
    `<div class="global-display">
        <ng-content select="[topBody]"></ng-content>
        <ng-content select="[leftBody]"></ng-content>
        <ng-content select="[rightBody]"></ng-content>
    </div>
    `;

  let BodyComponent: any = MockComponent({ selector: 'cut-body', template: TEMPLATE });

  let WorkbasketFiltersComponent: any = MockComponent({
    selector: 'ccd-workbasket-filters', inputs: [
      'jurisdictions',
      'defaults'
    ], outputs: [
      'onApply'
    ]
  });

  let SearchResultComponent: any = MockComponent({
    selector: 'ccd-search-result', inputs: [
      'caseLinkUrlTemplate',
      'jurisdiction',
      'caseType',
      'caseState',
      'resultView',
      'paginationMetadata',
      'page',
      'caseFilterFG',
      'metadataFields'
    ]
  });

  const JURISDICTIONS = [
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
    },
    navigate: (param) => true
  };

  const $BODY = By.css('div cut-body');

  let comp: WorkbasketComponent;
  let fixture: ComponentFixture<WorkbasketComponent>;
  let de: DebugElement;
  let mockSearchService: any;
  let mockPaginationService: any;
  let mockJurisdictionService: JurisdictionService;
  let alertService: AlertService;
  let windowService;
  let mockRouter;

  beforeEach(async(() => {

    mockSearchService = createSpyObj<SearchService>('searchService', ['search']);
    mockPaginationService = createSpyObj<PaginationService>('paginationService', ['getPaginationMetadata']);
    mockJurisdictionService = createSpyObj<any>('jurisdictionService', ['announceSelectedJurisdiction']);
    alertService = createSpyObj<AlertService>('alertService', ['warning', 'clear']);
    windowService = createSpyObj('windowService', ['setLocalStorage', 'getLocalStorage']);
    mockRouter = createSpyObj<Router>('router', ['navigate']);
    mockRouter.navigate.and.callThrough();

    TestBed
      .configureTestingModule({
        imports: [],
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
          { provide: AlertService, useValue: alertService },
          { provide: WindowService, useValue: windowService },
          { provide: Router, useValue: mockRouter }
        ]
      })
      .compileComponents();  // compile template and css

    fixture = TestBed.createComponent(WorkbasketComponent);
    fixture.detectChanges();

    comp = fixture.componentInstance;

    de = fixture.debugElement;
  }));

  it('should not announce SelectedJurisdiction when no defaults available in the profile', () => {
    let cutBodyEl = de.query($BODY);

    expect(cutBodyEl).not.toBeNull();
    expect(mockJurisdictionService.announceSelectedJurisdiction).not.toHaveBeenCalledWith();
  });

});

describe('WorkbasketComponent when no workbasket defaults in the profile', () => {

  const TEMPLATE =
    `<div class="global-display">
        <ng-content select="[topBody]"></ng-content>
        <ng-content select="[leftBody]"></ng-content>
        <ng-content select="[rightBody]"></ng-content>
    </div>
    `;

  let BodyComponent: any = MockComponent({ selector: 'cut-body', template: TEMPLATE });

  let WorkbasketFiltersComponent: any = MockComponent({
    selector: 'ccd-workbasket-filters', inputs: [
      'jurisdictions',
      'defaults'
    ], outputs: [
      'onApply'
    ]
  });

  let SearchResultComponent: any = MockComponent({
    selector: 'ccd-search-result', inputs: [
      'caseLinkUrlTemplate',
      'jurisdiction',
      'caseType',
      'caseState',
      'resultView',
      'paginationMetadata',
      'page',
      'caseFilterFG',
      'metadataFields'
    ]
  });

  const JURISDICTIONS = [
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
    }
  };

  let mockRoute: any = {
    parent: {
      snapshot: {
        data: {
          profile: PROFILE
        }
      }
    },
    navigate: (param) => true
  };

  const $BODY = By.css('div cut-body');

  let comp: WorkbasketComponent;
  let fixture: ComponentFixture<WorkbasketComponent>;
  let de: DebugElement;
  let mockSearchService: any;
  let mockPaginationService: any;
  let mockJurisdictionService: JurisdictionService;
  let alertService: AlertService;
  let windowService;
  let mockRouter;

  beforeEach(async(() => {

    mockSearchService = createSpyObj<SearchService>('searchService', ['search']);
    mockPaginationService = createSpyObj<PaginationService>('paginationService', ['getPaginationMetadata']);
    mockJurisdictionService = createSpyObj<any>('jurisdictionService', ['announceSelectedJurisdiction']);
    alertService = createSpyObj<AlertService>('alertService', ['warning', 'clear']);
    windowService = createSpyObj('windowService', ['setLocalStorage', 'getLocalStorage']);
    mockRouter = createSpyObj<Router>('router', ['navigate']);
    mockRouter.navigate.and.callThrough();

    TestBed
      .configureTestingModule({
        imports: [],
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
          { provide: AlertService, useValue: alertService },
          { provide: WindowService, useValue: windowService },
          { provide: Router, useValue: mockRouter }
        ]
      })
      .compileComponents();  // compile template and css

    fixture = TestBed.createComponent(WorkbasketComponent);
    fixture.detectChanges();

    comp = fixture.componentInstance;

    de = fixture.debugElement;
  }));

  it('should not announce SelectedJurisdiction when no workbasket defaults available in the profile', () => {
    let cutBodyEl = de.query($BODY);

    expect(cutBodyEl).not.toBeNull();
    expect(mockJurisdictionService.announceSelectedJurisdiction).not.toHaveBeenCalledWith();
  });

});
