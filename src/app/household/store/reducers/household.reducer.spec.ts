import { reducer, initialState } from './household.reducer';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import { Household } from '../../models/household.model';
import * as HouseholdActions from '../actions/household.actions';
import { HouseholdFilter } from '../../models/householdFilter.model';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('HouseholdReducer', () => {
  describe('undefined action', () => {
    it('should retun defult state', () => {
      const action = {type: 'NOOP'} as any;
      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('HouseholdActions.addHousehold', () => {
    it('should update state as loading', () => {
      const request = TEST_DATA.household.createHousehold;
      const action = HouseholdActions.addHousehold({ request });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('HouseholdActions.updateHousehold', () => {
    it('should update state as loading', () => {
      const request = TEST_DATA.household.modifyHousehold;
      const action = HouseholdActions.updateHousehold({ request });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('HouseholdActions.removeHousehold', () => {
    it('should update state as loading', () => {
      const request = {
        householdId: TEST_DATA.household.household.id
      };
      const action = HouseholdActions.removeHousehold({ request });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('HouseholdActions.loadHouseholds', () => {
    it('should update state as loading', () => {
      const action = HouseholdActions.loadHouseholds();
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('HouseholdActions.addHouseholdFail', () => {
    it('should update errorMessage', () => {
      const error: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = HouseholdActions.addHouseholdFail({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: error.message
      });
    });
  });

  describe('HouseholdActions.loadHouseholdsFail', () => {
    it('should update errorMessage', () => {
      const error: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = HouseholdActions.loadHouseholdsFail({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: error.message
      });
    });
  });

  describe('HouseholdActions.removeHouseholdFail', () => {
    it('should update errorMessage', () => {
      const error: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = HouseholdActions.removeHouseholdFail({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: error.message
      });
    });
  });

  describe('HouseholdActions.updateHouseholdFail', () => {
    it('should update errorMessage', () => {
      const error: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = HouseholdActions.updateHouseholdFail({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: error.message
      });
    });
  });

  describe('HouseholdActions.addHouseholdSuccess', () => {
    it('should set loading to false', () => {
      const response = {
        householdId: TEST_DATA.household.household.id
      };
      const action = HouseholdActions.addHouseholdSuccess({ response });
      const result = reducer({
        ...initialState,
        loading: true
      }, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('HouseholdActions.updateHouseholdSuccess', () => {
    it('should set loading to false', () => {
      const response = {
        householdId: TEST_DATA.household.household.id
      };
      const action = HouseholdActions.updateHouseholdSuccess({ response });
      const result = reducer({
        ...initialState,
        loading: true
      }, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('HouseholdActions.removeHouseholdSuccess', () => {
    it('should set loading to false', () => {
      const response = {
        householdId: TEST_DATA.household.household.id
      };
      const action = HouseholdActions.removeHouseholdSuccess({ response });
      const result = reducer({
        ...initialState,
        loading: true
      }, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('HouseholdActions.loadHouseholdsSuccess', () => {
    it('should add household entities', () => {
      const response = {
        count: 2,
        households: [
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
        ] as Household[]
      };
      const action = HouseholdActions.loadHouseholdsSuccess({ response });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        count: response.count,
        entities: response.households.reduce(
          (entityMap, item) => ({
            ...entityMap,
            [item.id]: item
          }),
          {}
        ),
        ids: response.households.map(user => user.id),
        loading: false
      });
    });

    it('should append household entities', () => {
      const households = [
        {
          id: 'c82bca66-49ca-43b9-bd39-3e578e97f54a',
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
          id: '56a9f23d-ba39-455f-8cf9-80c9a3636349',
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
      const currentState = {
        ...initialState,
        filter: {
          ...initialState.filter,
          appendData: true
        },
        count: 4,
        entities: households.reduce(
          (entityMap, item) => ({
            ...entityMap,
            [item.id]: item
          }),
          {}
        ),
        ids: households.map(user => user.id),
      };
      const response = {
        count: 4,
        households: [
          {
            id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
            name: 'Household3 Name',
            symbol: 'Household3 symbol',
            description: 'Household3 description',
            street: 'Household3 street',
            city: 'Household3 city',
            country: 'Household3 country',
            zipCode: 'Household3 zipCode',
            version: 1
          },
          {
            id: '55798c3b-5551-489b-9dd2-d7e59691a368',
            name: 'Household4 Name',
            symbol: 'Household4 symbol',
            description: 'Household4 description',
            street: 'Household4 street',
            city: 'Household4 city',
            country: 'Household4 country',
            zipCode: 'Household4 zipCode',
            version: 1
          }
        ] as Household[]
      };
      const expected = households.concat(response.households);
      const action = HouseholdActions.loadHouseholdsSuccess({ response });
      const result = reducer(currentState, action);

      expect(result).toEqual({
        ...initialState,
        count: 4,
        entities: expected.reduce(
          (entityMap, item) => ({
            ...entityMap,
            [item.id]: item
          }),
          {}
        ),
        ids: expected.map(user => user.id),
        filter: {
          ...initialState.filter,
          appendData: true
        }
      });
    });
  });

  describe('HouseholdActions.ApplyFilter', () => {
    it('should apply filter', () => {
      const request = TEST_DATA.household.filter;
      const action = HouseholdActions.applyFilter({ request });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        filter: request
      });
    });

    it('should merge filter change', () => {
      const request = {
        searchText: 'test',
      } as Partial<HouseholdFilter>;
      const action = HouseholdActions.applyFilter({ request });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        filter: Object.assign({}, initialState.filter, request)
      });
    });
  });
});
