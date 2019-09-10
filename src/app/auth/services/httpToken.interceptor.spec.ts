import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { HttpTokenInterceptor } from './httpToken.interceptor';

describe('HttpTokenInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  let store: MockStore<any>;
  const testToken = 'testToken';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({
      auth: {
        accessToken: testToken
      }
    });
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have access token in header', () => {
    const expected = 'Bearer ' + testToken;
    const testUrl = 'http://test/api';
    httpClient.get(testUrl).subscribe();
    const req = httpMock.expectOne(testUrl);

    expect(req.request.headers).toBeDefined();
    expect(req.request.headers.has('Authorization')).toBe(true);
    const authHeader = req.request.headers.get('Authorization');
    expect(authHeader).toBeDefined();
    expect(authHeader).toEqual(expected);
  });

  it('should not have access token in header if no provided', () => {
    store.setState({
      auth: {
        accessToken: ''
      }
    });

    const testUrl = 'http://test/api';
    httpClient.get(testUrl).subscribe();
    const req = httpMock.expectOne(testUrl);

    expect(req.request.headers).toBeDefined();
    expect(req.request.headers.has('Authorization')).toBe(false);
  });
});
