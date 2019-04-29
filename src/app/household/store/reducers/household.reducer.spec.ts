/// <reference types="jest" />
import { reducer, initialState } from './household.reducer';
import { CreateHousehold } from '../../models/requests/createHousehold.model';
import { ModifyHousehold } from '../../models/requests/modifyHousehold.model';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import { Household } from '../../models/household.model';
import {
  AddHousehold,
  UpdateHousehold,
  RemoveHousehold,
  LoadHouseholds,
  AddHouseholdFail,
  LoadHouseholdsFail,
  RemoveHouseholdFail,
  UpdateHouseholdFail,
  AddHouseholdSuccess,
  UpdateHouseholdSuccess,
  RemoveHouseholdSuccess,
  LoadHouseholdsSuccess,
  ApplyFilter,
  SetAppendData
} from '../actions/household.actions';
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

  describe('HouseholdActionTypes.AddHousehold', () => {
    it('should update state as loading', () => {
      const request = TEST_DATA.household.createHousehold as CreateHousehold;
      const action = new AddHousehold(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('HouseholdActionTypes.UpdateHousehold', () => {
    it('should update state as loading', () => {
      const request = TEST_DATA.household.modifyHousehold as ModifyHousehold;
      const action = new UpdateHousehold(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('HouseholdActionTypes.RemoveHousehold', () => {
    it('should update state as loading', () => {
      const request = {
        householdId: TEST_DATA.household.household.id
      };
      const action = new RemoveHousehold(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('HouseholdActionTypes.LoadHouseholds', () => {
    it('should update state as loading', () => {
      const request = {
        userId: TEST_DATA.auth.userId
      };
      const action = new LoadHouseholds(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('AuthActionTypes.AddHouseholdFail', () => {
    it('should update errorMessage', () => {
      const request: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = new AddHouseholdFail(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: request.message
      });
    });
  });

  describe('AuthActionTypes.LoadHouseholdsFail', () => {
    it('should update errorMessage', () => {
      const request: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = new LoadHouseholdsFail(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: request.message
      });
    });
  });

  describe('AuthActionTypes.RemoveHouseholdFail', () => {
    it('should update errorMessage', () => {
      const request: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = new RemoveHouseholdFail(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: request.message
      });
    });
  });

  describe('AuthActionTypes.UpdateHouseholdFail', () => {
    it('should update errorMessage', () => {
      const request: ErrorMessage = {
        message: 'TestErrorMessage'
      };
      const action = new UpdateHouseholdFail(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: request.message
      });
    });
  });

  describe('HouseholdActionTypes.AddHouseholdSuccess', () => {
    it('should add household entity', () => {
      const request = TEST_DATA.household.household as Household;
      const action = new AddHouseholdSuccess(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        entities: {
          [request.id]: request
        },
        ids: [request.id],
        loading: false
      });
    });
  });

  describe('HouseholdActionTypes.UpdateHouseholdSuccess', () => {
    it('should add household entity', () => {
      const origin = TEST_DATA.household.household as Household;
      const request: Household = {
        id: origin.id,
        name: 'Updated Household1 Name',
        symbol: 'Updated Household1 symbol',
        description: 'Updated Household1 description',
        street: 'Updated Household1 street',
        city: 'Updated Household1 city',
        country: 'Updated Household1 country',
        zipCode: 'Updated Household1 zipCode',
        version: 2
      };
      const state = {
        ...initialState,
        entities: {
          [origin.id]: origin
        },
        ids: [origin.id],
        loading: false
      };
      const action = new UpdateHouseholdSuccess(request);
      const result = reducer(state, action);

      expect(result).toEqual({
        ...state,
        entities: {
          ...state.entities,
          [request.id]: request
        },
        ids: [...state.ids],
        loading: false
      });
    });
  });

  describe('HouseholdActionTypes.RemoveHouseholdSuccess', () => {
    it('should remove household entity', () => {
      const origin: Household[] = [
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
      ];
      const request = {
        householdId: '55798c3b-5551-489b-9dd2-d7e59691a368'
      };
      const state = {
        ...initialState,
        entities: {
          [origin[0].id]: origin[0],
          [origin[1].id]: origin[1],
        },
        ids: [origin[0].id, origin[1].id],
        loading: false
      };
      const action = new RemoveHouseholdSuccess(request);
      const result = reducer(state, action);

      expect(result).toEqual({
        ...state,
        entities: {
          [origin[0].id]: origin[0]
        },
        ids: [origin[0].id],
        loading: false
      });
    });
  });

  describe('HouseholdActionTypes.LoadHouseholdsSuccess', () => {
    it('should add household entities', () => {
      const request = {
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
      const action = new LoadHouseholdsSuccess(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        count: request.count,
        entities: request.households.reduce(
          (entityMap, item) => ({
            ...entityMap,
            [item.id]: item
          }),
          {}
        ),
        ids: request.households.map(user => user.id),
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
        appendData: true,
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
      const request = {
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
      const expected = households.concat(request.households);
      const action = new LoadHouseholdsSuccess(request);
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
        appendData: true
      });
    });
  });

  describe('HouseholdActionTypes.ApplyFilter', () => {
    it('should apply filter', () => {
      const request = TEST_DATA.household.filter as HouseholdFilter;
      const action = new ApplyFilter(request);
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
      const action = new ApplyFilter(request);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        filter: Object.assign({}, initialState.filter, request)
      });
    });
  });

  describe('HouseholdActionTypes.SetAppendData', () => {
    it('shoudl set append Data', () => {
      const expected = true;
      const action = new SetAppendData(expected);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        appendData: expected
      });
    });
  });
});
