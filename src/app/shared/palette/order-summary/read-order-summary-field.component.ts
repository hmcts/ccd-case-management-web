import { Component, ViewChild, ReflectiveInjector,
  ComponentFactoryResolver, ViewContainerRef, ApplicationRef, Injector, Type, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteService } from '../palette.service';
import { ReadMoneyGbpFieldComponent } from '../money-gbp/read-money-gbp-field.component';
import { Fee } from './fee.model';
import { CaseField } from '../../domain/definition/case-field.model';
import { ReadTextFieldComponent } from '../text/read-text-field.component';
import { ReadOrderSummaryRowComponent } from './read-order-summary-row.component';

@Component({
  selector: 'ccd-read-order-summary-field',
  templateUrl: './read-order-summary-field.html',
  styleUrls: [
    './read-order-summary-field.scss'
  ],
})
export class ReadOrderSummaryFieldComponent extends AbstractFieldReadComponent implements AfterViewInit {

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

  ngAfterViewInit(): void {
    console.log('paymentTotal=', this.caseField.value.PaymentTotal);

    let resolvedInputs = ReflectiveInjector.resolve([]);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs);
    let paymentTotalComponent = this.resolver.resolveComponentFactory(ReadMoneyGbpFieldComponent).create(injector);

    paymentTotalComponent.instance['caseField'] = this.getMoneyGBPCaseField(this.caseField.value.PaymentTotal);
    paymentTotalComponent.instance['context'] = this.context;

    this.paymentTotal.insert(paymentTotalComponent.hostView);
  }

  private getMoneyGBPCaseField(amount): CaseField {
    return {id: 'PaymentTotal',
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

class OrderSummaryRow {
  feeCode: ReadTextFieldComponent;
  feeDescription: ReadTextFieldComponent;
  feeAmount: ReadMoneyGbpFieldComponent;
}
