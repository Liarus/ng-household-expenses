import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHousehold from '../reducers/household.reducer';

export const getHouseholdsState = createFeatureSelector<fromHousehold.State>('households');

export const {
  selectIds: getHouseholdIds,
  selectEntities: getHouseholdEntities,
  selectAll: getAllHouseholds,
  selectTotal: getTotalHouseholds,
} = fromHousehold.adapter.getSelectors(getHouseholdsState);

export const getHouseholdsLoading = createSelector(
  getHouseholdsState,
  fromHousehold.getLoading
);

export const getHouseholdErrorMessage = createSelector(
  getHouseholdsState,
  fromHousehold.getErrorMessage
);

export const getHousehold = (id: string) => createSelector(
  getHouseholdEntities,
  entities => entities[id]
);

export const getHouseholdFilter = createSelector(
  getHouseholdsState,
  fromHousehold.getFilter
);

export const getHouseholdsCount = createSelector(
  getHouseholdsState,
  fromHousehold.getCount
);
