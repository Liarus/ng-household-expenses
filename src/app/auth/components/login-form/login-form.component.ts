import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SignInRequest } from '../../models/requests/signInRequest.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
export class LoginFormComponent implements OnInit {

  @Input() isLoading: boolean;

  @Output() submitted = new EventEmitter<SignInRequest>();

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = fg;
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
