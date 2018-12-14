import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromCore from '../../store/reducers/index';
import * as fromAuth from '../../../auth/store/reducers';
import * as fromRoot from '../../../store/reducers';
import * as LayoutActions from '../../store/actions/layout.actions';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-toolbar [user]="user$ | async"
    ></app-toolbar>
    <router-outlet></router-outlet>
`
})
export class AppComponent {
  user$ = this.store.pipe(select(fromAuth.getLoggedUser));
  title = 'ng-household-expenses';

  constructor(private store: Store<fromRoot.State>) { }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.store.dispatch(new LayoutActions.ResizeWindow(
      {
        width: $event.target.innerWidth,
        height: $event.target.innerHeight
      })
    );
  }
}
