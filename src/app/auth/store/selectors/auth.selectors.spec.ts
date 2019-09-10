

import {
  getLoggedIn,
  getLoading,
  getErrorMessage,
  getLoggedUser,
  getAccessToken
} from './auth.selectors';
import { TEST_DATA } from '../../../shared/tests/test-data';
import { State } from '../reducers/auth.reducer';

describe('Auth Selectors', () => {
  const authState: State = {
    accessToken: TEST_DATA.auth.accessToken,
    errorMessage: 'test Error',
    loading: true,
    loggedIn: true,
    user: TEST_DATA.auth.user
  };

  const state = {
    auth: authState
  };

  describe('getLoggedIn', () => {
    it('should return loggedin', () => {
      const expected = true;

      expect(getLoggedIn(state)).toBe(expected);
    });
  });

  describe('getLoading', () => {
    it('should return loading', () => {
      const expected = true;

      expect(getLoading(state)).toBe(expected);
    });
  });

  describe('getErrorMessage', () => {
    it('should return error message', () => {
      const expected = 'test Error';

      expect(getErrorMessage(state)).toBe(expected);
    });
  });

  describe('getLoggedUser', () => {
    it('should return logged user', () => {
      const expected = TEST_DATA.auth.user;

      expect(getLoggedUser(state)).toBe(expected);
    });
  });

  describe('getAccessToken', () => {
    it('should return token', () => {
      const expected = TEST_DATA.auth.accessToken;

      expect(getAccessToken(state)).toBe(expected);
    });
  });
});
