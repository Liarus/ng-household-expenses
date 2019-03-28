
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap, filter, mergeMap, first } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { Store, Action } from '@ngrx/store';

import { CreateHousehold } from '../../models/requests/createHousehold.model';
import { HouseholdService } from '../../services/household.service';
import { HttpError } from '../../../shared/helpers/httpError';
import { ModifyHousehold } from '../../models/requests/modifyHousehold.model';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import * as fromRoot from '../../../store/reducers';
import * as fromHousehold from '../reducers';
import * as fromAuth from '../../../auth/store/reducers';
import * as fromCore from '../../../core/store/reducers';
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
  OpenEditHouseholdDialog,
  InitHouseholds,
  SetAppendData,
  ApplyFilter
} from '../actions/household.actions';
import { HouseholdDialogComponent } from '../../components';
import { Guid } from '../../../shared/helpers/guid';
import { HouseholdSearch } from '../../models/responses/householdSearch.model';
import { User } from '../../../auth/models/user.model';
import { HouseholdFilter } from '../../models/householdFilter.model';

const mobileFilter = {
  pageNumber: 1,
  pageSize: 10,
  sortingField: 'name',
  sortDirection: 'asc'
} as Partial<HouseholdFilter>;

@Injectable()
export class HouseholdEffects {
  @Effect()
  addHousehold$ = this.actions$.pipe(
    ofType(HouseholdActionTypes.AddHousehold),
    map((action: AddHousehold) => action.payload),
    switchMap((request: CreateHousehold) =>
      this.householdService.create(request)
        .pipe(
          map(() => new AddHouseholdSuccess({
            id: request.id,
            name: request.name,
            symbol: request.symbol,
            description: request.description,
            street: request.street,
            city: request.city,
            country: request.country,
            zipCode: request.zipCode,
            version: request.version,
          })),
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
          map(() => new UpdateHouseholdSuccess({
            id: request.id,
            name: request.name,
            symbol: request.symbol,
            description: request.description,
            street: request.street,
            city: request.city,
            country: request.country,
            zipCode: request.zipCode,
            version: request.version + 1,
          })),
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
          map(() => new RemoveHouseholdSuccess({ householdId: householdId })),
          catchError(error => of(new RemoveHouseholdFail(HttpError.parse(error))))
        )
      )
    );

    @Effect()
    initHouseholds$ = this.actions$.pipe(
      ofType(HouseholdActionTypes.InitHouseholds),
      switchMap(() =>
        combineLatest(
          this.store$.select(fromAuth.getLoggedUser),
          this.store$.select(fromCore.getIsMobile)
        ).pipe(
          first(),
        )
      ),
      switchMap(([user, isMobile]) => {
        const actions = [new SetAppendData(isMobile)] as Action[];
        actions.push(isMobile
          ? new ApplyFilter(mobileFilter)
          : new LoadHouseholds({ userId: user.id}));
        return actions;
      })
    );

    @Effect()
    loadHouseholds$ = this.actions$.pipe(
      ofType(HouseholdActionTypes.LoadHouseholds),
      map((action: LoadHouseholds) => action.payload.userId),
      switchMap((userId: any) =>
        this.store$.select(fromHousehold.getHouseholdFilter)
        .pipe(
          first(),
          map(currentfilter => [userId, currentfilter])
        )
      ),
      switchMap(([userId, currentFilter]) =>
        this.householdService.getAllForUser(userId, currentFilter)
        .pipe(
          map((response: HouseholdSearch) => new LoadHouseholdsSuccess({
            count: response.count,
            households: response.households
          })),
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
          data: {
            userId: userId,
            household: { id: Guid.newGuid(), version: 1 }
          }
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
          map(household => [payload, household])
        )
      ),
      switchMap(([payload, household]) => {
        const dialogRef = this.dialog.open(HouseholdDialogComponent, {
          data: {userId: payload.userId, household: household}
        });
        return dialogRef.afterClosed();
      }),
      filter((result: ModifyHousehold) => result !== undefined),
      map((result: ModifyHousehold) => new UpdateHousehold(result))
    );

    @Effect()
    applyFilter$ = this.actions$.pipe(
      ofType(HouseholdActionTypes.ApplyFilter),
      switchMap(() =>
        this.store$.select(fromAuth.getLoggedUser)
        .pipe(first())
      ),
      map((user: User) => new LoadHouseholds({ userId: user.id}))
    );

    @Effect({ dispatch: false })
    error$ = this.actions$.pipe(
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
