/// <reference types="jest" />

import {
  getLoggedIn,
  getLoading,
  getErrorMessage,
  getLoggedUser,
  getAccessToken
} from './';
import { User } from '../../models/user.model';

describe('Auth Selectors', () => {
  describe('getLoggedIn', () => {
    it('should return loggedin', () => {
      const expectedLoggedIn = true;
      const state = {
        auth: {
          status: {
            loggedIn: expectedLoggedIn
          }
        }
      };

      expect(getLoggedIn(state)).toBe(expectedLoggedIn);
    });
  });

  describe('getLoading', () => {
    it('should return loading', () => {
      const expectedLoading = true;
      const state = {
        auth: {
          status: {
            loading: expectedLoading
          }
        }
      };

      expect(getLoading(state)).toBe(expectedLoading);
    });
  });

  describe('getErrorMessage', () => {
    it('should return error message', () => {
      const expectedError = 'test Error';
      const state = {
        auth: {
          status: {
            errorMessage: expectedError
          }
        }
      };

      expect(getErrorMessage(state)).toBe(expectedError);
    });
  });

  describe('getLoggedUser', () => {
    it('should return logged user', () => {
      const expectedUser: User = {
        id: '7bb78f33-0612-409e-a1d6-4341fcee9a7e',
        name: 'UserName'
      };
      const state = {
        auth: {
          status: {
            user: expectedUser
          }
        }
      };

      expect(getLoggedUser(state)).toBe(expectedUser);
    });

    it('should not return logged user', () => {
      const expectedUser = null;
      const state = {
        auth: {
          status: {
            user: expectedUser
          }
        }
      };

      expect(getLoggedUser(state)).toBe(expectedUser);
    });
  });

  describe('getAccessToken', () => {
    it('should return token', () => {
      const expectedToken = 'testToken';
      const state = {
        auth: {
          status: {
            accessToken: expectedToken
          }
        }
      };

      expect(getAccessToken(state)).toBe(expectedToken);
    });
  });
});
