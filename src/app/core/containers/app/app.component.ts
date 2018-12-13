import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromCore from '../../store/reducers/index';
import * as LayoutActions from '../../store/actions/layout.actions';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
`
})
export class AppComponent {
  public title = 'ng-household-expenses';

  constructor(private store: Store<fromCore.State>) { }

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
