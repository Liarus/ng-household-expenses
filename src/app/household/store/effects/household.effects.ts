
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap, filter, withLatestFrom, take, mergeMap, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { CreateHousehold } from '../../models/requests/createHousehold.model';
import { HouseholdService } from '../../services/household.service';
import { HttpError } from '../../../shared/helpers/httpError';
import { ModifyHousehold } from '../../models/requests/modifyHousehold.model';
import { Household } from '../../models/household.model';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import * as fromRoot from '../../../store/reducers';
import * as fromHousehold from '../reducers';
import {
    HouseholdActionTypes,
    AddHousehold,
    AddHouseholdSuccess,
    AddHouseholdFail,
    UpdateHousehold,
    UpdateHouseholdSuccess,
    UpdateHouseholdFail,
    RemoveHousehold,
    RemoveHouseholdSuccess,
    RemoveHouseholdFail,
    LoadHouseholds,
    LoadHouseholdsSuccess,
    LoadHouseholdsFail,
    OpenCreateHouseholdDialog,
    OpenEditHouseholdDialog
} from '../actions/household.actions';
import { HouseholdDialogComponent } from '../../components';
import { Guid } from 'src/app/shared/helpers/guid';

@Injectable()
export class HouseholdEffects {
    @Effect()
    addHousehold$ = this.actions$.pipe(
        ofType(HouseholdActionTypes.AddHousehold),
        map((action: AddHousehold) => action.payload),
        switchMap((request: CreateHousehold) =>
            this.householdService.create(request)
            .pipe(
                map(response => new AddHouseholdSuccess(
                    {
                        id: request.id,
                        name: request.name,
                        symbol: request.symbol,
                        description: request.description,
                        street: request.street,
                        city: request.city,
                        country: request.country,
                        zipCode: request.zipCode,
                        version: request.version,
                    })
                ),
                catchError(error => of(new AddHouseholdFail(HttpError.parse(error))))
            )
        )
    );

    @Effect()
    updateHousehold$ = this.actions$.pipe(
        ofType(HouseholdActionTypes.UpdateHousehold),
        map((action: UpdateHousehold) => action.payload),
        switchMap((request: ModifyHousehold) =>
            this.householdService.update(request)
            .pipe(
                map(response => new UpdateHouseholdSuccess(
                    {
                        id: request.id,
                        name: request.name,
                        symbol: request.symbol,
                        description: request.description,
                        street: request.street,
                        city: request.city,
                        country: request.country,
                        zipCode: request.zipCode,
                        version: request.version + 1,
                    })
                ),
                catchError(error => of(new UpdateHouseholdFail(HttpError.parse(error))))
            )
        )
    );

    @Effect()
    deleteHousehold$ = this.actions$.pipe(
        ofType(HouseholdActionTypes.RemoveHousehold),
        map((action: RemoveHousehold) => action.payload.householdId),
        switchMap((householdId: string) =>
            this.householdService.delete(householdId)
            .pipe(
                map(response => new RemoveHouseholdSuccess({householdId: householdId})),
                catchError(error => of(new RemoveHouseholdFail(HttpError.parse(error))))
            )
        )
    );

    @Effect()
    loadHouseholds$ = this.actions$.pipe(
        ofType(HouseholdActionTypes.LoadHouseholds),
        map((action: LoadHouseholds) => action.payload.userId),
        switchMap((userId: string) =>
            this.householdService.getAllForUser(userId)
            .pipe(
                map((response: Household[]) => new LoadHouseholdsSuccess(response)),
                catchError(error => of(new LoadHouseholdsFail(HttpError.parse(error))))
            )
        )
    );

    @Effect()
    openCreateDialog$ = this.actions$.pipe(
        ofType(HouseholdActionTypes.OpenCreateHouseholdDialog),
        map((action: OpenCreateHouseholdDialog) => action.payload.userId),
        switchMap((userId: string) => {
            const dialogRef = this.dialog.open(HouseholdDialogComponent, {
                data: {userId: userId, household: {id: Guid.newGuid(), version: 1}}
            });
            return dialogRef.afterClosed();
        }),
        filter((result: CreateHousehold) => result !== undefined),
        map((result: CreateHousehold) => new AddHousehold(result))
    );

    @Effect()
    openModifyDialog$ = this.actions$.pipe(
        ofType(HouseholdActionTypes.OpenEditHouseholdDialog),
        map((action: OpenEditHouseholdDialog) => action.payload),
        mergeMap((payload: any) =>
            this.store$.select(fromHousehold.getHousehold(payload.householdId))
            .pipe(
                first(),
                map( household => [payload, household])
            )
        ),
        switchMap(([payload, household]) => {
            const dialogRef = this.dialog.open(HouseholdDialogComponent, {
                data: {userId: payload.userId, household: household}
            });
            return dialogRef.afterClosed();
        }),
        filter((result: CreateHousehold) => result !== undefined),
        map((result: CreateHousehold) => new AddHousehold(result))
    );

    @Effect({ dispatch: false })
    errors$ = this.actions$.pipe(
      ofType(HouseholdActionTypes.AddHouseholdFail,
        HouseholdActionTypes.LoadHouseholdsFail,
        HouseholdActionTypes.RemoveHouseholdFail,
        HouseholdActionTypes.UpdateHouseholdFail),
      map((action: any) => action.payload),
      tap((error: ErrorMessage) => this.toastr.error(error.message, 'Alert!'))
    );

    constructor(private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private householdService: HouseholdService,
                private toastr: ToastrService,
                private dialog: MatDialog) {}
}
