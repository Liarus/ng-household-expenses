/// <reference types="jest" />
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';

import { AuthEffects } from './auth.effects';
import { AuthService } from '../../services/auth.service';
import { SignInResponse } from '../../models/responses/signInResponse.model';
import { RefreshMenuItems } from '../../../layout/store/actions/layout.actions';
import {
  Login,
  LoginSuccess,
  LoginFailure,
  LoginRedirect,
  Logout,
  AuthHttpError
} from '../actions/auth.actions';

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
    it('should return LoginSuccess with user when succesfull', () => {
      const signInresponse = {
        userId: '7bb78f33-0612-409e-a1d6-4341fcee9a7e',
        userName: 'UserName',
        accessToken: 'TestToken'
      } as SignInResponse;
      const action = new Login({
        username: 'TestUser',
        password: 'TestPassword'
      });
      const completion = new LoginSuccess({
        user: {
          id: signInresponse.userId,
          name: signInresponse.userName
        },
        accessToken: signInresponse.accessToken
      });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: signInresponse });
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return LoginFailure when error', () => {
      const error = 'error occured';
      const action = new Login({
        username: 'TestUser',
        password: 'TestPassword'
      });
      const completion = new LoginFailure({
        message: error
      });

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should return RefreshMenuItems', () => {
      const action = new LoginSuccess({
        user: {
          id: '7bb78f33-0612-409e-a1d6-4341fcee9a7e',
          name: 'UserName',
        },
        accessToken: 'TestToken'
      });
      const completion = new RefreshMenuItems();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loginSuccess$).toBeObservable(expected);
    });

    it('should navigate to root', (done) => {
      const action = new LoginSuccess({
        user: {
          id: '7bb78f33-0612-409e-a1d6-4341fcee9a7e',
          name: 'UserName',
        },
        accessToken: 'TestToken'
      });

      actions$ = of(action);
      effects.loginSuccess$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/']);
        done();
      });
    });
  });

  describe('loginRedirect$', () => {
    it('should navigate to login on LoginRedirect', (done: any) => {
      const action = new LoginRedirect();

      actions$ = of(action);

      effects.loginRedirect$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
        done();
      });
    });

    it('should return RefreshMenuItems on LoginRedirect', () => {
      const action = new LoginRedirect();
      const completion = new RefreshMenuItems();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loginRedirect$).toBeObservable(expected);
    });

    it('should navigate to login on Logout', (done: any) => {
      const action = new Logout();

      actions$ = of(action);

      effects.loginRedirect$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
        done();
      });
    });

    it('should return RefreshMenuItems on Logout', () => {
      const action = new Logout();
      const completion = new RefreshMenuItems();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loginRedirect$).toBeObservable(expected);
    });

    it('should navigate to login on AuthHttpError', (done: any) => {
      const action = new AuthHttpError({
        message: 'error occured'
      });

      actions$ = of(action);

      effects.loginRedirect$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
        done();
      });
    });

    it('should return RefreshMenuItems on AuthHttpError', () => {
      const action = new AuthHttpError({
        message: 'error occured'
      });
      const completion = new RefreshMenuItems();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loginRedirect$).toBeObservable(expected);
    });
  });

  describe('error$', () => {
    it('should show toast on LoginFailure', (done) => {
      const action = new LoginFailure({
        message: 'error occured'
      });

      actions$ = of(action);

      effects.error$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });

    it('should show toast on AuthHttpError', (done) => {
      const action = new AuthHttpError({
        message: 'error occured'
      });

      actions$ = of(action);

      effects.error$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });
});
