
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CreateHousehold } from '../../models/requests/createHousehold.model';
import { HouseholdService } from '../../services/household.service';
import { HttpError } from 'src/app/shared/helpers/httpError';
import { ModifyHousehold } from '../../models/requests/modifyHousehold.model';
import { Household } from '../../models/household.model';
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
    LoadHouseholdsFail
} from '../actions/household.actions';
import { ErrorMessage } from 'src/app/shared/models/errorMessage.model';

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
                        version: 1,
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
    loadHouseholds = this.actions$.pipe(
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
                private householdService: HouseholdService,
                private toastr: ToastrService) {}
}
