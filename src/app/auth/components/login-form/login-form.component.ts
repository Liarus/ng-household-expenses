import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginRequest } from '../../models/requests/loginRequest.model';

const fg = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
  password: new FormControl('', [Validators.required, Validators.maxLength(255)])
});

@Component({
  selector: 'app-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  @Output() login = new EventEmitter<LoginRequest>();

  form: FormGroup = fg;

  constructor() {}

  onSubmit() {
    if (this.form.valid) {
      this.login.emit(this.form.value);
    }
  }
}
