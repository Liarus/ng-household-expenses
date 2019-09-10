import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpRequestHeaderInterceptor } from './httpRequestHeader.interceptor';

describe('HttpRequestHeaderInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestHeaderInterceptor, multi: true }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have Accept and Content-Type headers', () => {
    const testUrl = 'http://test/api';
    httpClient.get(testUrl).subscribe();
    const req = httpMock.expectOne(testUrl);

    expect(req.request.headers).toBeDefined();
    expect(req.request.headers.has('Accept')).toBe(true);
    expect(req.request.headers.has('Content-Type')).toBe(true);
  });

  it('should jave withCredentials to true', () => {
    const testUrl = 'http://test/api';
    httpClient.get(testUrl).subscribe();
    const req = httpMock.expectOne(testUrl);

    expect(req.request.withCredentials).toBeDefined();
    expect(req.request.withCredentials).toBe(true);
  });

  it('should have no cache headers for GET method', () => {
    const testUrl = 'http://test/api';
    httpClient.get(testUrl).subscribe();
    const req = httpMock.expectOne(testUrl);

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers).toBeDefined();
    expect(req.request.headers.has('Cache-Control')).toBe(true);
    expect(req.request.headers.has('Pragma')).toBe(true);
    expect(req.request.headers.has('Expires')).toBe(true);
    expect(req.request.headers.has('If-Modified-Since')).toBe(true);
  });

  it('should not have no cache headers for other than GET method', () => {
    const testUrl = 'http://test/api';
    httpClient.delete(testUrl).subscribe();
    const req = httpMock.expectOne(testUrl);

    expect(req.request.headers).toBeDefined();
    expect(req.request.headers.has('Cache-Controlaa')).toBe(false);
    expect(req.request.headers.has('Pragma')).toBe(false);
    expect(req.request.headers.has('Expires')).toBe(false);
    expect(req.request.headers.has('If-Modified-Since')).toBe(false);
  });
});
