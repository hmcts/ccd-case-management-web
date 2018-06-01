import { NgModule } from '@angular/core';
import { ReadOrderSummaryFieldComponent } from './read-order-summary-field.component';
import { ConditionalShowModule } from '../../conditional-show/conditional-show.module';
import { ComplexModule } from '../complex/complex.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from '../../markdown/markdown.module';
import { PaletteUtilsModule } from '../utils/utils.module';
import { FieldsFilterPipe } from '../complex/fields-filter.pipe';
import { MoneyGbpModule } from '../money-gbp/money-gbp.module';
import { ReadOrderSummaryRowComponent } from './read-order-summary-row.component';

@NgModule({
  imports: [
    CommonModule,
    ComplexModule,
    ReactiveFormsModule,
    PaletteUtilsModule,
    MoneyGbpModule
  ],
  declarations: [
    ReadOrderSummaryFieldComponent,
    ReadOrderSummaryRowComponent,
  ],
  entryComponents: [
    ReadOrderSummaryFieldComponent,
    ReadOrderSummaryRowComponent,
  ]
})
export class OrderSummaryModule {}
