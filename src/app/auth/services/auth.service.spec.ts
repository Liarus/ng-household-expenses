/// <reference types="jest" />
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';

import { SignInResponse } from '../models/responses/signInResponse.model';
import { AuthService } from './auth.service';
import { AppConfig } from '../../core/configs/appConfig.model';
import { LoginRequest } from '../models/requests/loginRequest.model';
import { RunMode } from '../../core/core.enum';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;

  const appConfig = {
    BASE_URL: 'http://www.test',
    RunMode: RunMode.Test
  } as AppConfig;
  const authEndpoint = '/api/authorization/login';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
          }
        },
        { provide: 'AppConfig', useValue: appConfig },
        AuthService
      ]
    });

    http = TestBed.get(HttpClient);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in', () => {
    const request = {
      username: 'testUsername',
      password: 'testPassword'
    } as LoginRequest;
    const response = {
      userId: '550416ea-b523-4468-ae10-ea07d35eb9f0',
      userName: request.username,
      accessToken: 'testAccessToken'
    } as SignInResponse;

    const expected = cold('-a|', { a: response });
    http.post = jest.fn(() => expected);

    expect(service.login(request)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(
      `${appConfig.BASE_URL}${authEndpoint}`, request
    );
  });
});
