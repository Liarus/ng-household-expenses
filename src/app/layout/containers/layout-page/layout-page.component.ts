import { Component, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromLayout from '../../store/reducers/index';
import * as fromAuth from '../../../auth/store/reducers';
import * as fromRoot from '../../../store/reducers';
import * as LayoutActions from '../../store/actions/layout.actions';
import * as AuthActions from '../../../auth/store/actions/auth.actions';

@Component({
  selector: 'app-layout-page',
  template: `
    <app-toolbar [user]="user$ | async"
      (toggleSidebar)="onSidebarToggled()"
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
  user$ = this.store.pipe(select(fromAuth.getLoggedUser));
  isSidebarExpanded$ = this.store.pipe(select(fromLayout.getIsSidebarExpanded));
  menuItems$ = this.store.pipe(select(fromLayout.getMenuItems));
  title = 'ng-household-expenses';

  constructor(private store: Store<fromRoot.State>) { }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.store.dispatch(new LayoutActions.ResizeWindow({
      width: $event.target.innerWidth,
      height: $event.target.innerHeight
    }));
  }

  onSidebarToggled() {
    this.store.dispatch(new LayoutActions.ToggleSidebar());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
