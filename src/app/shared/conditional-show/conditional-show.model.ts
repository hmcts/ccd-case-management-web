import { CaseField } from '../domain/definition/case-field.model';
import { FieldsUtils } from '../utils/fields.utils';

export class ShowCondition {

  // Expects a show condition of the form: <fieldName>="string"
  constructor(public condition: string) {
  }

  match(fields): boolean {
    if (!this.condition) {
      return true;
    }
    // console.log('evaluating show condition: ' + this.condition);
    let field = this.condition.split('=')[0];
    let right = this.unquoted(this.condition.split('=')[1]);
    let value = fields[field];
    // console.log('field: ' + field);
    // console.log('expectedValue: ' + right);
    // console.log('value: ' + value);
    // changed from '===' to '==' to cover number field conditions
    if (right.endsWith('*') && value) {
      return value.startsWith(this.removeStarChar(right));
    } else {
      return value == right; // tslint:disable-line
    }
  }

  private unquoted(str) {
    return str.replace(/^"|"$/g, '');
  }

  private removeStarChar(s: string) {
    return s.substring(0, s.length - 1);
  }

  matchByCaseFields(caseFields: CaseField[]): boolean {
    return this.match(FieldsUtils.toValuesMap(caseFields));
  }
}
