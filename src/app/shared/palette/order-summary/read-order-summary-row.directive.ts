import { Component, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ViewContainerRef, ApplicationRef, Injector,
  AfterViewInit, Input, Directive, TemplateRef } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteService } from '../palette.service';
import { ReadMoneyGbpFieldComponent } from '../money-gbp/read-money-gbp-field.component';
import { CaseField } from '../../domain/definition/case-field.model';
import { ReadTextFieldComponent } from '../text/read-text-field.component';
import { FeeValue } from './fee-value.model';

@Directive({
  selector: '[ccdReadOrderSummaryRow]',
})
export class ReadOrderSummaryRowDirective implements AfterViewInit {

  @Input()
  feeValue: FeeValue;
  @ViewChild('feeAmount', {read: ViewContainerRef})
  feeAmount: ViewContainerRef;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  ngAfterViewInit(): void {
    // let resolvedInputs = ReflectiveInjector.resolve([]);
    // let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs);
    // let feeAmountComponent = this.resolver.resolveComponentFactory(ReadMoneyGbpFieldComponent).create(injector);

    // feeAmountComponent.instance['caseField'] = this.getMoneyGBPCaseField(this.feeValue.value.FeeAmount);
    // feeAmountComponent.instance['context'] = this.context;

    // this.feeAmount.insert(feeAmountComponent.hostView);
  }

  private getMoneyGBPCaseField(amount): CaseField {
    return {
      id: 'PaymentTotal',
      label: 'Total',
      field_type: {
        id: 'MoneyGBP',
        type: 'MoneyGBP'
      },
      display_context: 'READONLY',
      value: amount
    };
  }
}
