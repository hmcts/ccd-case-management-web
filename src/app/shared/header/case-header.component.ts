import { Component, Input } from '@angular/core';
import { CaseView } from '../../core/cases/case-view.model';

@Component({
  selector: 'ccd-case-header',
  templateUrl: './case-header.html'
})
export class CaseHeaderComponent {

  @Input()
  caseDetails: CaseView;

}
