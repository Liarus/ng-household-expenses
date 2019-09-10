
import { props, createAction } from '@ngrx/store';

import { CreateHousehold } from '../../models/requests/createHousehold.model';
import { Household } from '../../models/household.model';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import { ModifyHousehold } from '../../models/requests/modifyHousehold.model';
import { HouseholdFilter } from '../../models/householdFilter.model';

export const addHousehold = createAction(
  '[Household] Add Household',
  props<{ request: CreateHousehold }>()
);

export const addHouseholdSuccess = createAction(
  '[Household/API] Add Household Success',
  props<{ response: { householdId: string } }>()
);

export const addHouseholdFail = createAction(
  '[Household/API] Add Household Fail',
  props<{ error: ErrorMessage }>()
);

export const updateHousehold = createAction(
  '[Household] Update Household',
  props<{ request: ModifyHousehold }>()
);

export const updateHouseholdSuccess = createAction(
  '[Household/API] Update Household Success',
  props<{ response: { householdId: string } }>()
);

export const updateHouseholdFail = createAction(
  '[Household/API] Update Household Fail',
  props<{ error: ErrorMessage }>()
);

export const removeHousehold = createAction(
  '[Household] Remove Household',
  props<{ request: { householdId: string } }>()
);

export const removeHouseholdSuccess = createAction(
  '[Household/API] Remove Household Success',
  props<{ response: { householdId: string } }>()
);

export const removeHouseholdFail = createAction(
  '[Household/API] Remove Household Fail',
  props<{ error: ErrorMessage }>()
);

export const initHouseholds = createAction(
  '[Household] Init Households'
);

export const loadHouseholds = createAction(
  '[Household] Load Households'
);

export const loadHouseholdsSuccess = createAction(
  '[Household/API] Load Household Success',
  props<{ response: {
    count: number
    households: Household[]
  } }>()
);

export const loadHouseholdsFail = createAction(
  '[Household/API] Load Household Fail',
  props<{ error: ErrorMessage }>()
);

export const openCreateHouseholdDialog = createAction(
  '[Household] Open Create Household Dialog'
);

export const openEditHouseholdDialog = createAction(
  '[Household] Open Edit Household Dialo',
  props<{ request: { householdId: string } }>()
);

export const applyFilter = createAction(
  '[Household] Apply Filter',
  props<{ request: Partial<HouseholdFilter> }>()
);
