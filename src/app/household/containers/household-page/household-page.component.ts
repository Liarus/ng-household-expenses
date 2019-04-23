import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import * as fromAuth from '../../../auth/store/reducers';
import * as fromRoot from '../../../store/reducers';
import * as fromLayout from '../../../layout/store/reducers';
import * as fromHousehold from '../../store/reducers';
import * as HouseholdActions from '../../store/actions/household.actions';
import { User } from '../../../auth/models/user.model';
import { HouseholdFilter } from '../../models/householdFilter.model';

@Component({
  selector: 'app-household-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-basic-container" fxFlex>
      <app-household-list *ngIf="!(isMobile$ | async)"
        [isLoading]="isLoading$ | async"
        [households]="household$ | async"
        [filter]="filter$ | async"
        [itemCount]="count$ | async"
        (create)="onCreate()"
        (remove)="onRemove($event)"
        (edit)="onEdit($event)"
        (filterChanged)="onFilterChanged($event)"
      ></app-household-list>
      <app-household-tiles *ngIf="isMobile$ | async"
        [isLoading]="isLoading$ | async"
        [households]="household$ | async"
        [itemCount]="count$ | async"
        (filterChanged)="onFilterChanged($event)"
      ></app-household-tiles>
    </div>
  `
})
export class HouseholdPageComponent implements OnDestroy {
  loggedUser$ = this.store.pipe(select(fromAuth.getLoggedUser));
  isLoading$ = this.store.pipe(select(fromHousehold.getHouseholdsLoading));
  isMobile$ = this.store.pipe(select(fromLayout.getIsMobile));
  household$ = this.store.pipe(select(fromHousehold.getAllHouseholds));
  filter$ = this.store.pipe(select(fromHousehold.getHouseholdFilter));
  count$ = this.store.pipe(select(fromHousehold.getHouseholdsCount));

  private unsubscribe: Subject<void> = new Subject();
  private userId: string;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedUser$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((loggedIn: User) => {
        this.userId = loggedIn ? loggedIn.id : undefined;
      });
    this.isMobile$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.store.dispatch(new HouseholdActions.InitHouseholds());
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onCreate() {
    this.store.dispatch(new HouseholdActions.OpenCreateHouseholdDialog({ userId: this.userId }));
  }

  onRemove(id: string) {
    this.store.dispatch(new HouseholdActions.RemoveHousehold({ householdId: id }));
  }

  onEdit(id: string) {
    this.store.dispatch(new HouseholdActions.OpenEditHouseholdDialog({
      userId: this.userId,
      householdId: id
    }));
  }

  onFilterChanged(change: Partial<HouseholdFilter>) {
    this.store.dispatch(new HouseholdActions.ApplyFilter(change));
  }
}
