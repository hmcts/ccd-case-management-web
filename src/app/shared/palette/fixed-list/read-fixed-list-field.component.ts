import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { Component } from '@angular/core';

@Component({
  selector: 'ccd-read-fixed-list-field',
  template: `<span class="sr-only" *ngIf="isFieldValueEmpty(); else fixedList">-</span>
  <ng-template #fixedList>{{caseField.value | ccdFixedList:caseField.field_type.fixed_list_items}}</ng-template>`
})
export class ReadFixedListFieldComponent extends AbstractFieldReadComponent {

  isFieldValueEmpty(): boolean {
    return (!this.caseField.value);
  }

}
