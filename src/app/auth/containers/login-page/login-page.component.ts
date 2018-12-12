import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-login-form></app-login-form>
  `
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
