import { Component, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromLayoutSelectors from '../../store/selectors/layout.selectors';
import * as fromAuthSelectors from '../../../auth/store/selectors/auth.selectors';
import * as fromRoot from '../../../store/reducers';
import * as LayoutActions from '../../store/actions/layout.actions';
import * as AuthActions from '../../../auth/store/actions/auth.actions';

@Component({
  selector: 'app-layout-page',
  template: `
    <app-toolbar [user]="user$ | async"
      (toggleSidebar)="onToggleSidebar()"
      (logout)="onLogout()"
    ></app-toolbar>
    <app-sidebar [isExpanded]="isSidebarExpanded$ | async"
      [menuItems]="menuItems$ | async"
    >
      <router-outlet></router-outlet>
    </app-sidebar>
  `
})
export class LayoutPageComponent {
  user$ = this.store.pipe(select(fromAuthSelectors.getLoggedUser));
  isSidebarExpanded$ = this.store.pipe(select(fromLayoutSelectors.getIsSidebarExpanded));
  menuItems$ = this.store.pipe(select(fromLayoutSelectors.getMenuItems));
  title = 'ng-household-expenses';

  constructor(private store: Store<fromRoot.State>) { }

  onToggleSidebar() {
    this.store.dispatch(new LayoutActions.ToggleSidebar());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
