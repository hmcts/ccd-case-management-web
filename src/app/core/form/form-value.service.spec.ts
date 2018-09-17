import { FormValueService } from './form-value.service';

describe('FormValueService', () => {

  let formValueService: FormValueService;

  beforeEach(() => {
    formValueService = new FormValueService();
  });

  describe('sanitize', () => {
    it('should return null when given null', () => {
      let value = formValueService.sanitise(null);

      expect(value).toEqual(null);
    });

    it('should trim spaces from strings', () => {
      let value = formValueService.sanitise({
        'string1': '     x     ',
        'string2': '     y      '
      });

      expect(value).toEqual({
        'string1': 'x',
        'string2': 'y'
      } as object);
    });

    it('should trim spaces from strings recursively', () => {
      let value = formValueService.sanitise({
        'object': {
          'string1': '    x     '
        },
        'string2': '     y      '
      });

      expect(value).toEqual({
        'object': {
          'string1': 'x'
        },
        'string2': 'y'
      } as object);
    });

    it('should trim spaces from strings in collection', () => {
      let value = formValueService.sanitise({
        'collection': [
          {
            'value': '      x        '
          }
        ]
      });

      expect(value).toEqual({
        'collection': [
          {
            'value': 'x'
          }
        ]
      } as object);
    });

    it('should convert numbers to strings', () => {
      let value = formValueService.sanitise({
        'number': 42
      });

      expect(value).toEqual({
        'number': '42'
      } as object);
    });
  });

  describe('isEmpty', () => {
    it('should return true when given null', () => {
      let value = formValueService.isEmpty(null);

      expect(value).toEqual(true);
    });

    it('should return true for null values', () => {
      let value = formValueService.isEmpty({
        'number': null,
        'string2': null
      });

      expect(value).toEqual(true);
    });

    it('should return true for undefined values', () => {
      let value = formValueService.isEmpty({
        'number': undefined,
        'string2': undefined
      });

      expect(value).toEqual(true);
    });

    it('should return true for empty strings', () => {
      let value = formValueService.isEmpty({
        'string1': '',
        'string2': ''
      });

      expect(value).toEqual(true);
    });

    it('should return false for strings', () => {
      let value = formValueService.isEmpty({
        'string1': 'x',
        'string2': 'y'
      });

      expect(value).toEqual(false);
    });

    it('should return false for strings recursively', () => {
      let value = formValueService.isEmpty({
        'object': {
          'string1': 'x'
        },
        'string2': ''
      });

      expect(value).toEqual(false);
    });

    it('should return true for empty collection', () => {
      let value = formValueService.isEmpty({
        'collection': []
      });

      expect(value).toEqual(true);
    });

    it('should return true for collection with empty elements', () => {
      let value = formValueService.isEmpty({
        'collection': ['', '']
      });

      expect(value).toEqual(true);
    });

    it('should return false for strings in collection', () => {
      let value = formValueService.isEmpty({
        'collection': [
          {
            'value': 'x'
          }
        ]
      });

      expect(value).toEqual(false);
    });

    it('should return false for numbers in collection', () => {
      let value = formValueService.isEmpty({
        'collection': [
          {
            'value': 20.0
          },
          {
            'value': 10.0
          }
        ]
      });

      expect(value).toEqual(false);
    });

    it('should return false for numbers', () => {
      let value = formValueService.isEmpty({
        'number': 0.0,
        'string2': 0.0
      });

      expect(value).toEqual(false);
    });
  });
});
