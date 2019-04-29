/// <reference types="jest" />
import { reducer, initialState } from './auth.reducer';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import { LoginRequest } from '../../models/requests/loginRequest.model';
import {
  LoginFailure,
  Login,
  LoginSuccess,
  Logout,
  AuthHttpError
} from '../actions/auth.actions';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('AuthReducer', () => {
  describe('undefined action', () => {
    it('should retun defult state', () => {
      const action = {type: 'NOOP'} as any;
      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('AuthActionTypes.LoginFailure', () => {
    it('should update errorMessage', () => {
      const request: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = new LoginFailure(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: request.message
      });
    });
  });

  describe('AuthActionTypes.Login', () => {
    it('should update loading state', () => {
      const request = TEST_DATA.auth.loginRequest as LoginRequest;
      const action = new Login(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('AuthActionTypes.LoginSuccess', () => {
    it('should update user and token', () => {
      const request = {
        user: TEST_DATA.auth.user,
        accessToken: TEST_DATA.auth.accessToken
      };
      const action = new LoginSuccess(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loggedIn: true,
        user: request.user,
        accessToken: request.accessToken
      });
    });
  });

  describe('AuthActionTypes.Logout', () => {
    it('should retun defult state', () => {
      const action = new Logout();
      const result = reducer({
        ...initialState,
        loggedIn: true
      }, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('AuthActionTypes.AuthHttpError', () => {
    it('should update errorMessage', () => {
      const request: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = new AuthHttpError(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: request.message
      });
    });
  });
});
