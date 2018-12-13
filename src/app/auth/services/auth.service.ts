import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../shared/services/http.service';
import { AppConfig } from '../../shared/models/appConfig.model';
import { SignInResponse } from '../models/responses/signInResponse.model';
import { LoginRequest } from '../models/requests/loginRequest.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private authEndpoint = '/api/authorization/login';

    constructor(private httpService: HttpService,
        @Inject('IAppConfig') private appConfig: AppConfig) {
    }

    login(request: LoginRequest): Observable<SignInResponse> {
        return this.httpService.postModel<SignInResponse>(
            `${this.appConfig.BASE_URL}${this.authEndpoint}`, request
        );
    }
}
