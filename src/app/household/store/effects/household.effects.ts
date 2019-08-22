
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap, filter, mergeMap, first, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { CreateHousehold } from '../../models/requests/createHousehold.model';
import { HouseholdService } from '../../services/household.service';
import { HttpError } from '../../../shared/helpers/httpError';
import { ModifyHousehold } from '../../models/requests/modifyHousehold.model';
import { ErrorMessage } from '../../../shared/models/errorMessage.model';
import * as fromRoot from '../../../store/reducers';
import * as fromHousehold from '../reducers';
import * as fromAuth from '../../../auth/store/reducers';
import * as fromLayout from '../../../layout/store/reducers';
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
  OpenEditHouseholdDialog,
  ApplyFilter,
  InitHouseholds
} from '../actions/household.actions';
import { HouseholdDialogComponent } from '../../components';
import { Guid } from '../../../shared/helpers/guid';
import { HouseholdSearch } from '../../models/responses/householdSearch.model';
import { HouseholdFilter } from '../../models/householdFilter.model';

const mobileFilter = {
  pageNumber: 1,
  pageSize: 10,
  sortingField: 'name',
  sortDirection: 'asc',
  appendData: true
} as Partial<HouseholdFilter>;

const desktopFilter = {
  appendData: false
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
          map(() => new AddHouseholdSuccess({ householdId: request.id })),
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
        map(() => new UpdateHouseholdSuccess({ householdId: request.id })),
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
    withLatestFrom(this.store$.pipe(select(fromLayout.getIsMobile))),
    switchMap(([_action, isMobile]) =>
      isMobile ? of(new ApplyFilter(mobileFilter)) : of(new ApplyFilter(desktopFilter))
    )
  );

  @Effect()
  loadHouseholds$ = this.actions$.pipe(
    ofType(HouseholdActionTypes.LoadHouseholds),
    withLatestFrom(
      this.store$.pipe(select(fromAuth.getLoggedUser)),
      this.store$.pipe(select(fromHousehold.getHouseholdFilter))
    ),
    switchMap(([_action, user, currentFilter]) =>
      this.householdService.getAllForUser(user.id, currentFilter)
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
    withLatestFrom(this.store$.pipe(select(fromAuth.getLoggedUser))),
    switchMap(([_action, user]) => {
      const dialogRef = this.dialog.open(HouseholdDialogComponent, {
        data: {
          userId: user.id,
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
    withLatestFrom(this.store$.pipe(select(fromAuth.getLoggedUser))),
    mergeMap(([payload, user]) =>
      this.store$.pipe(
        select(fromHousehold.getHousehold(payload.householdId)),
        first(),
        map(household => [household, user])
      )
    ),
    switchMap(([household, user]) => {
      const dialogRef = this.dialog.open(HouseholdDialogComponent, {
        data: {
          userId: user.id,
          household: household
        }
      });
      return dialogRef.afterClosed();
    }),
    filter((result: ModifyHousehold) => result !== undefined),
    map((result: ModifyHousehold) => new UpdateHousehold(result))
  );

  @Effect()
  isMobile$ = this.store$.pipe(
    select(fromLayout.getIsMobile),
    switchMap(() => of(new InitHouseholds()))
  );

  @Effect()
  reload$ = this.actions$.pipe(
    ofType(HouseholdActionTypes.ApplyFilter,
      HouseholdActionTypes.RemoveHouseholdSuccess,
      HouseholdActionTypes.AddHouseholdSuccess,
      HouseholdActionTypes.UpdateHouseholdSuccess),
    switchMap(() => of(new LoadHouseholds()))
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
