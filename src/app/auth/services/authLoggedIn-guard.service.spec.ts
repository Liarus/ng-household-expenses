/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';

import * as AuthActions from '../store/actions/auth.actions';
import { AuthLoggedInGuard } from './authLoggedIn-guard.service';
import { MockStore } from '../../shared/tests/mockStore';

describe('AuthLoggedInGuard', () => {
  let service: AuthLoggedInGuard;
  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: Store, useClass: MockStore }
      ]
    });

    store = TestBed.get(Store);
    store.setState({
      auth: {
        status: {
          loggedIn: true
        }
      }
    });
    service = TestBed.get(AuthLoggedInGuard);
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if the user is logged in', () => {
    const expected = cold('(a|)', { a: true });

    expect(service.canActivate()).toBeObservable(expected);
  });

  describe('user not logged in', () => {
    beforeEach(() => {
      store.setState({
        auth: {
          status: {
            loggedIn: false
          }
        }
      });
    });

    it('should return false', () => {
      const expected = cold('(a|)', { a: false });

      expect(service.canActivate()).toBeObservable(expected);
    });

    it('should dispatch AuthActions.LoginRedirect', () => {
      const expected = new AuthActions.LoginRedirect();

      service.canActivate().subscribe();

      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
