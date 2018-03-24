import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadComplexFieldComponent } from './read-complex-field.component';
import { FieldsFilterPipe } from './fields-filter.pipe';
import { BaseFieldModule } from '../base-field/base-field.module';
import { WriteComplexFieldComponent } from './write-complex-field.component';
import { PaletteUtilsModule } from '../utils/utils.module';
import { IsCompoundPipe } from '../utils/is-compound.pipe';
import { ConditionalShowModule } from '../../conditional-show/conditional-show.module';
import { MarkdownModule } from '../../markdown/markdown.module';

@NgModule({
  imports: [
    CommonModule,
    BaseFieldModule,
    PaletteUtilsModule,
    ConditionalShowModule,
    MarkdownModule
  ],
  providers: [
    IsCompoundPipe,
  ],
  declarations: [
    ReadComplexFieldComponent,
    WriteComplexFieldComponent,
    FieldsFilterPipe,
  ],
  entryComponents: [
    ReadComplexFieldComponent,
    WriteComplexFieldComponent,
  ],
  exports: [
    WriteComplexFieldComponent
  ]
})
export class ComplexModule {}
