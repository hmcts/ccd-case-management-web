import { Component, ViewChild, ReflectiveInjector,
  ComponentFactoryResolver, ViewContainerRef, ApplicationRef, Injector, Type, ViewChildren, QueryList, OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteService } from '../palette.service';
import { ReadMoneyGbpFieldComponent } from '../money-gbp/read-money-gbp-field.component';
import { Fee } from './fee.model';
import { CaseField } from '../../domain/definition/case-field.model';
import { ReadTextFieldComponent } from '../text/read-text-field.component';
import { ReadOrderSummaryRowComponent } from './read-order-summary-row.component';
import { FeeValue } from './fee-value.model';
import { MoneyGBPCaseField } from '../../domain/definition/money-gbp-case-field.model';

@Component({
  selector: 'ccd-read-order-summary-field',
  templateUrl: './read-order-summary-field.html',
  styleUrls: [
    './read-order-summary-field.scss'
  ],
})
export class ReadOrderSummaryFieldComponent extends AbstractFieldReadComponent implements OnInit {

  private static readonly NO_VALUE = undefined;
  @ViewChild('paymentTotal', {read: ViewContainerRef})
  paymentTotal: ViewContainerRef;
  @ViewChildren(ReadOrderSummaryRowComponent)
  orderSummaryRows: QueryList<ReadOrderSummaryRowComponent>;

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
    let paymentTotalComponent = this.resolver.resolveComponentFactory(ReadMoneyGbpFieldComponent).create(injector);

    paymentTotalComponent.instance['caseField'] = this.caseField.value ?
        new MoneyGBPCaseField(this.caseField.value.PaymentTotal)
      : new MoneyGBPCaseField(ReadOrderSummaryFieldComponent.NO_VALUE);
    paymentTotalComponent.instance['context'] = this.context;
    this.paymentTotal.insert(paymentTotalComponent.hostView);
  }

  getFees(): FeeValue[] {
    return this.caseField.value ? this.caseField.value.Fees : [];
  }
}
