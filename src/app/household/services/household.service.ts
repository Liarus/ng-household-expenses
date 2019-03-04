
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../../shared/models/appConfig.model';
import { CreateHousehold } from './../models/requests/createHousehold.model';
import { ModifyHousehold } from './../models/requests/modifyHousehold.model';
import { HouseholdSorting } from '../household.enum';
import { HouseholdFilter } from '../models/householdFilter.model';
import { HouseholdSearch } from '../models/responses/householdSearch.model';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {

  private householdEndpoint = '/api/household';
  private userEndpoint = '/api/user';
  private sortingEnumMapper = new Map<string, HouseholdSorting>([
    ['descriptionasc', HouseholdSorting.DescriptionAsc],
    ['descriptiondesc', HouseholdSorting.DescriptionDesc],
    ['nameasc', HouseholdSorting.NameAsc],
    ['namedesc', HouseholdSorting.NameDesc],
    ['symbolasc', HouseholdSorting.SymbolAsc],
    ['symboldesc', HouseholdSorting.SymbolDesc],
  ]);

  constructor(private httpClient: HttpClient,
              @Inject('AppConfig') private appConfig: AppConfig) {}

  getAllForUser(userId: string, filter: HouseholdFilter): Observable<HouseholdSearch> {
    const sort = this.getSortingEnum(filter.sortingField + filter.sortDirection);
    const fromObject = {
      pageNumber: filter.pageNumber.toString(),
      pageSize: filter.pageSize.toString(),
      search: filter.searchText,
      sort: sort.toString()
    };
    return this.httpClient.get<HouseholdSearch>(
      `${this.appConfig.BASE_URL}${this.userEndpoint}/${userId}/households`,
      { params: new HttpParams({ fromObject: fromObject}) }
    );
  }

  create(request: CreateHousehold): Observable<any> {
    return this.httpClient.post<any>(
      `${this.appConfig.BASE_URL}${this.householdEndpoint}`, request
    );
  }

  update(request: ModifyHousehold): Observable<any> {
    return this.httpClient.put<any>(
      `${this.appConfig.BASE_URL}${this.householdEndpoint}`, request
    );
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(
      `${this.appConfig.BASE_URL}${this.householdEndpoint}/${id}`
    );
  }

  private getSortingEnum(sort: string):  HouseholdSorting {
    return this.sortingEnumMapper.get(sort);
  }
}
