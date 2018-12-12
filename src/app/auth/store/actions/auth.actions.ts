import { Action } from '@ngrx/store';

import { SignInRequest } from '../../models/requests/signInRequest.model';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
    Login = '[Auth] Login',
    Logout = '[Auth] Logout',
    LoginSuccess = '[Auth API] Login Success',
    LoginFailure = '[Auth API] Login Failure',
    LoginRedirect = '[Auth API] Login Redirect',
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;

    constructor(public payload: SignInRequest) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: {
        user: User,
        accessToken: string
    }) {}
}

export class LoginFailure implements Action {
    readonly type = AuthActionTypes.LoginFailure;

    constructor(public payload: ErrorMessage) {}
}

export class LoginRedirect implements Action {
    readonly type = AuthActionTypes.LoginRedirect;
}

export type AuthActionsUnion =
    | Login
    | Logout
    | LoginSuccess
    | LoginFailure
    | LoginRedirect;
