import { createAction, props } from '@ngrx/store';

import { LoginRequest } from '../../models/requests/loginRequest.model';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import { User } from '../../models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ request: LoginRequest }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ response: {
    user: User,
    accessToken: string
  } }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: ErrorMessage }>()
);

export const loginRedirect = createAction(
  '[Auth/API] Login Redirect'
);

export const authHttpError = createAction(
  '[Auth/API] Authorization Http Error',
  props<{ error: ErrorMessage }>()
);
