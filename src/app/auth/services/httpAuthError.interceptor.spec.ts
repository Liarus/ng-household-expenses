import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

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
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpAuthErrorInterceptor, multi: true },
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(store, 'dispatch');
  });

  it('should not dispatch AuthActions.authHttpError when auth error occured from login url', () => {
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

  it('should dispatch AuthActions.authHttpError when auth error occured from standard url', () => {
    const testUrl = 'http://test/api';
    const error = {
      message: `Http failure response for ${testUrl}: 401 Server Error`
    };
    const expected = AuthActions.authHttpError({ error });
    httpClient.get(testUrl).subscribe();
    const req = httpMock.expectOne(testUrl);

    req.flush({ message: 'TestErrorMessage' }, { status: 401, statusText: 'Server Error' });

    expect(store.dispatch).toHaveBeenCalledWith(expected);
    httpMock.verify();
  });

});
