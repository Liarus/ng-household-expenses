/// <reference types="jest" />
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

  it('should should match snapshot if not pending', () => {
    component.pending = false;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should should match snapshot if pending', () => {
    component.pending = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should submit with credentials if valid', () => {
    const expected = {
      email: 'user@test.com',
      password: 'test'
    };
    component.pending = false;
    component.form.setValue(expected);
    spyOn(component.submitted, 'emit');

    fixture.detectChanges();
    component.submit();

    expect(component.form.valid).toBe(true);
    expect(component.submitted.emit).toHaveBeenCalledWith(expected);
  });
});
