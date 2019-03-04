import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { first, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromAuth from '../store/reducers';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    return this.store.select(fromAuth.getAccessToken).pipe(
      first(),
      flatMap(token => {
        const authReq = !!token ? req.clone({
          setHeaders: { Authorization: 'Bearer ' + token },
        }) : req;
        return next.handle(authReq);
      })
    );
  }
}
