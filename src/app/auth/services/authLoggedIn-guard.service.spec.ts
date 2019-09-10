import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';

import * as AuthActions from '../store/actions/auth.actions';
import { AuthLoggedInGuard } from './authLoggedIn-guard.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AuthLoggedInGuard', () => {
  let service: AuthLoggedInGuard;
  let store: MockStore<any>;
  const initialState = {
    auth: {
      loggedIn: true
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    });

    store = TestBed.get(Store);
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
          loggedIn: false
        }
      });
    });

    it('should return false', () => {
      const expected = cold('(a|)', { a: false });

      expect(service.canActivate()).toBeObservable(expected);
    });

    it('should dispatch AuthActions.loginRedirect', () => {
      const expected = AuthActions.loginRedirect();

      service.canActivate().subscribe();

      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
