import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHouseholds from './household.reducer';
import * as fromRoot from '../../../store/reducers';

export interface HouseholdState {
    households: fromHouseholds.State;
}

export interface State extends fromRoot.State {
    households: HouseholdState;
}

export const reducers: ActionReducerMap<HouseholdState> = {
    households: fromHouseholds.reducer
};

export const getHouseholdsState = createFeatureSelector<HouseholdState>('households');

export const getHouseholdEntitiesState = createSelector(
    getHouseholdsState,
    state => state.households
);

export const {
    selectIds: getHouseholdIds,
    selectEntities: getHouseholdEntities,
    selectAll: getAllHouseholds,
    selectTotal: getTotalHouseholds,
} = fromHouseholds.adapter.getSelectors(getHouseholdEntitiesState);

export const getHouseholdsLoading = createSelector(
    getHouseholdEntitiesState,
    fromHouseholds.getLoading
);

export const getHouseholdErrorMessage = createSelector(
    getHouseholdEntitiesState,
    fromHouseholds.getErrorMessage
);

export const getHousehold = (id: string) => createSelector(
    getHouseholdEntities,
    entities => entities[id]
);
