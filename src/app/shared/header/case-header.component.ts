import { Component, Input } from '@angular/core';
import { CaseView } from '../../core/cases/case-view.model';
import { CaseField } from '../domain/definition/case-field.model';

@Component({
  selector: 'ccd-case-header',
  templateUrl: './case-header.html',
  styleUrls: ['./case-header.scss']
})
export class CaseHeaderComponent {

  @Input()
  caseDetails: CaseView;
  caseTitle: CaseField;
  caseFields: CaseField[];

  ngOnInit(): void {
    this.caseTitle = new CaseField();
    if (this.caseDetails.state.title_display) {
      this.caseTitle.label = this.caseDetails.state.title_display;
      this.caseFields = this.getCaseFields();
    }
  }

  private getCaseFields(): CaseField[] {
    const caseDataFields = this.caseDetails.tabs.reduce((acc, tab) => {
      return acc.concat(tab.fields);
    }, []);

    return Object.assign(caseDataFields, this.caseDetails.metadataFields);
  }
}
