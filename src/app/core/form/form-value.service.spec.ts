import { FormValueService } from './form-value.service';

describe('FormValueService', () => {

  let formValueService: FormValueService;

  beforeEach(() => {
    formValueService = new FormValueService();
  });

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

  it ('should extract last 16 digits from a case reference', () => {
    const value = formValueService.sanitise({
      'case_link': {
        'case_reference': '   https://ng.uk:5678/uni/corn/1234567822345678   '
      },
      'case_reference': '   #1234-5678-2234-5678   ',
      'ngitb': {
        'case_reference': '   #1234-LessThan16Digits   '
      }
    });
    expect(value).toEqual({
      'case_link': {
        'case_reference': '1234567822345678'
      },
      'case_reference': '1234567822345678',
      'ngitb': {
        'case_reference': '123416'
      }
    } as object);
  });

  it ('should process case reference nested object as in other objects', () => {
    const value = formValueService.sanitise({
      'case_reference': {
        'case_link': '   https://ng.uk:5678/uni/corn/1234567822345678   ',
        'case_reference': ' #1234-5678-2234-5678   '
      }
    });
    expect(value).toEqual({
      'case_reference': {
        'case_link': 'https://ng.uk:5678/uni/corn/1234567822345678',
        'case_reference': '1234567822345678'
      }
    } as object);
  });
});
