import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';

import { AuthEffects } from './auth.effects';
import { AuthService } from '../../services/auth.service';
import * as LayoutAction from '../../../layout/store/actions/layout.actions';
import * as AuthActions from '../actions/auth.actions';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Observable<any>;
  let authService: AuthService;
  let routerService: any;
  let toastrService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn()
          }
        },
        {
          provide: ToastrService,
          useValue: {
            error: jest.fn()
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AuthEffects);
    toastrService = TestBed.get(ToastrService);
    authService = TestBed.get(AuthService);
    actions$ = TestBed.get(Actions);
    routerService = TestBed.get(Router);

    spyOn(routerService, 'navigate').and.callThrough();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('login$', () => {
    it('should return login with user when succesfull', () => {
      const signInresponse = TEST_DATA.auth.signInResponse;
      const action = AuthActions.login({ request: TEST_DATA.auth.loginRequest });
      const completion = AuthActions.loginSuccess({ response: {
        user: {
          id: signInresponse.userId,
          name: signInresponse.userName
        },
        accessToken: signInresponse.accessToken
      }});

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: signInresponse });
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return loginFailure when error', () => {
      const error = {
        message: 'error occured'
      };
      const action = AuthActions.login({ request: TEST_DATA.auth.loginRequest });
      const completion = AuthActions.loginFailure({ error });

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should return refreshMenuItems', () => {
      const action = AuthActions.loginSuccess({ response: {
        user: TEST_DATA.auth.user,
        accessToken: TEST_DATA.auth.accessToken
      }});
      const completion = LayoutAction.refreshMenuItems();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loginSuccess$).toBeObservable(expected);
    });

    it('should navigate to root', (done) => {
      const action = AuthActions.loginSuccess({ response: {
        user: TEST_DATA.auth.user,
        accessToken: TEST_DATA.auth.accessToken
      }});

      actions$ = of(action);

      effects.loginSuccess$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/']);
        done();
      });
    });
  });

  describe('loginRedirect$', () => {
    it('should navigate to login on loginRedirect', (done) => {
      const action = AuthActions.loginRedirect();

      actions$ = of(action);

      effects.loginRedirect$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
        done();
      });
    });

    it('should return refreshMenuItems on loginRedirect', () => {
      const action = AuthActions.loginRedirect();
      const completion = LayoutAction.refreshMenuItems();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loginRedirect$).toBeObservable(expected);
    });
  });

  describe('logout$', () => {
    it('should loginRedirect on logout', () => {
      const action = AuthActions.logout();
      const completion = AuthActions.loginRedirect();


      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.logout$).toBeObservable(expected);
    });
  });

  describe('authHttpError$', () => {
    it('should loginRedirect and show error on authHttpError', () => {
      const error = {
        message: 'error occured'
      };
      const action = AuthActions.authHttpError({ error });
      const completion1 = AuthActions.loginFailure({ error} );
      const completion2 = AuthActions.loginRedirect();


      actions$ = hot('-a---', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.authHttpError$).toBeObservable(expected);
    });
  });

  describe('error$', () => {
    it('should show toast on loginFailure', (done) => {
      const action = AuthActions.loginFailure({ error: {
        message: 'error occured'
      }});

      actions$ = of(action);

      effects.error$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });
});
