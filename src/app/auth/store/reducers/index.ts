import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as fromRoot from '../../../store/reducers';

export interface AuthState {
    status: fromAuth.State;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
    status: fromAuth.reducer
};

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getStatusState = createSelector(
    getAuthState,
    (state: AuthState) => state.status
);

export const getLoggedIn = createSelector(
    getStatusState,
    fromAuth.getLoggedIn
);

export const getLoading = createSelector(
    getStatusState,
    fromAuth.getLoading
);

export const getErrorMessage = createSelector(
    getStatusState,
    fromAuth.getErrorMessage
);

export const getLoggedUser = createSelector(
    getStatusState,
    fromAuth.getLoggedUser
);

export const getAccessToken = createSelector(
    getStatusState,
    fromAuth.getAccessToken
);
