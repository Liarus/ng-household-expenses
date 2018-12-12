import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import * as AuthActions from '../store/actions/auth.actions';
import * as fromAuth from '../store/reducers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthLoggedInGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
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
