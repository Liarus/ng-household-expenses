import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as AuthActions from '../actions/auth.actions';
import * as LayoutAction from '../../../layout/store/actions/layout.actions';
import { AuthService } from '../../services/auth.service';
import { HttpError } from '../../../shared/helpers/httpError';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ request}) =>
        this.authService.login(request).pipe(
          map(response => AuthActions.loginSuccess({ response: {
            user: {
              id: response.userId,
              name: response.userName
            },
            accessToken: response.accessToken
          }})),
          catchError(error => of(AuthActions.loginFailure({ error: HttpError.parse(error) })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(() => LayoutAction.refreshMenuItems()),
      tap(() => this.router.navigate(['/']))
    )
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        map(() => AuthActions.loginRedirect())
      )
  );

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRedirect),
      map(() => LayoutAction.refreshMenuItems()),
      tap(() => this.router.navigate(['/login']))
    )
  );

  authHttpError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authHttpError),
      switchMap(({ error }) =>
        [AuthActions.loginFailure({ error }), AuthActions.loginRedirect()]
      )
    )
  );

  error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(({ error }) => this.toastr.error(error.message))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
}
