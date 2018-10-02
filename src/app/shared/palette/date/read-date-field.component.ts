import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';

@Component({
  selector: 'ccd-read-date-field',
  template: `<span *ngIf="!isFieldValueEmpty(); else noDate">{{caseField.value | ccdDate}}</span>
             <ng-template #noDate>
               <span class="sr-only">-</span>
             </ng-template>`
})
export class ReadDateFieldComponent extends AbstractFieldReadComponent {

  isFieldValueEmpty(): boolean {
    return (!this.caseField.value);
  }

}
