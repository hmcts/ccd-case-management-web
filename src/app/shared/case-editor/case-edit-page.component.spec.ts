import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseEditPageComponent } from './case-edit-page.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CaseEditComponent } from './case-edit.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { WizardPage, CaseField, FormValueService, FormErrorService, CaseFieldService, aCaseField,
  CaseReferencePipe, CaseEventData, Draft, SaveOrDiscardDialogComponent, PageValidationService } from '@hmcts/ccd-case-ui-toolkit';
import createSpyObj = jasmine.createSpyObj;
import { MatDialog, MatDialogRef } from '@angular/material';
import { CaseCreatorSubmitComponent } from '../../cases/creator/case-creator-submit.component';
import { CaseViewerComponent } from '../../cases/viewer/case-viewer.component';

describe('CaseEditPageComponent', () => {

  let comp: CaseEditPageComponent;
  let fixture: ComponentFixture<CaseEditPageComponent>;
  let de: DebugElement;
  let wizardPage: WizardPage;
  let readOnly = new CaseField();
  let formValueService = new FormValueService();
  let formErrorService = new FormErrorService();
  let firstPage = new WizardPage();
  let caseFieldService = new CaseFieldService();
  let pageValidationService = new PageValidationService(caseFieldService);
  let route: any;
  let snapshot: any;
  const FORM_GROUP = new FormGroup({
    'data': new FormGroup({'field1': new FormControl('SOME_VALUE')})
  });
  let someObservable = {
    'subscribe': () => new Draft()
  };
  let dialog: any;
  let matDialogRef: any;

  let caseEditComponentStub: any;
  let cancelled: any;

  beforeEach(async(() => {
    firstPage.id = 'first page';
    cancelled = createSpyObj('cancelled', ['emit'])
    caseEditComponentStub = {
      'form': FORM_GROUP,
      'data': '',
      'eventTrigger': {'case_fields': [], 'name': 'Test event trigger name', 'can_save_draft': false },
      'hasPrevious': () => true,
      'getPage': () => firstPage,
      'first': () => true,
      'next': () => true,
      'previous': () => true,
      'cancel': () => undefined,
      'cancelled': cancelled,
      'validate': (caseEventData: CaseEventData) => Observable.of(caseEventData),
      'saveDraft': (caseEventData: CaseEventData) => Observable.of(someObservable),
      'caseDetails': { 'case_id': '1234567812345678' },
    };
    snapshot = {
      queryParamMap: createSpyObj('queryParamMap', ['get']),
    };
    route = {
      params: Observable.of({id: 123}),
      snapshot: snapshot
    };

    matDialogRef = createSpyObj<MatDialogRef<SaveOrDiscardDialogComponent>>('MatDialogRef', ['afterClosed', 'close']);
    dialog = createSpyObj<MatDialog>('dialog', ['open']);
    dialog.open.and.returnValue(matDialogRef);

    spyOn(caseEditComponentStub, 'first');
    spyOn(caseEditComponentStub, 'next');
    spyOn(caseEditComponentStub, 'previous');
    TestBed.configureTestingModule({
      declarations: [CaseEditPageComponent,
        CaseReferencePipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: FormValueService, useValue: formValueService},
        {provide: FormErrorService, useValue: formErrorService},
        {provide: CaseEditComponent, useValue: caseEditComponentStub},
        {provide: PageValidationService, useValue: pageValidationService},
        {provide: ActivatedRoute, useValue: route},
        {provide: MatDialog, useValue: dialog }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseEditPageComponent);
    comp = fixture.componentInstance;
    readOnly.display_context = 'READONLY';
    const FIELDS: CaseField[] = [readOnly];
    wizardPage = new WizardPage();
    wizardPage.case_fields = FIELDS;
    wizardPage.label = 'Test Label';
    wizardPage.getCol1Fields = () => FIELDS;
    wizardPage.getCol2Fields = () => FIELDS;
  });

  it('should display a page with two columns when wizard page is multicolumn', () => {
    wizardPage.isMultiColumn = () => true;
    comp.currentPage = wizardPage;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('#caseEditForm'));
    expect(de).toBeNull();
    de = fixture.debugElement.query(By.css('#caseEditForm1'));
    expect(de.nativeElement.textContent).toBeDefined();
    de = fixture.debugElement.query(By.css('#caseEditForm2'));
    expect(de.nativeElement.textContent).toBeDefined();
  });

  it('should display a page label in the header', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('#page-header'));
    expect(de).toBeNull(); // Header is removed
  });

  it('should display an event trigger in the header', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('#page-header'));
    expect(de).toBeNull(); // Header is removed
  });

  it('should display a page with one column when wizard page is not multicolumn', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('#caseEditForm'));
    expect(de.nativeElement.textContent).toBeDefined();
    de = fixture.debugElement.query(By.css('#caseEditForm1'));
    expect(de).toBeNull();
    de = fixture.debugElement.query(By.css('#caseEditForm2'));
    expect(de).toBeNull();
  });

  it('should init to the provided first page in event trigger', () => {
    comp.ngOnInit();
    expect(comp.currentPage).toEqual(firstPage);
  });

  it('should return true on hasPrevious check', () => {
    let errorContext = {
      'ignore_warning': true,
      'trigger_text': 'Some error!'
    };
    comp.callbackErrorsNotify(errorContext);
    expect(comp.ignoreWarning).toBeTruthy();
    expect(comp.triggerText).toEqual('Some error!');
  });

  it('should emit RESUMED_FORM_DISCARD on create event if discard triggered with no value changed', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    comp.formValuesChanged = false;
    snapshot.queryParamMap.get.and.callFake(key => {
      switch (key) {
        case CaseViewerComponent.ORIGIN_QUERY_PARAM:
          return 'viewDraft';
      }
    });
    fixture.detectChanges();

    comp.cancel();

    expect(cancelled.emit).toHaveBeenCalledWith({status: CaseEditPageComponent.RESUMED_FORM_DISCARD});
  });

  it('should emit NEW_FORM_DISCARD on create case if discard triggered with no value changed', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    comp.formValuesChanged = false;
    fixture.detectChanges();

    comp.cancel();

    expect(cancelled.emit).toHaveBeenCalledWith({status: CaseEditPageComponent.NEW_FORM_DISCARD});
  });

  it('should emit RESUMED_FORM_DISCARD on create event if discard triggered with value changed', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    comp.formValuesChanged = true;
    snapshot.queryParamMap.get.and.callFake(key => {
      switch (key) {
        case CaseViewerComponent.ORIGIN_QUERY_PARAM:
          return 'viewDraft';
      }
    });
    matDialogRef.afterClosed.and.returnValue(Observable.of('Discard'));
    fixture.detectChanges();

    comp.cancel();

    expect(cancelled.emit).toHaveBeenCalledWith({status: CaseEditPageComponent.RESUMED_FORM_DISCARD});
  });

  it('should emit NEW_FORM_DISCARD on create case if discard triggered with no value changed', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    comp.formValuesChanged = true;
    fixture.detectChanges();
    matDialogRef.afterClosed.and.returnValue(Observable.of('Discard'));

    comp.cancel();

    expect(cancelled.emit).toHaveBeenCalledWith({status: CaseEditPageComponent.NEW_FORM_DISCARD});
  });

  it('should emit RESUMED_FORM_SAVE on create case if discard triggered with no value changed', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    comp.formValuesChanged = true;
    snapshot.queryParamMap.get.and.callFake(key => {
      switch (key) {
        case CaseViewerComponent.ORIGIN_QUERY_PARAM:
          return 'viewDraft';
      }
    });
    matDialogRef.afterClosed.and.returnValue(Observable.of('Save'));
    fixture.detectChanges();

    comp.cancel();
    expect(cancelled.emit).toHaveBeenCalledWith({status: CaseEditPageComponent.RESUMED_FORM_SAVE, data: { data: {'field1': 'SOME_VALUE'}}});
  });

  it('should emit RESUMED_FORM_SAVE on create case if discard triggered with no value changed', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    comp.formValuesChanged = true;
    matDialogRef.afterClosed.and.returnValue(Observable.of('Save'));
    fixture.detectChanges();

    comp.cancel();
    expect(cancelled.emit).toHaveBeenCalledWith({status: CaseEditPageComponent.NEW_FORM_SAVE, data: { data: {'field1': 'SOME_VALUE'}}});
  });

  it('should delegate first calls to caseEditComponent', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();
    comp.first();
    expect(caseEditComponentStub.first).toHaveBeenCalled();
  });

  it('should delegate next calls to caseEditComponent', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();
    comp.next();
    expect(caseEditComponentStub.next).toHaveBeenCalled();
  });

  it('should delegate prev calls to caseEditComponent', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();
    comp.previous();
    expect(caseEditComponentStub.previous).toHaveBeenCalled();
  });

  it('should allow empty values when field is OPTIONAL', () => {
    wizardPage.case_fields.push(aCaseField('fieldX', 'fieldX', 'Text', 'OPTIONAL', null));
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();
    expect(comp.currentPageIsNotValid()).toBeFalsy();
  });
});
