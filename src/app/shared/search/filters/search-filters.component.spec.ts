import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { SearchFiltersComponent } from './search-filters.component';
import { By } from '@angular/platform-browser';
import { Jurisdiction } from '../../domain/definition/jurisdiction.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../../core/search/search.service';
import { Observable } from 'rxjs/Rx';
import { SearchInput } from '../../../core/search/search-input.model';
import { OrderService } from '../../../core/order/order.service';
import { AbstractFieldWriteComponent } from '../../palette/base-field/abstract-field-write.component';
import { JurisdictionService } from '../../jurisdiction.service';
import { READ_ACCESS } from '../../../shared/domain/case-view/access-types.model';

import createSpyObj = jasmine.createSpyObj;
import { DefinitionsService } from '../../../core/definitions/definitions.service';
import { CaseType } from '../../domain/definition/case-type.model';

const JURISDICTION_1: Jurisdiction = {
  id: 'J1',
  name: 'Jurisdiction 1',
  description: ''
};
const CASE_TYPE_1: CaseType = {
  id: 'CT0',
  name: 'Case type 0',
  description: '',
  states: [],
  events: [],
  case_fields: [],
  jurisdiction: JURISDICTION_1
};
const JURISDICTION_2: Jurisdiction = {
  id: 'J2',
  name: 'Jurisdiction 2',
  description: ''
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

const CRUD_FILTERED_CASE_TYPES: CaseType[] = [
  {
    id: 'CT1',
    name: 'Case type 1',
    description: '',
    states: [],
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

const TEST_SEARCH_INPUTS: SearchInput[] = [
  {
    label: 'Label 1',
    order: 1,
    field: {
      id: 'PersonFirstName',
      field_type: {
        id: 'Text',
        type: 'Text'
      }
    }
  },
  {
    label: 'Label 2',
    order: 2,
    field: {
      id: 'PersonLastName',
      field_type: {
        id: 'Text',
        type: 'Text'
      }
    }
  }
];

@Component({
  selector: 'ccd-field-write',
  template: `{{value}}`

})
class FieldWriteComponent extends AbstractFieldWriteComponent {
  @Input()
  formGroup: FormGroup;
}

function createObservableFrom<T>(param: T): Observable<T> {
  return Observable.create(observer => {
    observer.next(param);
    observer.complete();
  });
}

let searchHandler;
let mockSearchService;
let orderService;
let definitionsService;

const TEST_FORM_GROUP = new FormGroup({});

describe('SearchFiltersComponent', () => {

  let fixture: ComponentFixture<SearchFiltersComponent>;
  let component: SearchFiltersComponent;
  let de: DebugElement;
  let jurisdictionService: JurisdictionService;

  beforeEach(async(() => {

    searchHandler = createSpyObj('searchHandler', ['applyFilters']);
    mockSearchService = createSpyObj('mockSearchService', ['getSearchInputs']);
    definitionsService = createSpyObj<DefinitionsService>('definitionsService', ['getCaseTypes']);
    definitionsService.getCaseTypes.and.returnValue(Observable.of(CASE_TYPES_2));
    orderService = createSpyObj('orderService', ['sortAsc']);
    jurisdictionService = new JurisdictionService();

    TestBed
      .configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule
        ],
        declarations: [
          SearchFiltersComponent,
          FieldWriteComponent
        ], providers: [
          { provide: SearchService, useValue: mockSearchService },
          { provide: OrderService, useValue: orderService },
          { provide: JurisdictionService, useValue: jurisdictionService },
          { provide: DefinitionsService, useValue: definitionsService }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(SearchFiltersComponent);
    component = fixture.componentInstance;

    component.formGroup = TEST_FORM_GROUP;
    component.jurisdictions = [
      JURISDICTION_1,
      JURISDICTION_2
    ];
    component.onApply.subscribe(searchHandler.applyFilters);

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should select the jurisdiction if there is only one jurisdiction', () => {
    mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
    component.jurisdictions = [JURISDICTION_1];
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.selected.jurisdiction).toBe(JURISDICTION_1);
  });

  it('should select the caseType if there is only one caseType', () => {
    definitionsService.getCaseTypes.and.returnValue(Observable.of([CASE_TYPE_1]));
    mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
    component.jurisdictions = [JURISDICTION_1];
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.selected.jurisdiction).toBe(JURISDICTION_1);
    expect(component.selected.caseType).toBe(CASE_TYPE_1);
  });

  it('should initialise jurisdiction selector with given jurisdictions', () => {
    let selector = de.query(By.css('#s-jurisdiction'));

    expect(selector.children.length).toEqual(2);

    let juris1 = selector.children[0];
    expect(juris1.nativeElement.textContent).toEqual(JURISDICTION_1.name);

    let juris2 = selector.children[1];
    expect(juris2.nativeElement.textContent).toEqual(JURISDICTION_2.name);
  });

  it('should update and announce selected jurisdiction', async(() => {
    mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
    component.selected.jurisdiction = JURISDICTION_1;
    component.onJurisdictionIdChange();
    fixture.detectChanges();

    let selector = de.query(By.css('#s-jurisdiction'));
    fixture
      .whenStable()
      .then(() => {
        expect(selector.nativeElement.selectedIndex).toEqual(0);
        expect(component.selected.jurisdiction).toBe(JURISDICTION_1);
        expect(definitionsService.getCaseTypes).toHaveBeenCalledWith(JURISDICTION_1.id, READ_ACCESS);
      });
  }));

  it('should populate case types dropdown with CRUD filtered case types', async(() => {
      let selector = de.query(By.css('#s-case-type'));
      expect(selector.children.length).toEqual(0);

      definitionsService.getCaseTypes.and.returnValue(Observable.of(CRUD_FILTERED_CASE_TYPES));
      component.selected.jurisdiction = JURISDICTION_1;
      component.onJurisdictionIdChange();
      fixture.detectChanges();

      fixture
        .whenStable()
        .then(() => {
          expect(selector.children.length).toEqual(2);

          let juris1 = selector.children[0];
          expect(juris1.nativeElement.textContent).toEqual(CRUD_FILTERED_CASE_TYPES[0].name);

          let juris2 = selector.children[1];
          expect(juris2.nativeElement.textContent).toEqual(CRUD_FILTERED_CASE_TYPES[1].name);
      });
  }));

  it('should initialise case type selector with types from selected jurisdiction', () => {
    component.selected.jurisdiction = JURISDICTION_2;
    component.onJurisdictionIdChange();
    fixture.detectChanges();

    expect(definitionsService.getCaseTypes).toHaveBeenCalledWith(JURISDICTION_2.id, READ_ACCESS);

    let selector = de.query(By.css('#s-case-type'));

    expect(selector.children.length).toEqual(3);

    let ct1 = selector.children[0];
    expect(ct1.nativeElement.textContent).toEqual(CASE_TYPES_2[0].name);

    let ct2 = selector.children[1];
    expect(ct2.nativeElement.textContent).toEqual(CASE_TYPES_2[1].name);

    let ct3 = selector.children[2];
    expect(ct3.nativeElement.textContent).toEqual(CASE_TYPES_2[2].name);
  });

  it('should update selected case type', async(() => {
    component.selected.jurisdiction = JURISDICTION_2;
    component.selectedJurisdictionCaseTypes = CASE_TYPES_2;
    component.selected.caseType = CASE_TYPES_2[2];
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        let selector = de.query(By.css('#s-case-type'));
        expect(selector.nativeElement.selectedIndex).toEqual(2);
        expect(component.selected.caseType).toBe(CASE_TYPES_2[2]);
      });
  }));

  it('should have an apply button enabled when case type is set', async(() => {
    component.selected.jurisdiction = JURISDICTION_2;
    component.selected.caseType = CASE_TYPES_2[2];
    mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
    component.onCaseTypeIdChange();
    fixture.detectChanges();
    let button = de.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();

  }));

  it('should have an apply button disabled nor search inputs retrieved when case type is not set', async(() => {
    component.selected.jurisdiction = JURISDICTION_2;
    fixture.detectChanges();

    let button = de.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
    expect(mockSearchService.getSearchInputs).toHaveBeenCalledTimes(0);
  }));

  it('should have form group details added when apply button is clicked ', async(() => {
    component.selected.jurisdiction = JURISDICTION_2;
    component.apply();
    expect(searchHandler.applyFilters).toHaveBeenCalledWith(component.selected);
    expect(component.selected.formGroup.value).toEqual(TEST_FORM_GROUP.value);
  }));

  it('should update search input when case type is reset', async(() => {
    component.selected.jurisdiction = JURISDICTION_2;
    component.selected.caseType = CASE_TYPES_2[2];
    mockSearchService.getSearchInputs.and.returnValue(Observable.of([]));

    component.onCaseTypeIdChange();
    expect(mockSearchService.getSearchInputs).toHaveBeenCalledWith(JURISDICTION_2.id, CASE_TYPES_2[2].id);
  }));

  it('should order search inputs', async(() => {
    component.selected.jurisdiction = JURISDICTION_2;
    component.selected.caseType = CASE_TYPES_2[2];
    mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));

    component.onCaseTypeIdChange();

    expect(orderService.sortAsc).toHaveBeenCalled();
  }));

  it('should render an input for each defined search input', () => {
    component.selected.jurisdiction = JURISDICTION_2;
    component.selected.caseType = CASE_TYPES_2[2];
    mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));

    component.onCaseTypeIdChange();
    fixture.detectChanges();

    let dynamicFilters = de.query(By.css('#dynamicFilters'));

    expect(dynamicFilters.children.length).toBe(TEST_SEARCH_INPUTS.length);
  });

  it('should render a valid search input field component', () => {
    component.selected.jurisdiction = JURISDICTION_2;
    component.selected.caseType = CASE_TYPES_2[2];
    mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));

    component.onCaseTypeIdChange();
    fixture.detectChanges();

    let firstInput = TEST_SEARCH_INPUTS[0];

    let dynamicFilters = de.query(By.css('#dynamicFilters'));

    let writeField = dynamicFilters.query(By.directive(FieldWriteComponent));

    let writeFieldInstance = writeField.componentInstance;

    expect(writeFieldInstance.caseField).toEqual(firstInput.field);
    expect(writeFieldInstance.caseField.label).toEqual(firstInput.field.label);
    expect(writeFieldInstance.formGroup).toBeTruthy();
  });

  it('should submit filters when apply button is clicked', async(() => {
    mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
    searchHandler.applyFilters.calls.reset();
    component.selected.jurisdiction = JURISDICTION_2;
    component.selected.caseType = CASE_TYPES_2[2];

    let control =  new FormControl('test');
    control.setValue('anything');
    const formControls = {
      'name': control
    };
    let formGroup = new FormGroup(formControls);

    component.onCaseTypeIdChange();
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        let button = de.query(By.css('button'));
        component.formGroup = formGroup;
        button.nativeElement.click();
        let arg: any = searchHandler.applyFilters.calls.mostRecent().args[0];
        expect(arg['jurisdiction']).toEqual(JURISDICTION_2);
        expect(arg['caseType']).toEqual(CASE_TYPES_2[2]);
        expect(arg['formGroup'].value).toEqual(formGroup.value);
        expect(searchHandler.applyFilters).toHaveBeenCalledTimes(1);

      });
  }));

});
