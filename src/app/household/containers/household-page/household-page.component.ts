import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../../auth/store/reducers';
import * as fromRoot from '../../../store/reducers';
import * as fromHousehold from '../../store/reducers';
import * as HouseholdActions from '../../store/actions/household.actions';
import { Subject } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-household-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <p>Households</p>
  `
})
export class HouseholdPageComponent implements OnInit, OnDestroy {
  loggedUser$ = this.store.pipe(select(fromAuth.getLoggedUser));
  household$ = this.store.pipe(select(fromHousehold.getAllHouseholds));

  private unsubscribe: Subject<void> = new Subject();
  private userId: string;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedUser$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((loggedIn: User) => {
        this.userId = loggedIn.id;
        this.store.dispatch(new HouseholdActions.LoadHouseholds({userId: this.userId}));
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
