/// <reference types="jest" />

import {
  getHouseholdsLoading,
  getHouseholdErrorMessage,
  getHousehold,
  getHouseholdsCount,
  getHouseholdFilter
} from './';
import { Household } from '../../models/household.model';
import { HouseholdFilter } from '../../models/householdFilter.model';

describe('Household Selectors', () => {
  describe('getHouseholdsLoading', () => {
    it('should return loading', () => {
      const expectedLoading = true;
      const state = {
        households: {
          loading: expectedLoading
        }
      };

      expect(getHouseholdsLoading(state)).toBe(expectedLoading);
    });
  });

  describe('getErrorMessage', () => {
    it('should return error message', () => {
      const expectedError = 'test Error';
      const state = {
        households: {
          errorMessage: expectedError
        }
      };

      expect(getHouseholdErrorMessage(state)).toBe(expectedError);
    });
  });

  describe('getHousehold', () => {
    it('should return household', () => {
      const expectedHousehold: Household = {
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 Name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      };
      const households = {
        '550416ea-b523-4468-ae10-ea07d35eb9f0': expectedHousehold,
        '55798c3b-5551-489b-9dd2-d7e59691a368': {
          id: '55798c3b-5551-489b-9dd2-d7e59691a368',
          name: 'Household2 Name',
          symbol: 'Household2 symbol',
          description: 'Household2 description',
          street: 'Household2 street',
          city: 'Household2 city',
          country: 'Household2 country',
          zipCode: 'Household2 zipCode',
          version: 1
        },
        'b28e143a-a64a-469a-9704-a294cc7356cf': {
          id: 'b28e143a-a64a-469a-9704-a294cc7356cf',
          name: 'Household3 Name',
          symbol: 'Household3 symbol',
          description: 'Household3 description',
          street: 'Household3 street',
          city: 'Household3 city',
          country: 'Household3 country',
          zipCode: 'Household3 zipCode',
          version: 1
        }
      };

      expect(getHousehold(expectedHousehold.id)
        .projector(households)).toBe(expectedHousehold);
    });
  });

  describe('getCount', () => {
    it('should return count', () => {
      const expectedCount = 10;
      const state = {
        households: {
          count: expectedCount
        }
      };

      expect(getHouseholdsCount(state)).toBe(expectedCount);
    });
  });

  describe('getFilter', () => {
    it('should return filter', () => {
      const expectedFilter = {
        pageNumber: 10,
        pageSize: 10,
        searchText: 'test',
        sortingField: 'symbol',
        sortDirection: 'desc'
      } as HouseholdFilter;
      const state = {
        households: {
          filter: expectedFilter
        }
      };

      expect(getHouseholdFilter(state)).toBe(expectedFilter);
    });
  });
});
