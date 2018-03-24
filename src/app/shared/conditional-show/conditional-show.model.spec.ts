import { ShowCondition } from './conditional-show.model';

describe('conditional-show', () => {

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
});
