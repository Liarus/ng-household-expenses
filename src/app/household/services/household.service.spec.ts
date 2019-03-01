/// <reference types="jest" />

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';

import { RunMode } from '../../shared/enums/runMode.enum';
import { AppConfig } from '../../shared/models/appConfig.model';
import { Household } from '../models/household.model';
import { CreateHousehold } from '../models/requests/createHousehold.model';
import { ModifyHousehold } from '../models/requests/modifyHousehold.model';
import { HouseholdService } from './household.service';
import { HouseholdFilter } from '../models/householdFilter.model';

describe('HouseholdService', () => {
  let service: HouseholdService;
  let http: HttpClient;

  const appConfig = {
    BASE_URL: 'http://www.test',
    RunMode: RunMode.Test
  } as AppConfig;
  const userId = '550416ea-b523-4468-ae10-ea07d35eb9f0';
  const householdEndpoint = '/api/household';
  const userEndpoint = '/api/user';

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
        HouseholdService
      ]
    });

    http = TestBed.get(HttpClient);
    service = TestBed.get(HouseholdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a household', () => {
    const request = {
      userId: userId,
      id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
      name: 'Household1 Name',
      symbol: 'Household1 symbol',
      description: 'Household1 description',
      street: 'Household1 street',
      city: 'Household1 city',
      country: 'Household1 country',
      zipCode: 'Household1 zipCode',
      version: 1
    } as CreateHousehold;
    const expected = cold('-a|', { a: request });
    http.post = jest.fn(() => expected);

    expect(service.create(request)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(
      `${appConfig.BASE_URL}${householdEndpoint}`, request
    );
  });

  it('should retreive all households for a user', () => {
    const households = [
      {
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 Name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      },
      {
        id: '55798c3b-5551-489b-9dd2-d7e59691a368',
        name: 'Household2 Name',
        symbol: 'Household2 symbol',
        description: 'Household2 description',
        street: 'Household2 street',
        city: 'Household2 city',
        country: 'Household2 country',
        zipCode: 'Household2 zipCode',
        version: 1
      }
    ] as Household[];
    const householdFilter = {
      pageNumber: 10,
      pageSize: 10,
      searchText: 'test',
      sortingField: 'symbol',
      sortDirection: 'desc'
    } as HouseholdFilter;
    const expected = cold('-a|', { a: households });
    http.get = jest.fn(() => expected);

    expect(service.getAllForUser(userId, householdFilter)).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith(
      `${appConfig.BASE_URL}${userEndpoint}/${userId}/households`, expect.anything()
    );
  });

  it('should update a household', () => {
    const household = {
      id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
      name: 'Household1 Name',
      symbol: 'Household1 symbol',
      description: 'Household1 description',
      street: 'Household1 street',
      city: 'Household1 city',
      country: 'Household1 country',
      zipCode: 'Household1 zipCode',
      version: 1
    } as ModifyHousehold;
    const expected = cold('-a|', { a: household });
    http.put = jest.fn(() => expected);

    expect(service.update(household)).toBeObservable(expected);
    expect(http.put).toHaveBeenCalledWith(
      `${appConfig.BASE_URL}${householdEndpoint}`,
      household
    );
  });

  it('should remove a household', () => {
    const householdId = '550416ea-b523-4468-ae10-ea07d35eb9f0';
    const expected = cold('-a|', { a: householdId });
    http.delete = jest.fn(() => expected);

    expect(service.delete(householdId)).toBeObservable(expected);
    expect(http.delete).toHaveBeenCalledWith(
      `${appConfig.BASE_URL}${householdEndpoint}/${householdId}`
    );
  });
});
