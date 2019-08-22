import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as AuthActions from '../store/actions/auth.actions';
import * as fromAuth from '../store/reducers/auth.reducer';
import * as fromAuthSelectors from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthLoggedInGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuthSelectors.getLoggedIn),
      map(logged => {
        if (!logged) {
          this.store.dispatch(new AuthActions.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
