import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldReadComponent } from './field-read.component';
import { PaletteService } from '../palette.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CaseField } from '../../domain/definition/case-field.model';
import { By } from '@angular/platform-browser';
import createSpyObj = jasmine.createSpyObj;

const CASE_FIELD: CaseField = {
  id: 'PersonFirstName',
  label: 'First name',
  field_type: {
    id: 'Text',
    type: 'Text'
  },
  value: 'Johnny',
  display_context: 'READONLY'
};
const CLASS = 'text-cls';

@Component({
  template: `
    <span class="${CLASS}"></span>
  `
})
class FieldTestComponent {}

@Component({
  selector: 'ccd-field-read-label',
  template: `
    <ng-content></ng-content>
  `
})
class FieldReadLabelComponent {
  @Input()
  caseField: CaseField;

  @Input()
  withLabel: boolean;
}

describe('FieldReadComponent', () => {

  let fixture: ComponentFixture<FieldReadComponent>;
  let component: FieldReadComponent;
  let de: DebugElement;

  let paletteService: any;

  beforeEach(async(() => {
    paletteService = createSpyObj<PaletteService>('paletteService', [
      'getFieldComponentClass'
    ]);
    paletteService.getFieldComponentClass.and.returnValue(FieldTestComponent);

    TestBed
      .configureTestingModule({
        imports: [
          FormsModule
        ],
        declarations: [
          FieldReadComponent,

          // Mock
          FieldTestComponent,
          FieldReadLabelComponent,
        ],
        providers: [
          { provide: PaletteService, useValue: paletteService }
        ]
      })
      .compileComponents();

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [FieldTestComponent]
      }
    });

    fixture = TestBed.createComponent(FieldReadComponent);
    component = fixture.componentInstance;

    component.caseField = CASE_FIELD;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should get field read class from PaletteService', () => {
    expect(paletteService.getFieldComponentClass).toHaveBeenCalledWith(CASE_FIELD, false);
  });

  it('should inject component instance as child', () => {
    fixture.detectChanges();

    let fieldReadLabelComponent = de.query(By.css('ccd-field-read-label'));
    expect(fieldReadLabelComponent.children.length).toBe(1);

    let fieldReadLabel = fieldReadLabelComponent.componentInstance;
    expect(fieldReadLabel.caseField).toBe(CASE_FIELD);

    let fieldTestComponent = fieldReadLabelComponent.query(By.css('span.text-cls'));
    expect(fieldTestComponent).toBeTruthy();

    let fieldTest = fieldTestComponent.componentInstance;
    expect(fieldTest.caseField).toBe(CASE_FIELD);
  });

  it('should NOT display label by default', () => {
    fixture.detectChanges();

    let fieldReadLabelComponent = de.query(By.css('ccd-field-read-label'));
    let fieldReadLabel = fieldReadLabelComponent.componentInstance;
    expect(fieldReadLabel.withLabel).toBe(false);
  });

  it('should display label if required', () => {
    component.withLabel = true;
    fixture.detectChanges();

    let fieldReadLabelComponent = de.query(By.css('ccd-field-read-label'));
    let fieldReadLabel = fieldReadLabelComponent.componentInstance;
    expect(fieldReadLabel.withLabel).toBe(true);
  });
});
