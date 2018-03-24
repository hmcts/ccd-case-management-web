import { Component, ComponentFactoryResolver, Input, OnInit, ReflectiveInjector, ViewChild, ViewContainerRef } from '@angular/core';
import { PaletteService } from '../palette.service';
import { AbstractFieldReadComponent } from './abstract-field-read.component';

@Component({
  selector: 'ccd-field-read',
  templateUrl: './field-read.html'
})
export class FieldReadComponent extends AbstractFieldReadComponent implements OnInit {

  @Input()
  withLabel = false;

  @ViewChild('fieldContainer', {read: ViewContainerRef})
  fieldContainer: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private paletteService: PaletteService) {
    super();
  }

  ngOnInit(): void {
    let componentClass = this.paletteService.getFieldComponentClass(this.caseField, false);
    let resolvedInputs = ReflectiveInjector.resolve([]);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.fieldContainer.parentInjector);
    let component = this.resolver.resolveComponentFactory(componentClass).create(injector);

    // Provide component @Inputs
    component.instance['caseField'] = this.caseField;

    this.fieldContainer.insert(component.hostView);
  }

}
