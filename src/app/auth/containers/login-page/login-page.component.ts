import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../store/reducers';
import * as AuthActions from '../../store/actions/auth.actions';
import { LoginRequest } from '../../models/requests/loginRequest.model';

@Component({
  selector: 'app-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-login-form
      [pending]="isLoading$ | async"
      (submitted)="onSubmit($event)"
    ></app-login-form>
  `
})
export class LoginPageComponent implements OnInit {

  isLoading$ = this.store.pipe(select(fromAuth.getLoading));

  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
  }

  onSubmit($event: LoginRequest) {
    this.store.dispatch(new AuthActions.Login($event));
  }
}
