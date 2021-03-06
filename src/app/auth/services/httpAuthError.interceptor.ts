import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of, EMPTY } from 'rxjs';

import * as fromAuth from '../store/reducers/auth.reducer';
import * as AuthActions from '../store/actions/auth.actions';
import { HttpError } from '../../shared/helpers/httpError';

@Injectable()
export class HttpAuthErrorInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 && !request.url.includes('/login')) {
          this.store.dispatch(AuthActions.authHttpError({ error: HttpError.parse(err) }));
          of(EMPTY);
        }
          return throwError(err);
      })
    );
  }
}
