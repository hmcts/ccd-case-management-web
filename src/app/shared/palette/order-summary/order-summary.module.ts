import { NgModule } from '@angular/core';
import { ReadOrderSummaryFieldComponent } from './read-order-summary-field.component';
import { ConditionalShowModule } from '../../conditional-show/conditional-show.module';
import { ComplexModule } from '../complex/complex.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from '../../markdown/markdown.module';
import { PaletteUtilsModule } from '../utils/utils.module';
import { FieldsFilterPipe } from '../complex/fields-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    ComplexModule,
    ReactiveFormsModule,
    PaletteUtilsModule,
  ],
  declarations: [
    ReadOrderSummaryFieldComponent,
  ],
  entryComponents: [
    ReadOrderSummaryFieldComponent,
  ]
})
export class OrderSummaryModule {}
