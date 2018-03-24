import { NgModule } from '@angular/core';
import { ConditionalShowDirective } from './conditional-show.directive';
import { FieldsUtils } from '../utils/fields.utils';

@NgModule({
  declarations: [
    ConditionalShowDirective
  ],
  exports: [
    ConditionalShowDirective
  ],
  providers: [
    FieldsUtils
  ]
})
export class ConditionalShowModule {}
