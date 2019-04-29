/// <reference types="jest" />
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';

import { AppConfig } from '../../core/configs/appConfig.model';
import { Household } from '../models/household.model';
import { CreateHousehold } from '../models/requests/createHousehold.model';
import { ModifyHousehold } from '../models/requests/modifyHousehold.model';
import { HouseholdService } from './household.service';
import { HouseholdFilter } from '../models/householdFilter.model';
import { RunMode } from '../../core/core.enum';
import { TEST_DATA } from '../../shared/tests/test-data';

describe('HouseholdService', () => {
  let service: HouseholdService;
  let http: HttpClient;

  const appConfig = {
    BASE_URL: 'http://www.test',
    RunMode: RunMode.Test
  } as AppConfig;
  const userId = TEST_DATA.auth.userId;
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
    const request = TEST_DATA.household.createHousehold as CreateHousehold;
    const expected = cold('-a|', { a: request });
    http.post = jest.fn(() => expected);

    expect(service.create(request)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(
      `${appConfig.BASE_URL}${householdEndpoint}`, request
    );
  });

  it('should retreive all households for a user', () => {
    const households = TEST_DATA.household.households as Household[];
    const householdFilter = TEST_DATA.household.filter as HouseholdFilter;
    const expected = cold('-a|', { a: households });
    http.get = jest.fn(() => expected);

    expect(service.getAllForUser(userId, householdFilter)).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith(
      `${appConfig.BASE_URL}${userEndpoint}/${userId}/households`, expect.anything()
    );
  });

  it('should update a household', () => {
    const household = TEST_DATA.household.modifyHousehold as ModifyHousehold;
    const expected = cold('-a|', { a: household });
    http.put = jest.fn(() => expected);

    expect(service.update(household)).toBeObservable(expected);
    expect(http.put).toHaveBeenCalledWith(
      `${appConfig.BASE_URL}${householdEndpoint}`,
      household
    );
  });

  it('should remove a household', () => {
    const householdId = TEST_DATA.household.household.id;
    const expected = cold('-a|', { a: householdId });
    http.delete = jest.fn(() => expected);

    expect(service.delete(householdId)).toBeObservable(expected);
    expect(http.delete).toHaveBeenCalledWith(
      `${appConfig.BASE_URL}${householdEndpoint}/${householdId}`
    );
  });
});
