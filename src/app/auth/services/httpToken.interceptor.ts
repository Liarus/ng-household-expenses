import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { first, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromAuth from '../store/reducers';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    return this.store.pipe(
      select(fromAuth.getAccessToken),
      first(),
      mergeMap(token => {
        const authReq = !!token ? req.clone({
          setHeaders: { Authorization: 'Bearer ' + token },
        }) : req;
        return next.handle(authReq);
      })
    );
  }
}
