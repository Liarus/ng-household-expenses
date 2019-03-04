import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHouseholds from './household.reducer';

export const getHouseholdsState = createFeatureSelector<fromHouseholds.State>('households');

export const {
  selectIds: getHouseholdIds,
  selectEntities: getHouseholdEntities,
  selectAll: getAllHouseholds,
  selectTotal: getTotalHouseholds,
} = fromHouseholds.adapter.getSelectors(getHouseholdsState);

export const getHouseholdsLoading = createSelector(
  getHouseholdsState,
  fromHouseholds.getLoading
);

export const getHouseholdErrorMessage = createSelector(
  getHouseholdsState,
  fromHouseholds.getErrorMessage
);

export const getHousehold = (id: string) => createSelector(
  getHouseholdEntities,
  entities => entities[id]
);

export const getHouseholdFilter = createSelector(
  getHouseholdsState,
  fromHouseholds.getFilter
);

export const getHouseholdsCount = createSelector(
  getHouseholdsState,
  fromHouseholds.getCount
);
