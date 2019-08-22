import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../../store/reducers';
import * as fromLayoutSelectors from '../../../layout/store/selectors/layout.selectors';
import * as fromHouseholdSelectors from '../../store/selectors/household.selectors';
import * as HouseholdActions from '../../store/actions/household.actions';
import { HouseholdFilter } from '../../models/householdFilter.model';

@Component({
  selector: 'app-household-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-basic-container" fxFlex>
      <app-household-search
        (create)="onCreate()"
        (searchChanged)="onFilterChanged($event)"
      ></app-household-search>
      <app-household-list *ngIf="!(isMobile$ | async)"
        [isLoading]="isLoading$ | async"
        [households]="household$ | async"
        [filter]="filter$ | async"
        [itemCount]="count$ | async"
        (remove)="onRemove($event)"
        (edit)="onEdit($event)"
        (filterChanged)="onFilterChanged($event)"
      ></app-household-list>
      <app-household-tiles *ngIf="isMobile$ | async"
        [isLoading]="isLoading$ | async"
        [households]="household$ | async"
        [itemCount]="count$ | async"
        (filterChanged)="onFilterChanged($event)"
        (remove)="onRemove($event)"
        (edit)="onEdit($event)"
      ></app-household-tiles>
    </div>
  `
})
export class HouseholdPageComponent {
  isLoading$ = this.store.pipe(select(fromHouseholdSelectors.getHouseholdsLoading));
  isMobile$ = this.store.pipe(select(fromLayoutSelectors.getIsMobile));
  household$ = this.store.pipe(select(fromHouseholdSelectors.getAllHouseholds));
  filter$ = this.store.pipe(select(fromHouseholdSelectors.getHouseholdFilter));
  count$ = this.store.pipe(select(fromHouseholdSelectors.getHouseholdsCount));

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new HouseholdActions.InitHouseholds());
  }

  onCreate() {
    this.store.dispatch(new HouseholdActions.OpenCreateHouseholdDialog());
  }

  onRemove(householdId: string) {
    this.store.dispatch(new HouseholdActions.RemoveHousehold({ householdId }));
  }

  onEdit(householdId: string) {
    this.store.dispatch(new HouseholdActions.OpenEditHouseholdDialog({ householdId }));
  }

  onFilterChanged(change: Partial<HouseholdFilter>) {
    this.store.dispatch(new HouseholdActions.ApplyFilter(change));
  }
}
