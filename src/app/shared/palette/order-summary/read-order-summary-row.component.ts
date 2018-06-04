import { Component, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ViewContainerRef, ApplicationRef, Injector,
  Input, OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteService } from '../palette.service';
import { ReadMoneyGbpFieldComponent } from '../money-gbp/read-money-gbp-field.component';
import { CaseField } from '../../domain/definition/case-field.model';
import { ReadTextFieldComponent } from '../text/read-text-field.component';
import { FeeValue } from './fee-value.model';
import { MoneyGBPCaseFieldBuilder } from '../money-gbp/money-gbp.builder';

@Component({
  // tslint:disable-next-line
  selector: '[ccdReadOrderSummaryRow]',
  templateUrl: './read-order-summary-row.html',
  styleUrls: [
    './read-order-summary-row.scss'
  ],
})
export class ReadOrderSummaryRowComponent extends AbstractFieldReadComponent implements OnInit {

  @Input()
  feeValue: FeeValue;
  @ViewChild('feeAmount', {read: ViewContainerRef})
  feeAmount: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private moneyGBPBuilder: MoneyGBPCaseFieldBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    let resolvedInputs = ReflectiveInjector.resolve([]);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs);
    let feeAmountComponent = this.resolver.resolveComponentFactory(ReadMoneyGbpFieldComponent).create(injector);

    feeAmountComponent.instance['caseField'] = this.moneyGBPBuilder.buildMoneyGBPCaseField(this.feeValue.value.FeeAmount);
    feeAmountComponent.instance['context'] = this.context;
    this.feeAmount.insert(feeAmountComponent.hostView);
  }

}
