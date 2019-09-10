
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { map, switchMap, catchError, tap, filter, mergeMap, first, withLatestFrom, concatMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import { CreateHousehold } from '../../models/requests/createHousehold.model';
import { HouseholdService } from '../../services/household.service';
import { HttpError } from '../../../shared/helpers/httpError';
import { ModifyHousehold } from '../../models/requests/modifyHousehold.model';
import * as fromRoot from '../../../store/reducers';
import * as fromHouseholdSelectors from '../selectors/household.selectors';
import * as fromAuthSelectors from '../../../auth/store/selectors/auth.selectors';
import * as fromLayoutSelectors from '../../../layout/store/selectors/layout.selectors';
import * as HouseholdActions from '../actions/household.actions';
import { HouseholdDialogComponent } from '../../components';
import { Guid } from '../../../shared/helpers/guid';
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

  addHousehold$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseholdActions.addHousehold),
      concatMap(({ request }) =>
        this.householdService.create(request).pipe(
          map(() => HouseholdActions.addHouseholdSuccess({ response: {
            householdId: request.id
          }})),
          catchError(error => of(HouseholdActions.addHouseholdFail({ error: HttpError.parse(error) })))
        )
      )
    )
  );

  updateHousehold$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseholdActions.updateHousehold),
      concatMap(({ request }) =>
        this.householdService.update(request).pipe(
          map(() => HouseholdActions.updateHouseholdSuccess({ response: {
            householdId: request.id
          }})),
          catchError(error => of(HouseholdActions.updateHouseholdFail({ error: HttpError.parse(error) })))
        )
      )
    )
  );

  deleteHousehold$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseholdActions.removeHousehold),
      concatMap(({ request }) =>
        this.householdService.delete(request.householdId).pipe(
          map(() => HouseholdActions.removeHouseholdSuccess({ response: {
            householdId: request.householdId
          }})),
          catchError(error => of(HouseholdActions.removeHouseholdFail({ error: HttpError.parse(error) })))
        )
      )
    )
  );

  initHouseholds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseholdActions.initHouseholds),
      withLatestFrom(this.store$.pipe(select(fromLayoutSelectors.getIsMobile))),
      switchMap(([_action, isMobile]) =>
        isMobile ? of(HouseholdActions.applyFilter({ request: mobileFilter }))
        : of(HouseholdActions.applyFilter({ request: desktopFilter }))
      )
    )
  );


  loadHouseholds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseholdActions.loadHouseholds),
      withLatestFrom(
        this.store$.pipe(select(fromAuthSelectors.getLoggedUser)),
        this.store$.pipe(select(fromHouseholdSelectors.getHouseholdFilter))
      ),
      switchMap(([_action, user, currentFilter]) =>
        this.householdService.getAllForUser(user.id, currentFilter).pipe(
          map(response =>
            HouseholdActions.loadHouseholdsSuccess({ response: {
              count: response.count,
              households: response.households
            }})
          ),
          catchError(error => of(HouseholdActions.loadHouseholdsFail({ error: HttpError.parse(error) })))
        )
      )
    )
  );

  openCreateDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseholdActions.openCreateHouseholdDialog),
      withLatestFrom(this.store$.pipe(select(fromAuthSelectors.getLoggedUser))),
      exhaustMap(([_action, user]) => {
        const dialogRef = this.dialog.open(HouseholdDialogComponent, {
          data: {
            userId: user.id,
            household: { id: Guid.newGuid(), version: 1 }
          }
        });
        return dialogRef.afterClosed();
      }),
      filter(result => result !== undefined),
      map((result: CreateHousehold) => HouseholdActions.addHousehold({ request: result }))
    )
  );

  openModifyDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseholdActions.openEditHouseholdDialog),
      withLatestFrom(this.store$.pipe(select(fromAuthSelectors.getLoggedUser))),
      mergeMap(([{ request }, user]) =>
        this.store$.pipe(
          select(fromHouseholdSelectors.getHousehold(request.householdId)),
          first(),
          map(household => {
            return {
              household,
              user
            };
          })
        )
      ),
      exhaustMap(({ household , user }) => {
        const dialogRef = this.dialog.open(HouseholdDialogComponent, {
          data: {
            userId: user.id,
            household: household
          }
        });
        return dialogRef.afterClosed();
      }),
      filter(result => result !== undefined),
      map((result: ModifyHousehold) => HouseholdActions.updateHousehold({ request: result }))
    )
  );

  isMobile$ = createEffect(() =>
    this.store$.pipe(
      select(fromLayoutSelectors.getIsMobile),
      switchMap(() => of(HouseholdActions.initHouseholds()))
    )
  );

  reload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HouseholdActions.applyFilter,
        HouseholdActions.removeHouseholdSuccess,
        HouseholdActions.addHouseholdSuccess,
        HouseholdActions.updateHouseholdSuccess
      ),
      switchMap(() => of(HouseholdActions.loadHouseholds()))
    )
  );

  error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HouseholdActions.addHouseholdFail,
        HouseholdActions.loadHouseholdsFail,
        HouseholdActions.removeHouseholdFail,
        HouseholdActions.updateHouseholdFail
      ),
      tap(({ error }) => this.toastr.error(error.message))
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions,
              private store$: Store<fromRoot.State>,
              private householdService: HouseholdService,
              private toastr: ToastrService,
              private dialog: MatDialog) {}
}
