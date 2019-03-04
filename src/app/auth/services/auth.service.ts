import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../../shared/models/appConfig.model';
import { SignInResponse } from '../models/responses/signInResponse.model';
import { LoginRequest } from '../models/requests/loginRequest.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authEndpoint = '/api/authorization/login';

  constructor(private httpClient: HttpClient,
    @Inject('AppConfig') private appConfig: AppConfig) {
  }

  login(request: LoginRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(
      `${this.appConfig.BASE_URL}${this.authEndpoint}`, request
    );
  }
}
