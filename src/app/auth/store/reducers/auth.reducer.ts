import { User } from '../../models/user.model';
import { AuthActionTypes, AuthActionsUnion } from '../actions/auth.actions';

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

export function reducer(
  state = initialState,
  action: AuthActionsUnion): State {
  switch (action.type) {
    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message
      };
    }

    case AuthActionTypes.Login: {
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    case AuthActionTypes.AuthHttpError: {
      return {
        ...initialState,
        errorMessage: action.payload.message
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getLoading = (state: State) => state.loading;
export const getErrorMessage = (state: State) => state.errorMessage;
export const getLoggedUser = (state: State) => state.user;
export const getAccessToken = (state: State) => state.accessToken;
