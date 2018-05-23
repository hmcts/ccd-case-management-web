import { Component, ComponentFactoryResolver, Input, OnInit, ReflectiveInjector, ViewChild, ViewContainerRef } from '@angular/core';
import { PaletteService } from '../palette.service';
import { AbstractFieldWriteComponent } from './abstract-field-write.component';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
import { FormValidatorsService } from '../../../core/form/form-validators.service';

@Component({
  selector: 'ccd-field-write',
  template: `
    <ng-container #fieldContainer></ng-container>
  `
})
export class FieldWriteComponent extends AbstractFieldWriteComponent implements OnInit {

  @Input()
  isSearchField = false;

  @Input()
  formGroup: FormGroup;

  @ViewChild('fieldContainer', {read: ViewContainerRef})
  fieldContainer: ViewContainerRef;

  private  defaultControlRegistrer(formGroup: FormGroup,
                                   caseField: CaseField): (control: FormControl) => AbstractControl {
    return control => {
      if (formGroup.controls[caseField.id]) {
        return formGroup.get(caseField.id);
      }
      this.formValidatorsService.addValidators(caseField, control);
      formGroup.addControl(caseField.id, control);
      return control;
    };
  }

  constructor(private resolver: ComponentFactoryResolver,
              private paletteService: PaletteService,
              private formValidatorsService: FormValidatorsService) {
    super();
  }

  ngOnInit(): void {
    let componentClass = this.paletteService.getFieldComponentClass(this.caseField, true);

    let resolvedInputs = ReflectiveInjector.resolve([]);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.fieldContainer.parentInjector);
    let component = this.resolver.resolveComponentFactory(componentClass).create(injector);

    // Provide component @Inputs
    component.instance['caseField'] = this.caseField;
    component.instance['registerControl'] = this.registerControl
      || this.defaultControlRegistrer(this.formGroup, this.caseField);
    component.instance['idPrefix'] = this.idPrefix;
    if (this.caseField.field_type.id === 'AddressGlobal') {
      component.instance['ignoreMandatory'] = true;
    }
    if (this.isSearchField && (
      this.caseField.field_type.id === 'AddressGlobalUK'
      || this.caseField.field_type.id === 'AddressGlobal'
      || this.caseField.field_type.id === 'AddressUK')) {
      component.instance['isSearchField'] = true;
    }

    this.fieldContainer.insert(component.hostView);
  }
}
