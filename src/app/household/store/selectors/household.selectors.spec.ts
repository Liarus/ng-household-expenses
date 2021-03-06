import {
  getHouseholdsLoading,
  getHouseholdErrorMessage,
  getHousehold,
  getHouseholdsCount,
  getHouseholdFilter
} from './household.selectors';
import { Household } from '../../models/household.model';
import { TEST_DATA } from '../../../shared/tests/test-data';
import { State } from '../reducers/household.reducer';

describe('Household Selectors', () => {
  const householdState: State = {
    loading: true,
    errorMessage: 'test Error',
    count: 10,
    filter: TEST_DATA.household.filter,
    ids: [],
    entities: {}
  };

  const state = {
    households: householdState
  };


  describe('getHouseholdsLoading', () => {
    it('should return loading', () => {
      const expectedLoading = true;

      expect(getHouseholdsLoading(state)).toBe(expectedLoading);
    });
  });

  describe('getErrorMessage', () => {
    it('should return error message', () => {
      const expectedError = 'test Error';

      expect(getHouseholdErrorMessage(state)).toBe(expectedError);
    });
  });

  describe('getHousehold', () => {
    it('should return household', () => {
      const expectedHousehold = TEST_DATA.household.household as Household;
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

      expect(getHouseholdsCount(state)).toBe(expectedCount);
    });
  });

  describe('getFilter', () => {
    it('should return filter', () => {
      const expectedFilter  = TEST_DATA.household.filter;

      expect(getHouseholdFilter(state)).toBe(expectedFilter);
    });
  });
});
