/// <reference types="jest" />
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';

import { LoginPageComponent } from './login-page.component';
import { LoginFormComponent } from '../../components';
import { MaterialModule } from '../../../material/material.module';
import { MockStore } from '../../../shared/tests/mockStore';
import * as AuthActions from '../../store/actions/auth.actions';
import { LoginRequest } from '../../models/requests/loginRequest.model';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  let store: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        LoginPageComponent,
        LoginFormComponent
      ],
      providers: [{ provide: Store, useClass: MockStore }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({
      auth: {
        status: {
          loading: false
        }
      }
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch Login action', () => {
    const credentials: LoginRequest = {
      username: 'user@test.comn',
      password: 'test'
    };
    const expected = new AuthActions.Login(credentials);

    component.onSubmit(credentials);

    expect(store.dispatch).toHaveBeenLastCalledWith(expected);
  });
});
