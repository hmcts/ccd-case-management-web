import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';

@Component({
  selector: 'ccd-read-email-field',
  template: `
    <span class="sr-only" *ngIf="isFieldValueEmpty(); else showEmail">-</span>
    <ng-template #showEmail>
      <a href="mailto:{{caseField.value}}">{{caseField.value}}</a>
    </ng-template>`
})
export class ReadEmailFieldComponent extends AbstractFieldReadComponent {

  isFieldValueEmpty(): boolean {
    return (!this.caseField.value);
  }

}
