import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import * as fromAuth from '../store/reducers';
import * as AuthActions from '../store/actions/auth.actions';
import { HttpError } from 'src/app/shared/helpers/httpError';


@Injectable()
export class HttpAuthErrorInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromAuth.State>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.store.dispatch(new AuthActions.AuthHttpError(HttpError.parse(err)));
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }
}
