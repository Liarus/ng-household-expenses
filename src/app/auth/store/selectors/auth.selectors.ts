import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from '../reducers/auth.reducer';

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getLoggedIn = createSelector(
  getAuthState,
  fromAuth.getLoggedIn
);

export const getLoading = createSelector(
  getAuthState,
  fromAuth.getLoading
);

export const getErrorMessage = createSelector(
  getAuthState,
  fromAuth.getErrorMessage
);

export const getLoggedUser = createSelector(
  getAuthState,
  fromAuth.getLoggedUser
);

export const getAccessToken = createSelector(
  getAuthState,
  fromAuth.getAccessToken
);
