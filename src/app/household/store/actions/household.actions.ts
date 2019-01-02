
import { CreateHousehold } from '../../models/requests/createHousehold.model';
import { Action } from '@ngrx/store';
import { Household } from '../../models/household.model';
import { ErrorMessage } from 'src/app/shared/models/errorMessage.model';
import { ModifyHousehold } from '../../models/requests/modifyHousehold.model';

export enum HouseholdActionTypes {
    AddHousehold = '[Household] Add Household',
    AddHouseholdSuccess = '[Household API] Add Household Success',
    AddHouseholdFail = '[Household API] Add Household Fail',
    UpdateHousehold = '[Household] Update Household',
    UpdateHouseholdSuccess = '[Household API] Update Household Success',
    UpdateHouseholdFail = '[Household API] Update Household Fail',
    RemoveHousehold = '[Household] Remove Household',
    RemoveHouseholdSuccess = '[Household API] Remove Household Success',
    RemoveHouseholdFail = '[Household API] Remove Household Fail',
    LoadHouseholds = '[Household] Load Households',
    LoadHouseholdsSuccess = '[Household API] Load Households Success',
    LoadHouseholdsFail = '[Household API] Load Households Fail',
    OpenCreateHouseholdDialog = '[Household] Open Create Household Dialog',
    OpenEditHouseholdDialog = '[Household] Open Edit Household Dialog'
}

export class AddHousehold implements Action {
    readonly type = HouseholdActionTypes.AddHousehold;

    constructor(public payload: CreateHousehold) {}
}

export class AddHouseholdSuccess implements Action {
    readonly type = HouseholdActionTypes.AddHouseholdSuccess;

    constructor(public payload: Household) {}
}

export class AddHouseholdFail implements Action {
    readonly type = HouseholdActionTypes.AddHouseholdFail;

    constructor(public payload: ErrorMessage) {}
}

export class UpdateHousehold implements Action {
    readonly type = HouseholdActionTypes.UpdateHousehold;

    constructor(public payload: ModifyHousehold) {}
}

export class UpdateHouseholdFail implements Action {
    readonly type = HouseholdActionTypes.UpdateHouseholdFail;

    constructor(public payload: ErrorMessage) {}
}

export class UpdateHouseholdSuccess implements Action {
    readonly type = HouseholdActionTypes.UpdateHouseholdSuccess;

    constructor(public payload: Partial<Household>) {}
}

export class RemoveHousehold implements Action {
    readonly type = HouseholdActionTypes.RemoveHousehold;

    constructor(public payload: {householdId: string}) {}
}

export class RemoveHouseholdSuccess implements Action {
    readonly type = HouseholdActionTypes.RemoveHouseholdSuccess;

    constructor(public payload: {householdId: string}) {}
}

export class RemoveHouseholdFail implements Action {
    readonly type = HouseholdActionTypes.RemoveHouseholdFail;

    constructor(public payload: ErrorMessage) {}
}

export class LoadHouseholds implements Action {
    readonly type = HouseholdActionTypes.LoadHouseholds;

    constructor(public payload: {userId: string}) {}
}

export class LoadHouseholdsSuccess implements Action {
    readonly type = HouseholdActionTypes.LoadHouseholdsSuccess;

    constructor(public payload: Household[]) {}
}

export class LoadHouseholdsFail implements Action {
    readonly type = HouseholdActionTypes.LoadHouseholdsFail;

    constructor(public payload: ErrorMessage) {}
}

export class OpenCreateHouseholdDialog implements Action {
    readonly type = HouseholdActionTypes.OpenCreateHouseholdDialog;

    constructor(public payload: {userId: string}) {}
}

export class OpenEditHouseholdDialog implements Action {
    readonly type = HouseholdActionTypes.OpenEditHouseholdDialog;

    constructor(public payload: {userId: string, householdId: string}) {}
}

export type HouseholdActionsUnion =
    | AddHousehold
    | AddHouseholdSuccess
    | AddHouseholdFail
    | UpdateHousehold
    | UpdateHouseholdSuccess
    | UpdateHouseholdFail
    | RemoveHousehold
    | RemoveHouseholdSuccess
    | RemoveHouseholdFail
    | LoadHouseholds
    | LoadHouseholdsSuccess
    | LoadHouseholdsFail
    | OpenCreateHouseholdDialog
    | OpenEditHouseholdDialog;
