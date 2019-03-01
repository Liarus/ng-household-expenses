import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Household } from '../../models/household.model';
import { HouseholdActionsUnion, HouseholdActionTypes } from '../actions/household.actions';
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
        sortDirection: 'asc'
    } as HouseholdFilter
});

export function reducer(
    state = initialState,
    action: HouseholdActionsUnion
): State {
    switch (action.type) {
        case HouseholdActionTypes.AddHousehold:
        case HouseholdActionTypes.UpdateHousehold:
        case HouseholdActionTypes.RemoveHousehold:
        case HouseholdActionTypes.LoadHouseholds:
            return {
                ...state,
                errorMessage: '',
                loading: true
            };

        case HouseholdActionTypes.AddHouseholdFail:
        case HouseholdActionTypes.LoadHouseholdsFail:
        case HouseholdActionTypes.RemoveHouseholdFail:
        case HouseholdActionTypes.UpdateHouseholdFail:
            return {
                ...state,
                errorMessage: action.payload.message,
                loading: false
            };

        case HouseholdActionTypes.AddHouseholdSuccess:
            return adapter.addOne(action.payload, {
                ...state,
                loading: false
            });

        case HouseholdActionTypes.UpdateHouseholdSuccess:
            return adapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                },
                {
                    ...state,
                    loading: false
                }
            );

        case HouseholdActionTypes.RemoveHouseholdSuccess:
            return adapter.removeOne(action.payload.householdId, {
                ...state,
                loading: false
            });

        case HouseholdActionTypes.LoadHouseholdsSuccess:
            return adapter.addMany(action.payload.households, {
                ...adapter.removeAll({
                    ...state
                }),
                count: action.payload.count,
                loading: false
            });

        case HouseholdActionTypes.ApplyFilter: {
            return {
                ...state,
                filter: Object.assign({}, state.filter, action.payload)
            };
        }

        default: {
            return state;
        }

    }
}

export const getLoading = (state: State) => state.loading;
export const getErrorMessage = (state: State) => state.errorMessage;
export const getFilter = (state: State) => state.filter;
export const getCount = (state: State) => state.count;
