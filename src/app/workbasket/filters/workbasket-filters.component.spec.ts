import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { WorkbasketFiltersComponent } from './workbasket-filters.component';
import { By } from '@angular/platform-browser';
import { Jurisdiction } from '../../shared/domain/definition/jurisdiction.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { JurisdictionService } from '../../shared/jurisdiction.service';
import { CaseType } from '../../shared/domain/definition/case-type.model';
import { AlertService } from '../../core/alert/alert.service';
import { WorkbasketInputFilterService } from '../workbasket-input-filter.service';
import { WorkbasketInputModel } from '../workbasket-input.model';
import createSpyObj = jasmine.createSpyObj;
import { AbstractFieldWriteComponent, FieldTypeEnum, OrderService } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'ccd-field-write',
  template: `{{value}}`

})
class FieldWriteComponent extends AbstractFieldWriteComponent {
  @Input()
  formGroup: FormGroup;
}

describe('WorkbasketFiltersComponent', () => {

  const JURISDICTION_1: Jurisdiction = {
    id: 'J1',
    name: 'Jurisdiction 1',
    description: '',
    caseTypes: []
  };

  const CASE_TYPES_1: CaseType[] = [
    {
      id: 'CT0',
      name: 'Case type 0',
      description: '',
      states: [
        {
          id: 'S01',
          name: 'State 01',
          description: ''
        },
        {
          id: 'S02',
          name: 'State 02',
          description: ''
        }
      ],
      events: [],
      case_fields: [],
      jurisdiction: JURISDICTION_1
    }
  ];

  const JURISDICTION_2: Jurisdiction = {
    id: 'J2',
    name: 'Jurisdiction 2',
    description: '',
    caseTypes: []
  };

  const CASE_TYPES_2: CaseType[] = [
    {
      id: 'CT1',
      name: 'Case type 1',
      description: '',
      states: [],
      events: [],
      case_fields: [],
      jurisdiction: JURISDICTION_2
    },
    {
      id: 'CT2',
      name: 'Case type 2',
      description: '',
      states: [
        {
          id: 'S1',
          name: 'State 1',
          description: ''
        },
        {
          id: 'S2',
          name: 'State 2',
          description: ''
        }
      ],
      events: [],
      case_fields: [],
      jurisdiction: JURISDICTION_2
    },
    {
      id: 'CT3',
      name: 'Case type 3',
      description: '',
      states: [],
      events: [],
      case_fields: [],
      jurisdiction: JURISDICTION_2
    }
  ];

  const DEFAULT_CASE_TYPE = CASE_TYPES_2[1];
  const DEFAULT_CASE_STATE = DEFAULT_CASE_TYPE.states[1];

  const CRUD_FILTERED_CASE_TYPES: CaseType[] = [
      {
        id: 'CT1',
        name: 'Case type 1',
        description: '',
        states: [{
          id: 'S1',
          name: 'State 1',
          description: ''
        }],
        events: [],
        case_fields: [],
        jurisdiction: JURISDICTION_1
      },
      {
        id: 'CT3',
        name: 'Case type 3',
        description: '',
        states: [],
        events: [],
        case_fields: [],
        jurisdiction: JURISDICTION_1
      }
  ];
  const EMPTY_CASE_TYPES: CaseType[] = [];
  const CASE_TYPE_WITH_EMPTY_STATES: CaseType[] = [{
    id: 'CT3',
    name: 'Case type 3',
    description: '',
    states: [],
    events: [],
    case_fields: [],
    jurisdiction: JURISDICTION_1
  }];

  const TEST_WORKBASKET_INPUTS: WorkbasketInputModel[] = [
    createWBInput('Label 1', 1, 'PersonFirstName', 'Text', false),
    createWBInput('Label 2', 2, 'PersonLastName', 'Text', true)
  ];

  const METADATA_FIELDS = ['PersonLastName'];

  const $APPLY_BUTTON = By.css('button');

  let fixture: ComponentFixture<WorkbasketFiltersComponent>;
  let component: WorkbasketFiltersComponent;
  let de: DebugElement;

  let workbasketHandler;
  let router: any;
  let activatedRoute: any;
  let jurisdictionService: JurisdictionService;
  let workbasketInputFilterService: any;
  let orderService: any;
  let alertService: AlertService;

  const TEST_FORM_GROUP = new FormGroup({});

  describe('with defaults', () => {
    beforeEach(async(() => {
      workbasketHandler = createSpyObj('workbasketHandler', ['applyFilters']);
      router = createSpyObj<Router>('router', ['navigate']);
      router.navigate.and.returnValue(Promise.resolve('someResult'));
      alertService = createSpyObj<AlertService>('alertService', ['isPreserveAlerts', 'setPreserveAlerts']);
      orderService = createSpyObj('orderService', ['sortAsc']);
      workbasketInputFilterService = createSpyObj<WorkbasketInputFilterService>('workbasketInputFilterService', ['getWorkbasketInputs']);
      workbasketInputFilterService.getWorkbasketInputs.and.returnValue(createObservableFrom(TEST_WORKBASKET_INPUTS));
      jurisdictionService = new JurisdictionService();
      resetCaseTypes(JURISDICTION_2, CASE_TYPES_2);
      activatedRoute = {
        queryParams: Observable.of({}),
        snapshot: {
          queryParams: {}
        }
      };

      TestBed
        .configureTestingModule({
          imports: [
            FormsModule,
            ReactiveFormsModule
          ],
          declarations: [
            WorkbasketFiltersComponent,
            FieldWriteComponent
          ],
          providers: [
            { provide: Router, useValue: router },
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: OrderService, useValue: orderService },
            { provide: WorkbasketInputFilterService, useValue: workbasketInputFilterService },
            { provide: JurisdictionService, useValue: jurisdictionService },
            { provide: AlertService, useValue: alertService },
          ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(WorkbasketFiltersComponent);
          component = fixture.componentInstance;

          component.jurisdictions = [
            JURISDICTION_1,
            JURISDICTION_2
          ];
          component.formGroup = TEST_FORM_GROUP;
          component.defaults = {
            jurisdiction_id: JURISDICTION_2.id,
            case_type_id: DEFAULT_CASE_TYPE.id,
            state_id: DEFAULT_CASE_STATE.id
          };
          component.onApply.subscribe(workbasketHandler.applyFilters);

          de = fixture.debugElement;
          fixture.detectChanges();
        });
    }));

    it('should have an Apply button disabled when case type is set but state is not set', async(() => {
      component.selected.jurisdiction = JURISDICTION_2;
      component.selected.caseType = CASE_TYPES_2[2];
      component.selected.caseState = null;

      fixture.detectChanges();
      let button = de.query($APPLY_BUTTON);
      expect(button.nativeElement.disabled).toBeTruthy();
    }));

    it('should have an Apply button disabled when case type is not set', async(() => {
      component.selected.jurisdiction = JURISDICTION_2;
      component.selected.caseType = null;
      component.selected.caseState = null;
      fixture.detectChanges();

      let button = de.query($APPLY_BUTTON);
      expect(button.nativeElement.disabled).toBeTruthy();
    }));

    it('should initialise jurisdiction selector with given jurisdictions', () => {
      let selector = de.query(By.css('#wb-jurisdiction'));

      expect(selector.children.length).toEqual(2);

      let juris1 = selector.children[0];
      expect(juris1.nativeElement.textContent).toEqual(JURISDICTION_1.name);

      let juris2 = selector.children[1];
      expect(juris2.nativeElement.textContent).toEqual(JURISDICTION_2.name);
    });

    it('should initially select jurisdiction based on defaults', () => {
      let selector = de.query(By.css('#wb-jurisdiction'));

      expect(selector.nativeElement.selectedIndex).toEqual(1);
      expect(component.selected.jurisdiction).toBe(JURISDICTION_2);
    });

    it('should update selected jurisdiction', async(() => {
      component.selected.jurisdiction = JURISDICTION_1;
      fixture.detectChanges();

      fixture
        .whenStable()
        .then(() => {
          let selector = de.query(By.css('#wb-jurisdiction'));
          expect(selector.nativeElement.selectedIndex).toEqual(0);
          expect(component.selected.jurisdiction).toBe(JURISDICTION_1);
        });
    }));

    it('should initialise case type selector with types from selected jurisdiction', () => {
      let selector = de.query(By.css('#wb-case-type'));

      expect(selector.children.length).toEqual(3);

      let ct1 = selector.children[0];
      expect(ct1.nativeElement.textContent).toEqual(CASE_TYPES_2[0].name);

      let ct2 = selector.children[1];
      expect(ct2.nativeElement.textContent).toEqual(DEFAULT_CASE_TYPE.name);

      let ct3 = selector.children[2];
      expect(ct3.nativeElement.textContent).toEqual(CASE_TYPES_2[2].name);
    });

    it('should initially select case type based on default', () => {
      let selector = de.query(By.css('#wb-case-type'));

      expect(selector.nativeElement.selectedIndex).toEqual(1);
      expect(component.selected.caseType).toBe(DEFAULT_CASE_TYPE);
    });

    it('should update selected case type', async(() => {
      component.selected.caseType = CASE_TYPES_2[2];
      fixture.detectChanges();

      fixture
        .whenStable()
        .then(() => {
          let selector = de.query(By.css('#wb-case-type'));
          expect(selector.nativeElement.selectedIndex).toEqual(2);
          expect(component.selected.caseType).toBe(CASE_TYPES_2[2]);
        });
    }));

    it('should initialise case state selector with states from selected case type', () => {
      let selector = de.query(By.css('#wb-case-state'));

      expect(selector.children.length).toEqual(2);

      let cs1 = selector.children[0];
      expect(cs1.nativeElement.textContent).toEqual(DEFAULT_CASE_TYPE.states[0].name);

      let cs2 = selector.children[1];
      expect(cs2.nativeElement.textContent).toEqual(DEFAULT_CASE_STATE.name);
      expect(orderService.sortAsc).toHaveBeenCalled();
    });

    it('should initially select case state based on default', () => {
      let selector = de.query(By.css('#wb-case-state'));

      expect(selector.nativeElement.selectedIndex).toEqual(1);
      expect(component.selected.caseState).toBe(DEFAULT_CASE_TYPE.states[1]);
      expect(orderService.sortAsc).toHaveBeenCalled();
    });

    it('should update selected case state', async(() => {
      component.selected.caseState = DEFAULT_CASE_TYPE.states[0];
      fixture.detectChanges();

      fixture
        .whenStable()
        .then(() => {
          let selector = de.query(By.css('#wb-case-state'));
          expect(selector.nativeElement.selectedIndex).toEqual(0);
          expect(component.selected.caseState).toBe(DEFAULT_CASE_TYPE.states[0]);
        });
    }));

    it('should submit filters when defaults could be selected, preserving the alerts', () => {
      expect(workbasketHandler.applyFilters).toHaveBeenCalledWith({
        jurisdiction: JURISDICTION_2,
        caseType: DEFAULT_CASE_TYPE,
        caseState: DEFAULT_CASE_STATE,
        init: false,
        page: 1,
        formGroup: jasmine.any(Object),
        metadataFields: METADATA_FIELDS
      });

      expect(workbasketHandler.applyFilters).toHaveBeenCalledTimes(1);

      expect(alertService.setPreserveAlerts).toHaveBeenCalledWith(true);
    });

    it('should submit filters when apply button is clicked, not preserving the alerts', () => {
      workbasketHandler.applyFilters.calls.reset();

      let button = de.query(By.css('button'));
      button.nativeElement.click();

      expect(workbasketHandler.applyFilters).toHaveBeenCalledWith({
        jurisdiction: JURISDICTION_2,
        caseType: DEFAULT_CASE_TYPE,
        caseState: DEFAULT_CASE_STATE,
        init: true,
        page: 1,
        formGroup: jasmine.any(Object),
        metadataFields: METADATA_FIELDS
      });
      expect(workbasketHandler.applyFilters).toHaveBeenCalledTimes(1);
      expect(alertService.setPreserveAlerts).toHaveBeenCalledWith(false);
    });

    it('should reset searchFilters when Jurisdiction changes even when Apply button is disabled', async(() => {
      component.selected.jurisdiction = JURISDICTION_2;
      component.selected.caseType = null;
      component.selected.caseState = null;
      fixture.detectChanges();

      let button = de.query($APPLY_BUTTON);
      fixture
        .whenStable()
        .then(() => {

        expect(button.nativeElement.disabled).toBeTruthy();

        component.selected.jurisdiction = JURISDICTION_1;
        component.onJurisdictionIdChange();
        expect(component.workbasketInputsReady).toBeFalsy();
      });
    }));

    it('should have form group details added when apply button is clicked ', async(() => {
      component.selected.jurisdiction = JURISDICTION_2;
      component.apply(true);
      expect(workbasketHandler.applyFilters).toHaveBeenCalledWith(component.selected);
      expect(component.selected.formGroup.value).toEqual(TEST_FORM_GROUP.value);
    }));

    it('should have metadata fields added when apply button is clicked', async(() => {
      component.workbasketInputs = TEST_WORKBASKET_INPUTS;

      component.apply(true);

      expect(component.selected.metadataFields).toEqual(METADATA_FIELDS);
    }));

    it('should update search input when case type is reset', async(() => {
      component.selected.jurisdiction = JURISDICTION_2;
      component.selected.caseType = CASE_TYPES_2[1];
      component.selected.caseState = CASE_TYPES_2[1].states[0];
      workbasketInputFilterService.getWorkbasketInputs.and.returnValue(Observable.of([]));

      component.onCaseTypeIdChange();
      expect(workbasketInputFilterService.getWorkbasketInputs).toHaveBeenCalledWith(JURISDICTION_2.id, CASE_TYPES_2[1].id);
    }));

    it('should order search inputs', async(() => {
      component.selected.jurisdiction = JURISDICTION_2;
      component.selected.caseType = CASE_TYPES_2[2];
      component.onCaseTypeIdChange();
      expect(orderService.sortAsc).toHaveBeenCalled();
    }));

    it('should render an input for each defined search input', () => {
      component.selected.jurisdiction = JURISDICTION_2;
      component.selected.caseType = CASE_TYPES_2[1];
      component.selected.caseState = CASE_TYPES_2[1].states[0];

      component.onCaseTypeIdChange();
      fixture.detectChanges();

      let dynamicFilters = de.query(By.css('#dynamicFilters'));

      expect(dynamicFilters.children.length).toBe(TEST_WORKBASKET_INPUTS.length);
    });

    it('should render a valid search input field component', () => {
      component.selected.jurisdiction = JURISDICTION_2;
      component.selected.caseType = CASE_TYPES_2[1];
      component.selected.caseState = CASE_TYPES_2[1].states[0];

      component.onCaseTypeIdChange();
      fixture.detectChanges();

      let firstInput = TEST_WORKBASKET_INPUTS[0];

      let dynamicFilters = de.query(By.css('#dynamicFilters'));

      let writeField = dynamicFilters.query(By.directive(FieldWriteComponent));

      let writeFieldInstance = writeField.componentInstance;

      expect(writeFieldInstance.caseField).toEqual(firstInput.field);
      expect(writeFieldInstance.caseField.label).toEqual(firstInput.field.label);
      expect(writeFieldInstance.formGroup).toBeTruthy();
    });

    it('should submit filters when apply button is clicked', async(() => {
      let control =  new FormControl('test');
      control.setValue('anything');
      const formControls = {
        'name': control
      };
      let formGroup = new FormGroup(formControls);
      component.formGroup = formGroup;
      component.selected.jurisdiction = JURISDICTION_2;
      component.selected.caseType = CASE_TYPES_2[2];
      component.selected.caseState = DEFAULT_CASE_STATE;

      workbasketHandler.applyFilters.calls.reset();

      let button = de.query(By.css('button'));
      button.nativeElement.click();

      let arg: any = workbasketHandler.applyFilters.calls.mostRecent().args[0];
      expect(workbasketHandler.applyFilters).toHaveBeenCalledWith(component.selected);
      expect(arg['jurisdiction']).toEqual(JURISDICTION_2);
      expect(arg['caseType']).toEqual(CASE_TYPES_2[2]);
      expect(arg['formGroup'].value).toEqual(formGroup.value);
      expect(workbasketHandler.applyFilters).toHaveBeenCalledTimes(1);
    }));
  });

  describe('with defaults and CRUD', () => {
    beforeEach(async(() => {
      workbasketHandler = createSpyObj('workbasketHandler', ['applyFilters']);
      router = createSpyObj<Router>('router', ['navigate']);
      router.navigate.and.returnValue(Promise.resolve('someResult'));
      alertService = createSpyObj<AlertService>('alertService', ['isPreserveAlerts', 'setPreserveAlerts']);
      resetCaseTypes(JURISDICTION_2, CRUD_FILTERED_CASE_TYPES);
      orderService = createSpyObj('orderService', ['sortAsc']);
      workbasketInputFilterService = createSpyObj<WorkbasketInputFilterService>('workbasketInputFilterService', ['getWorkbasketInputs']);
      workbasketInputFilterService.getWorkbasketInputs.and.returnValue(createObservableFrom(TEST_WORKBASKET_INPUTS));
      jurisdictionService = new JurisdictionService();
      activatedRoute = {
        queryParams: Observable.of({}),
        snapshot: {
          queryParams: {}
        }
      };

      TestBed
        .configureTestingModule({
          imports: [
            FormsModule,
            ReactiveFormsModule
          ],
          declarations: [
            WorkbasketFiltersComponent,
            FieldWriteComponent
          ],
          providers: [
            { provide: Router, useValue: router },
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: OrderService, useValue: orderService },
            { provide: WorkbasketInputFilterService, useValue: workbasketInputFilterService },
            { provide: JurisdictionService, useValue: jurisdictionService },
            { provide: AlertService, useValue: alertService }
          ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(WorkbasketFiltersComponent);
          component = fixture.componentInstance;
          component.jurisdictions = [
            JURISDICTION_1,
            JURISDICTION_2
          ];
          component.formGroup = TEST_FORM_GROUP;
          component.defaults = {
            jurisdiction_id: JURISDICTION_2.id,
            case_type_id: CASE_TYPES_2[1].id,
            state_id: CASE_TYPES_2[1].states[1].id
          };
          component.onApply.subscribe(workbasketHandler.applyFilters);

          de = fixture.debugElement;
          fixture.detectChanges();
        });
    }));

    it('should populate case types drop down with CRUD filtered case types and sort states', async(() => {
      component.onJurisdictionIdChange();
      fixture.detectChanges();

      fixture
        .whenStable()
        .then(() => {
          let selector = de.query(By.css('#wb-case-type'));
          expect(selector.children.length).toEqual(2);

          let juris1 = selector.children[0];
          expect(juris1.nativeElement.textContent).toEqual(CRUD_FILTERED_CASE_TYPES[0].name);

          let juris2 = selector.children[1];
          expect(juris2.nativeElement.textContent).toEqual(CRUD_FILTERED_CASE_TYPES[1].name);

          expect(orderService.sortAsc).toHaveBeenCalled();
        });
    }));

    it('should select first case type from a case types drop down if default is filtered out due to CRUD', async(() => {
      let selector = de.query(By.css('#wb-case-type'));

      expect(selector.nativeElement.selectedIndex).toEqual(0);
      expect(component.selected.caseType).toBe(CRUD_FILTERED_CASE_TYPES[0]);
    }));

    it('should select first state from a states drop down if default is filtered out due to CRUD', async(() => {
      let selector = de.query(By.css('#wb-case-state'));

      expect(selector.nativeElement.selectedIndex).toEqual(0);
      expect(component.selected.caseState).toBe(CRUD_FILTERED_CASE_TYPES[0].states[0]);
    }));
  });

  describe('with defaults and CRUD and empty case types', () => {
    beforeEach(async(() => {
      workbasketHandler = createSpyObj('workbasketHandler', ['applyFilters']);
      router = createSpyObj<Router>('router', ['navigate']);
      router.navigate.and.returnValue(Promise.resolve('someResult'));
      alertService = createSpyObj<AlertService>('alertService', ['isPreserveAlerts', 'setPreserveAlerts']);
      resetCaseTypes(JURISDICTION_2, EMPTY_CASE_TYPES);
      orderService = createSpyObj('orderService', ['sortAsc']);
      workbasketInputFilterService = createSpyObj<WorkbasketInputFilterService>('workbasketInputFilterService', ['getWorkbasketInputs']);
      workbasketInputFilterService.getWorkbasketInputs.and.returnValue(createObservableFrom(TEST_WORKBASKET_INPUTS));
      jurisdictionService = new JurisdictionService();
      activatedRoute = {
        queryParams: Observable.of({}),
        snapshot: {
          queryParams: {}
        }
      };

      TestBed
        .configureTestingModule({
          imports: [
            FormsModule,
            ReactiveFormsModule
          ],
          declarations: [
            WorkbasketFiltersComponent,
            FieldWriteComponent
          ],
          providers: [
            { provide: Router, useValue: router },
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: OrderService, useValue: orderService },
            { provide: WorkbasketInputFilterService, useValue: workbasketInputFilterService },
            { provide: JurisdictionService, useValue: jurisdictionService },
            { provide: AlertService, useValue: alertService }
          ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(WorkbasketFiltersComponent);
          component = fixture.componentInstance;

          component.jurisdictions = [
            JURISDICTION_1,
            JURISDICTION_2
          ];
          component.formGroup = TEST_FORM_GROUP;
          component.defaults = {
            jurisdiction_id: JURISDICTION_2.id,
            case_type_id: CRUD_FILTERED_CASE_TYPES[0].id,
            state_id: CRUD_FILTERED_CASE_TYPES[0].states[0].id
          };
          component.onApply.subscribe(workbasketHandler.applyFilters);

          de = fixture.debugElement;
          fixture.detectChanges();
        });
    }));

    it('should disable case type dropdown if default is filtered out due to CRUD and no other case types', async(() => {
      let caseTypeSelector = de.query(By.css('#wb-case-type'));
      expect(caseTypeSelector.nativeElement.disabled).toBeTruthy();

      let stateSelector = de.query(By.css('#wb-case-state'));
      expect(stateSelector.nativeElement.disabled).toBeTruthy();

      expect(orderService.sortAsc).not.toHaveBeenCalled();
    }));
  });

  describe('with defaults and CRUD and type with empty case states', () => {
    beforeEach(async(() => {
      workbasketHandler = createSpyObj('workbasketHandler', ['applyFilters']);
      router = createSpyObj<Router>('router', ['navigate']);
      router.navigate.and.returnValue(Promise.resolve('someResult'));
      alertService = createSpyObj<AlertService>('alertService', ['isPreserveAlerts', 'setPreserveAlerts']);
      resetCaseTypes(JURISDICTION_2, CASE_TYPE_WITH_EMPTY_STATES);
      orderService = createSpyObj('orderService', ['sortAsc']);
      workbasketInputFilterService = createSpyObj<WorkbasketInputFilterService>('workbasketInputFilterService', ['getWorkbasketInputs']);
      workbasketInputFilterService.getWorkbasketInputs.and.returnValue(createObservableFrom(TEST_WORKBASKET_INPUTS));
      jurisdictionService = new JurisdictionService();
      activatedRoute = {
        queryParams: Observable.of({}),
        snapshot: {
          queryParams: {}
        }
      };

      TestBed
        .configureTestingModule({
          imports: [
            FormsModule,
            ReactiveFormsModule
          ],
          declarations: [
            WorkbasketFiltersComponent,
            FieldWriteComponent
          ],
          providers: [
            { provide: Router, useValue: router },
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: OrderService, useValue: orderService },
            { provide: WorkbasketInputFilterService, useValue: workbasketInputFilterService },
            { provide: JurisdictionService, useValue: jurisdictionService },
            { provide: AlertService, useValue: alertService }
          ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(WorkbasketFiltersComponent);
          component = fixture.componentInstance;

          component.jurisdictions = [
            JURISDICTION_1,
            JURISDICTION_2
          ];
          component.formGroup = TEST_FORM_GROUP;
          component.defaults = {
            jurisdiction_id: JURISDICTION_2.id,
            case_type_id: CRUD_FILTERED_CASE_TYPES[1].id,
            state_id: CRUD_FILTERED_CASE_TYPES[0].states[0].id
          };
          component.onApply.subscribe(workbasketHandler.applyFilters);

          de = fixture.debugElement;
          fixture.detectChanges();
        });
    }));

    it('should disable states dropdown if default is filtered out due to CRUD and no other states', async(() => {
      let caseTypeSelector = de.query(By.css('#wb-case-type'));
      expect(caseTypeSelector.nativeElement.disabled).toBeFalsy();
      expect(caseTypeSelector.nativeElement.selectedIndex).toEqual(0);
      expect(component.selected.caseType).toBe(CASE_TYPE_WITH_EMPTY_STATES[0]);

      let stateSelector = de.query(By.css('#wb-case-state'));
      expect(stateSelector.nativeElement.disabled).toBeTruthy();
      expect(orderService.sortAsc).not.toHaveBeenCalled();
    }));
  });

  describe('with query parameters', () => {

    const QUERY_PARAMS = {
      [WorkbasketFiltersComponent.PARAM_JURISDICTION]: 'J1',
      [WorkbasketFiltersComponent.PARAM_CASE_TYPE]: 'CT0',
      [WorkbasketFiltersComponent.PARAM_CASE_STATE]: 'S02'
    };

    beforeEach(async(() => {
      workbasketHandler = createSpyObj('workbasketHandler', ['applyFilters']);
      router = createSpyObj<Router>('router', ['navigate']);
      router.navigate.and.returnValue(Promise.resolve('someResult'));
      resetCaseTypes(JURISDICTION_1, CASE_TYPES_1);
      orderService = createSpyObj('orderService', ['sortAsc']);
      workbasketInputFilterService = createSpyObj<WorkbasketInputFilterService>('workbasketInputFilterService', ['getWorkbasketInputs']);
      workbasketInputFilterService.getWorkbasketInputs.and.returnValue(createObservableFrom(TEST_WORKBASKET_INPUTS));
      alertService = createSpyObj<AlertService>('alertService', ['isPreserveAlerts', 'setPreserveAlerts']);
      activatedRoute = {
        queryParams: Observable.of(QUERY_PARAMS),
        snapshot: {
          queryParams: QUERY_PARAMS
        }
      };

      TestBed
        .configureTestingModule({
          imports: [
            FormsModule,
            ReactiveFormsModule
          ],
          declarations: [
            WorkbasketFiltersComponent,
            FieldWriteComponent
          ],
          providers: [
            { provide: Router, useValue: router },
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: OrderService, useValue: orderService },
            { provide: WorkbasketInputFilterService, useValue: workbasketInputFilterService },
            { provide: JurisdictionService, useValue: jurisdictionService },
            { provide: AlertService, useValue: alertService },
          ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(WorkbasketFiltersComponent);
          component = fixture.componentInstance;

          component.jurisdictions = [
            JURISDICTION_1,
            JURISDICTION_2
          ];
          component.formGroup = TEST_FORM_GROUP;
          component.defaults = {
            jurisdiction_id: JURISDICTION_2.id,
            case_type_id: DEFAULT_CASE_TYPE.id,
            state_id: DEFAULT_CASE_STATE.id
          };
          component.onApply.subscribe(workbasketHandler.applyFilters);

          de = fixture.debugElement;
          fixture.detectChanges();
        });
    }));

    it('should initially select jurisdiction based on query parameter', () => {
      expect(component.selected.jurisdiction).toBe(JURISDICTION_1);
    });

    it('should initially select case type based on query parameter', () => {
      expect(component.selected.caseType).toBe(CASE_TYPES_1[0]);
    });

    it('should initially select case state based on query parameter', () => {
      expect(component.selected.caseState).toBe(CASE_TYPES_1[0].states[1]);
    });

    it('should save filters as query parameters when apply button is clicked', () => {
      let button = de.query(By.css('button'));
      button.nativeElement.click();

      expect(router.navigate).toHaveBeenCalledWith(['/list/case'], {
        queryParams: {
          [WorkbasketFiltersComponent.PARAM_JURISDICTION]: JURISDICTION_1.id,
          [WorkbasketFiltersComponent.PARAM_CASE_TYPE]: CASE_TYPES_1[0].id,
          [WorkbasketFiltersComponent.PARAM_CASE_STATE]: CASE_TYPES_1[0].states[1].id,
        }
      });
    });
  });

  describe('with invalid query parameters: jurisdiction and empty case types', () => {

    const QUERY_PARAMS = {
      [WorkbasketFiltersComponent.PARAM_JURISDICTION]: 'FALSE',
      [WorkbasketFiltersComponent.PARAM_CASE_TYPE]: 'CT0',
      [WorkbasketFiltersComponent.PARAM_CASE_STATE]: 'S02'
    };

    beforeEach(async(() => {
      workbasketHandler = createSpyObj('workbasketHandler', ['applyFilters']);
      router = createSpyObj<Router>('router', ['navigate']);
      router.navigate.and.returnValue(Promise.resolve('someResult'));
      alertService = createSpyObj<AlertService>('alertService', ['isPreserveAlerts', 'setPreserveAlerts']);
      resetCaseTypes(JURISDICTION_2, EMPTY_CASE_TYPES);
      orderService = createSpyObj('orderService', ['sortAsc']);
      workbasketInputFilterService = createSpyObj<WorkbasketInputFilterService>('workbasketInputFilterService', ['getWorkbasketInputs']);
      workbasketInputFilterService.getWorkbasketInputs.and.returnValue(createObservableFrom(TEST_WORKBASKET_INPUTS));
      activatedRoute = {
        queryParams: Observable.of(QUERY_PARAMS),
        snapshot: {
          queryParams: QUERY_PARAMS
        }
      };

      TestBed
        .configureTestingModule({
          imports: [
            FormsModule,
            ReactiveFormsModule
          ],
          declarations: [
            WorkbasketFiltersComponent,
            FieldWriteComponent
          ],
          providers: [
            { provide: Router, useValue: router },
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: OrderService, useValue: orderService },
            { provide: WorkbasketInputFilterService, useValue: workbasketInputFilterService },
            { provide: JurisdictionService, useValue: jurisdictionService },
            { provide: AlertService, useValue: alertService }
          ]
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(WorkbasketFiltersComponent);
          component = fixture.componentInstance;

          component.jurisdictions = [
            JURISDICTION_1,
            JURISDICTION_2
          ];
          component.formGroup = TEST_FORM_GROUP;
          component.defaults = {
            jurisdiction_id: JURISDICTION_2.id,
            case_type_id: DEFAULT_CASE_TYPE.id,
            state_id: DEFAULT_CASE_STATE.id
          };
          component.onApply.subscribe(workbasketHandler.applyFilters);

          de = fixture.debugElement;
          fixture.detectChanges();
        });
    }));

    it('should initially NOT select anything if jurisdiction is invalid and no case types', () => {
      expect(component.selected.jurisdiction).toBeUndefined();
      expect(component.selected.caseType).toBeUndefined();
      expect(component.selected.caseState).toBeUndefined();
    });
  });
});

function resetCaseTypes(jurisdiction: Jurisdiction, caseTypes: CaseType[]) {
  jurisdiction.caseTypes.splice(0, jurisdiction.caseTypes.length);
  caseTypes.forEach(caseType => jurisdiction.caseTypes.push(caseType));
}

function createObservableFrom<T>(param: T): Observable<T> {
  return Observable.create(observer => {
    observer.next(param);
    observer.complete();
  });
}

function createWBInput(theLabel: string, theOrder: number, theId: string,
                       theType: FieldTypeEnum, theMetadata: boolean): WorkbasketInputModel {
  return {
    label: theLabel,
    order: theOrder,
    field: {
      id: theId,
      field_type: {
        id: theType,
        type: theType
      },
      metadata: theMetadata
    }
  }
}
