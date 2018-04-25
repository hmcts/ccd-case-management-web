import { NgModule } from '@angular/core';
import { ConditionalShowDirective } from './conditional-show.directive';
import { FieldsUtils } from '../utils/fields.utils';
import { ConditionalShowViewDirective } from './conditional-show-view.directive';

@NgModule({
  declarations: [
    ConditionalShowDirective,
    ConditionalShowViewDirective
  ],
  exports: [
    ConditionalShowDirective,
    ConditionalShowViewDirective
  ],
  providers: [
    FieldsUtils
  ]
})
export class ConditionalShowModule {}
