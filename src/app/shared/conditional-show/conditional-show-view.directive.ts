import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { CaseField } from '../domain/definition/case-field.model';
import { ShowCondition } from './conditional-show.model';

@Directive({selector: '[ccdConditionalShowView]'})
/** Hides and shows the host element based on the show condition if the condition is not empty. Works on read only fields and form fields.
 *  The show condition is evaluated on all the fields of the page. i.e. read only and form fields. When a form field is hidden, if its
 *  initial value was changed then the field is cleared. Otherwise the original value is kept and will display next time the field is
 *  shown. Evaluation of the show condition includes disabled fields, which can be on their initial value or empty. And executes on the
 *  host field initialization and when any field of the form changes.
 */
// export class ConditionalShowDirective implements OnInit, OnDestroy {
export class ConditionalShowViewDirective implements AfterViewInit {

  @Input() caseField: CaseField;
  @Input() eventFields: CaseField[] = [];

  condition: ShowCondition;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.caseField.show_condition) {
      this.condition = new ShowCondition(this.caseField.show_condition);
      // console.log('FIELD: ' + this.caseField.id + ' AfterViewInit. Show condition: ' + this.caseField.show_condition);
      let fields = {};
      this.eventFields.forEach(field => {
        fields[field.id] = field.value;
      });
      if (!this.condition.match(fields)) {
        this.el.nativeElement.hidden = true;
      }
    }
  }
}
