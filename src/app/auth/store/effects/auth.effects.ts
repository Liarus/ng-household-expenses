import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
} from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/requests/loginRequest.model';
import { HttpError } from '../../../shared/helpers/httpError';
import { RefreshMenuItems } from 'src/app/core/store/actions/layout.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((login: LoginRequest) =>
      this.authService.login(login).pipe(
        map(response => new LoginSuccess({
          user: {
            id: response.userId,
            name: response.userName
          },
          accessToken: response.accessToken
        })),
        catchError(error => of(new LoginFailure(HttpError.parse(error))))
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map(() => new RefreshMenuItems()),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout, AuthActionTypes.AuthHttpError),
    map(() => new RefreshMenuItems()),
    tap(() => this.router.navigate(['/login']))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}
}
