import { async } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Jurisdiction } from '../shared/domain/definition/jurisdiction.model';
import { Observable } from 'rxjs/Rx';
import { CaseState } from '../shared/domain/definition/case-state.model';
import { CaseType } from '../shared/domain/definition/case-type.model';
import createSpyObj = jasmine.createSpyObj;

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

describe('SearchComponent', () => {

    let subject: SearchComponent;
    let searchService;
    let paginationService;
    let alertService;

    beforeEach(async(() => {
        searchService = createSpyObj('searchService', ['search']);
        searchService.search.and.returnValue(Observable.of({}));
        paginationService = createSpyObj('paginationService', ['getPaginationMetadata']);
        paginationService.getPaginationMetadata.and.returnValue(Observable.of({}));
        alertService = createSpyObj('alertService', ['warning']);
        subject = new SearchComponent(null, searchService, paginationService, alertService);
    }));

    it('should make inputs fields turn into query parameters', () => {
        const nameControl = new FormControl();
        const NAME_VALUE = 'something';

        nameControl.setValue(NAME_VALUE);

        const filterContents = {
            'name': nameControl
        };
        let formGroup = new FormGroup(filterContents);
        let filter = {
            formGroup: formGroup,
            jurisdiction: JURISDICTION,
            caseType: CASE_TYPES[0],
            caseState: CASE_STATE,
            page: 1
        };

        subject.applyFilter(filter);

        expect(paginationService.getPaginationMetadata).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, { state: CASE_STATE.id }, {
            'name': NAME_VALUE
        });

        expect(searchService.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, { page: 1, state: CASE_STATE.id }, {
          'name': NAME_VALUE
        });

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
            formGroup: formGroup,
            jurisdiction: JURISDICTION,
            caseType: CASE_TYPES[0],
            caseState: CASE_STATE,
            page: 1
        };

        subject.applyFilter(filter);

        expect(paginationService.getPaginationMetadata).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, { state: CASE_STATE.id }, {
            'name': NAME_VALUE,
            'child.childName': 'childValue'
        });

        expect(searchService.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, { page: 1, state: CASE_STATE.id }, {
          'name': NAME_VALUE,
          'child.childName': 'childValue'
        });

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

    subject.applyFilter(filter);

    expect(paginationService.getPaginationMetadata).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, {meta: NAME_VALUE2}, {
      'name': NAME_VALUE1
    });

    expect(searchService.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, {page: 1, meta: NAME_VALUE2}, {
      'name': NAME_VALUE1
    });

  });

});
