/// <reference types="jest" />

import { HttpErrorResponse } from '@angular/common/http';

import { ErrorMessage } from '../models/errorMessage.model';
import { HttpError } from './httpError';

describe('HttpError', () => {
  it('should parse even if empty error', () => {
    const expected = {
      message: 'error occured'
    } as ErrorMessage;

    expect(HttpError.parse(undefined)).toEqual(expected);
  });

  it('should parse HttpErrorResponse', () => {
    const expected = {
        message: 'Http failure response for http://test.com: 401 Error'
    } as ErrorMessage;

    expect(HttpError.parse(new HttpErrorResponse(
      {
        error: {},
        status: 401,
        statusText: 'Error',
        url: 'http://test.com'
      }
    ))).toEqual(expected);
  });

  it('should parse custom error', () => {
    const expected = {
      message: 'test error message'
    } as ErrorMessage;

    expect(HttpError.parse({ message: 'test error message' })).toEqual(expected);
  });
});
