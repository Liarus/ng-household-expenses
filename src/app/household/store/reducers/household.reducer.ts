import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Household } from '../../models/household.model';
import * as HouseholdActions from '../actions/household.actions';
import { HouseholdFilter } from '../../models/householdFilter.model';

export interface State extends EntityState<Household> {
  loading: boolean;
  errorMessage: string;
  count: number;
  filter: HouseholdFilter;
}

export const adapter: EntityAdapter<Household> = createEntityAdapter<Household>({
  selectId: (household: Household) => household.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  count: 0,
  errorMessage: '',
  filter: {
    pageNumber: 1,
    pageSize: 10,
    searchText: '',
    sortingField: 'name',
    sortDirection: 'asc',
    appendData: false
  } as HouseholdFilter,
});

export const householdReducer = createReducer(
  initialState,
  on(HouseholdActions.addHousehold,
    HouseholdActions.removeHousehold,
    HouseholdActions.updateHousehold,
    HouseholdActions.loadHouseholds,
    state => ({
    ...state,
    loading: true
    })
  ),
  on(HouseholdActions.addHouseholdFail,
    HouseholdActions.removeHouseholdFail,
    HouseholdActions.updateHouseholdFail,
    HouseholdActions.loadHouseholdsFail,
    (state, { error }) => ({
    ...state,
    loading: false,
    errorMessage: error.message
    })
  ),
  on(HouseholdActions.addHouseholdSuccess,
    HouseholdActions.removeHouseholdSuccess,
    HouseholdActions.updateHouseholdSuccess,
    state => ({
    ...state,
    loading: false
    })
  ),
  on(HouseholdActions.loadHouseholdsSuccess, (state, { response }) => {
    if (state.filter.appendData) {
      return adapter.addMany(response.households, {
        ...state,
        loading: false,
        count: response.count
      });
    } else {
      return adapter.addAll(response.households, {
        ...state,
        loading: false,
        count: response.count
      });
    }
  }),
  on(HouseholdActions.applyFilter, (state, { request }) => ({
    ...state,
    filter: Object.assign({}, state.filter, request)
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return householdReducer(state, action);
}

export const getLoading = (state: State) => state.loading;
export const getErrorMessage = (state: State) => state.errorMessage;
export const getFilter = (state: State) => state.filter;
export const getCount = (state: State) => state.count;
