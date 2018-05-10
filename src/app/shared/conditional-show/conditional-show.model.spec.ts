import { ShowCondition } from './conditional-show.model';
import { aCaseField } from '../case-editor/case-edit.spec';
import { CaseField } from '../domain/definition/case-field.model';

describe('conditional-show', () => {
  let caseField1: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL');
  let caseField2: CaseField = aCaseField('field2', 'field2', 'Text', 'OPTIONAL');
  let caseField3: CaseField = aCaseField('field3', 'field3', 'Text', 'OPTIONAL');

  caseField1.value = 's1';
  caseField2.value = 3;
  caseField3.value = 'temmy';

  let caseFields = [caseField1, caseField2, caseField3];

  describe('matches when', () => {
    it('empty condition', () => {
      let sc = new ShowCondition('');
      let fields = {
        field : 's1'
      };
      let matched = sc.match(fields);

      expect(matched).toBe(true);
    });

    it('field has expected value', () => {
      let sc = new ShowCondition('field="s1"');
      let fields = {
        field : 's1'
      };
      let matched = sc.match(fields);

      expect(matched).toBe(true);
    });

    it('field has expected value and is a number', () => {
      let sc = new ShowCondition('field="3"');
      let fields = {
        field : 3
      };
      let matched = sc.match(fields);

      expect(matched).toBe(true);
    });

    it('field starts with a string', () => {
      let sc = new ShowCondition('field="te*"');
      let fields = {
        field : 'test'
      };
      let matched = sc.match(fields);

      expect(matched).toBe(true);
    });
  });

  describe('matchByCaseFields when', () => {
    it('empty condition', () => {
      let sc = new ShowCondition('');
      let matched = sc.matchByCaseFields(caseFields);

      expect(matched).toBe(true);
    });

    it('field has expected value', () => {
      let sc = new ShowCondition('field1="s1"');

      let matched = sc.matchByCaseFields(caseFields);

      expect(matched).toBe(true);
    });

    it('field has expected value and is a number', () => {
      let sc = new ShowCondition('field2="3"');
      let matched = sc.matchByCaseFields(caseFields);
      expect(matched).toBe(true);
    });

    it('field starts with a string', () => {
      let sc = new ShowCondition('field3="te*"');
      let matched = sc.matchByCaseFields(caseFields);

      expect(matched).toBe(true);
    });
  });

  describe('not matches when', () => {
    it('field value is not equal to condition', () => {
      let sc = new ShowCondition('field="test"');
      let fields = {
        field : 'test1'
      };
      let matched = sc.match(fields);

      expect(matched).toBe(false);
    });

    it('field value does not start with the condition string', () => {
      let sc = new ShowCondition('field="te*"');
      let fields = {
        field : 'yest'
      };
      let matched = sc.match(fields);

      expect(matched).toBe(false);
    });
  });

  describe('not matches ByCaseFields when', () => {
    it('field value is not equal to condition', () => {
      let sc = new ShowCondition('field1="test"');
      let matched = sc.matchByCaseFields(caseFields);

      expect(matched).toBe(false);
    });

    it('field value does not start with ' +
      'the condition string', () => {
      let sc = new ShowCondition('field1="te*"');
      let matched = sc.matchByCaseFields(caseFields);

      expect(matched).toBe(false);
    });
  });
});
