import { reducer, initialState } from './auth.reducer';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import { LoginRequest } from '../../models/requests/loginRequest.model';
import * as AuthActions from '../actions/auth.actions';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('AuthReducer', () => {
  describe('undefined action', () => {
    it('should retun defult state', () => {
      const action = { type: 'NOOP' } as any;

      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('AuthActions.loginFailure', () => {
    it('should update errorMessage', () => {
      const error: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = AuthActions.loginFailure({ error });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: error.message
      });
    });
  });

  describe('AuthActions.login', () => {
    it('should update loading state', () => {
      const request = TEST_DATA.auth.loginRequest as LoginRequest;
      const action = AuthActions.login({ request });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('AuthActions.loginSuccess', () => {
    it('should update user and token', () => {
      const response = {
        user: TEST_DATA.auth.user,
        accessToken: TEST_DATA.auth.accessToken
      };
      const action = AuthActions.loginSuccess({ response });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loggedIn: true,
        user: response.user,
        accessToken: response.accessToken
      });
    });
  });

  describe('AuthActions.logout', () => {
    it('should retun defult state', () => {
      const action = AuthActions.logout();

      const result = reducer({
        ...initialState,
        loggedIn: true
      }, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('AuthActions.authHttpError', () => {
    it('should update errorMessage', () => {
      const error: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = AuthActions.authHttpError({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: error.message
      });
    });
  });
});
