import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeDetectionStrategy } from '@angular/core';

import { LoginFormComponent } from './login-form.component';
import { MaterialModule } from '../../../material/material.module';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [LoginFormComponent]
    })
      .overrideComponent(LoginFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with credentials if valid', () => {
    const expected = {
      email: 'user@test.com',
      password: 'test'
    };
    component.pending = false;
    component.form.setValue(expected);
    spyOn(component.login, 'emit');
    fixture.detectChanges();

    component.onSubmit();

    expect(component.form.valid).toBe(true);
    expect(component.login.emit).toHaveBeenCalledWith(expected);
  });
});
