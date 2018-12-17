
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './../../shared/services/http.service';
import { Household } from '../models/household.model';
import { AppConfig } from '../../shared/models/appConfig.model';
import { CreateHousehold } from './../models/requests/createHousehold.model';
import { ModifyHousehold } from './../models/requests/modifyHousehold.model';

@Injectable({
    providedIn: 'root',
})
export class HouseholdService {

    private householdEndpoint = '/api/household';
    private userEndpoint = '/api/user';

    constructor(private httpService: HttpService,
                @Inject('IAppConfig') private appConfig: AppConfig) {
    }

    getAllForUser(userId: string): Observable<Household[]> {
        return this.httpService.get<Household[]>(
            `${this.appConfig.BASE_URL}${this.userEndpoint}/${userId}/households`
        );
    }

    create(request: CreateHousehold): Observable<any> {
        return this.httpService.postModel<any>(
            `${this.appConfig.BASE_URL}${this.householdEndpoint}`, request
        );
    }

    update(request: ModifyHousehold): Observable<any> {
        return this.httpService.put<any>(
            `${this.appConfig.BASE_URL}${this.householdEndpoint}`, request
        );
    }

    delete(id: string): Observable<any> {
        return this.httpService.delete(
            `${this.appConfig.BASE_URL}${this.householdEndpoint}/${id}`
        );
    }
}
