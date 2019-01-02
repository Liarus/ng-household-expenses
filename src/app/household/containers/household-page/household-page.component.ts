import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import * as fromAuth from '../../../auth/store/reducers';
import * as fromRoot from '../../../store/reducers';
import * as fromCore from '../../../core/store/reducers';
import * as fromHousehold from '../../store/reducers';
import * as HouseholdActions from '../../store/actions/household.actions';
import { User } from 'src/app/auth/models/user.model';


@Component({
  selector: 'app-household-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-basic-container">
      <app-household-list [isLoading]='isLoading$ | async'
        [isMobile]='isMobile$ | async'
        [households]='household$ | async'
        (create)=onCreate()
        (remove)=onRemove($event)
        (edit)=onEdit($event)
      ></app-household-list>
    </div>
  `
})
export class HouseholdPageComponent implements OnInit, OnDestroy {
  loggedUser$ = this.store.pipe(select(fromAuth.getLoggedUser));
  isLoading$ = this.store.pipe(select(fromHousehold.getHouseholdsLoading));
  isMobile$ = this.store.pipe(select(fromCore.getIsMobile));
  household$ = this.store.pipe(select(fromHousehold.getAllHouseholds));

  private unsubscribe: Subject<void> = new Subject();
  private userId: string;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedUser$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((loggedIn: User) => {
        if (loggedIn) {
          this.userId = loggedIn.id;
          this.store.dispatch(new HouseholdActions.LoadHouseholds({userId: this.userId}));
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onCreate() {
    this.store.dispatch(new HouseholdActions.OpenCreateHouseholdDialog({userId: this.userId}));
  }

  onRemove(id: string) {
    this.store.dispatch(new HouseholdActions.RemoveHousehold({householdId: id}));
  }

  onEdit(id: string) {
    this.store.dispatch(new HouseholdActions.OpenEditHouseholdDialog({userId: this.userId, householdId: id}));
  }
}
