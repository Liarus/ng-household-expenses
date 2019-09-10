import { createReducer, on, Action } from '@ngrx/store';

import { User } from '../../models/user.model';
import * as AuthActions from '../actions/auth.actions';


export interface State {
  loggedIn: boolean;
  loading: boolean;
  errorMessage: string;
  accessToken: string;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  loading: false,
  errorMessage: '',
  accessToken: '',
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    errorMessage: error.message
  })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    loggedIn: true,
    loading: false,
    user: response.user,
    accessToken: response.accessToken
  })),
  on(AuthActions.logout , state => ({
    ...initialState
  })),
  on(AuthActions.authHttpError, (state, { error }) => ({
    ...initialState,
    errorMessage: error.message
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getLoading = (state: State) => state.loading;
export const getErrorMessage = (state: State) => state.errorMessage;
export const getLoggedUser = (state: State) => state.user;
export const getAccessToken = (state: State) => state.accessToken;
