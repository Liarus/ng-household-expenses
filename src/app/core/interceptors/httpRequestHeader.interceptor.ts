import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    const contentType = req.headers.has('Content-Type') ? req.headers.get('Content-Type') : undefined;

    let request = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Content-Type': contentType ? contentType : 'application/json'
      },
      withCredentials: true
    });

    if (request.method === 'GET') {
      request = request.clone({
        setHeaders: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
          'If-Modified-Since': '0'
        }
      });
    }

    return next.handle(request);
  }
}
