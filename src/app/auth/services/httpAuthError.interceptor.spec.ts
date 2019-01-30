/// <reference types="jest" />

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore } from '../../shared/tests/mockStore';
import { async, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { HttpAuthErrorInterceptor } from './httpAuthError.interceptor';
import * as AuthActions from '../store/actions/auth.actions';

describe('HttpAuthErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  let store: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpAuthErrorInterceptor, multi: true },
        { provide: Store, useClass: MockStore }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({});
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(store, 'dispatch');
  });

  it('should not dispatch AuthActions.AuthHttpError when auth error occured from login url', () => {
    const testUrl = 'http://test/login';
    httpClient.get(testUrl).subscribe(
      response => expect(response).toBeUndefined(),
      (error: any) => {
        expect(error).toBeDefined();
      }
    );
    const req = httpMock.expectOne(testUrl);
    req.flush({ message: 'TestErrorMessage' }, { status: 401, statusText: 'Server Error' });

    expect(store.dispatch).not.toHaveBeenCalled();
    httpMock.verify();
  });

  it('should dispatch AuthActions.AuthHttpError when auth error occured from standard url', () => {
    const testUrl = 'http://test/api';
    const expected = new AuthActions.AuthHttpError({
      message: `Http failure response for ${testUrl}: 401 Server Error`
    });
    httpClient.get(testUrl).subscribe();
    const req = httpMock.expectOne(testUrl);
    req.flush({ message: 'TestErrorMessage' }, { status: 401, statusText: 'Server Error' });

    expect(store.dispatch).toHaveBeenCalledWith(expected);
    httpMock.verify();
  });

});
