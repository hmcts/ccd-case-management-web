import { HttpErrorService } from './http-error.service';
import { Observable } from 'rxjs/Observable';
import { HttpError } from './http-error.model';
import { Headers, Response, ResponseOptions } from '@angular/http';
import { AuthService } from '../auth/auth.service';

describe('HttpErrorService', () => {
  const CURRENT_URL = 'http://core-case-data.common-components.reform';
  const ERROR_MESSAGE = 'Nein! Nein! Nein!';
  const VALID_ERROR_BODY = {
    'timestamp': '2017-05-24T15:24:17.857+0000',
    'status': 422,
    'error': 'Unprocessable Entity',
    'exception': 'uk.gov.hmcts.ccd.endpoint.exceptions.ValidationException',
    'message': 'string is not a known event ID for the specified case type TestAddressBookCase',
    'path': '/caseworkers/0/jurisdictions/TEST/case-types/TestAddressBookCase/cases'
  };

  const HTTP_401_ERROR_BODY = {
    'timestamp': '2017-05-24T15:24:17.857+0000',
    'status': 401,
    'error': 'Unauthorized',
    'message': 'Unauthorized user...',
    'path': CURRENT_URL
  };
  const HTTP_403_ERROR_BODY = {
    'timestamp': '2017-05-24T15:24:17.857+0000',
    'status': 403,
    'error': 'Forbidden',
    'message': 'The server understood the request but refuses to authorize it....',
    'path': CURRENT_URL
  };
  const VALID_ERROR_RESPONSE = new Response(new ResponseOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(VALID_ERROR_BODY),
    status: 422
  }));
  const VALID_ERROR_RESPONSE_WITH_CHARSET = new Response(new ResponseOptions({
    headers: new Headers({
      'Content-Type': 'application/json;charset=UTF-8',
    }),
    body: JSON.stringify(VALID_ERROR_BODY),
    status: 422
  }));

  const NOT_VALID_ERROR_RESPONSE = new Response(new ResponseOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: '{notvalidjson}'
  }));

  const HTTP_401_RESPONSE = new Response(new ResponseOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(HTTP_401_ERROR_BODY),
    status: 401
  }));

  const HTTP_403_RESPONSE = new Response(new ResponseOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(HTTP_403_ERROR_BODY),
    status: 403
  }));

  let authService: any;
  let errorService: HttpErrorService;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('authService', ['signIn']);

    errorService = new HttpErrorService(authService);

    jasmine.clock().uninstall();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date());
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('handle()', () => {

    it('should return default error when no error given', () => {
      let obsError = errorService.handle(null);

      expect(obsError).toEqual(Observable.throw(new HttpError()));
    });

    it('should convert a valid Response error into an HttpError', () => {
      let obsError = errorService.handle(VALID_ERROR_RESPONSE);

      expect(obsError).toEqual(Observable.throw(HttpError.from(VALID_ERROR_BODY)));
    });

    it('should handle a valid Response with charsetInfo', () => {
      let obsError = errorService.handle(VALID_ERROR_RESPONSE_WITH_CHARSET);

      expect(obsError).toEqual(Observable.throw(HttpError.from(VALID_ERROR_BODY)));
    });

    it('should convert a non-valid Response error into an HttpError', () => {
      let obsError = errorService.handle(NOT_VALID_ERROR_RESPONSE);

      expect(obsError).toEqual(Observable.throw(new HttpError()));
    });

    it('should use message when error is an unknown object with a message property', () => {
      let obsError = errorService.handle({
        message: ERROR_MESSAGE
      });

      let expectedError = new HttpError();
      expectedError.message = ERROR_MESSAGE;
      expect(obsError).toEqual(Observable.throw(expectedError));
    });

    it('should trigger sign-in when IDAM returns HTTP-401 as response', () => {
      errorService.handle(HTTP_401_RESPONSE);
      expect(authService.signIn).toHaveBeenCalled();
    });

    it('should trigger sign-in when IDAM returns HTTP-403 as response', () => {
      errorService.handle(HTTP_403_RESPONSE);
      expect(authService.signIn).toHaveBeenCalled();
    });

    it('should empty error when removed', () => {
      errorService.setError(VALID_ERROR_BODY);

      let error = errorService.removeError();

      expect(error).toEqual(VALID_ERROR_BODY);

      error = errorService.removeError();

      expect(error).toEqual(null);
    });
  });
});
