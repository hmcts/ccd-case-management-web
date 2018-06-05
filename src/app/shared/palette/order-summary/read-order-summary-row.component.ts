import { Component, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ViewContainerRef, ApplicationRef, Injector,
  Input, OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteService } from '../palette.service';
import { ReadMoneyGbpFieldComponent } from '../money-gbp/read-money-gbp-field.component';
import { CaseField } from '../../domain/definition/case-field.model';
import { ReadTextFieldComponent } from '../text/read-text-field.component';
import { FeeValue } from './fee-value.model';
import { MoneyGBPCaseField } from '../../domain/definition/money-gbp-case-field.model';

@Component({
  // tslint:disable-next-line
  selector: '[ccdReadOrderSummaryRow]',
  templateUrl: './read-order-summary-row.html',
  styleUrls: [
    './read-order-summary-row.scss'
  ],
})
export class ReadOrderSummaryRowComponent extends AbstractFieldReadComponent implements OnInit {

  public static readonly NO_VALUE = undefined;
  @Input()
  feeValue: FeeValue;
  @ViewChild('feeAmount', {read: ViewContainerRef})
  feeAmount: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    super();
  }

  ngOnInit(): void {
    let resolvedInputs = ReflectiveInjector.resolve([]);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs);
    let feeAmountComponent = this.resolver.resolveComponentFactory(ReadMoneyGbpFieldComponent).create(injector);

    feeAmountComponent.instance['caseField'] = this.feeValue.value ?
        new MoneyGBPCaseField(this.feeValue.value.FeeAmount)
      : new MoneyGBPCaseField(ReadOrderSummaryRowComponent.NO_VALUE);
    feeAmountComponent.instance['context'] = this.context;
    this.feeAmount.insert(feeAmountComponent.hostView);
  }

}
