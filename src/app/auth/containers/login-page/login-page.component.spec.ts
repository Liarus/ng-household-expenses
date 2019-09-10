import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LoginPageComponent } from './login-page.component';
import { LoginFormComponent } from '../../components';
import { MaterialModule } from '../../../material/material.module';
import * as AuthActions from '../../store/actions/auth.actions';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  let store: MockStore<any>;
  const initialState = {
    auth: {
      status: {
        loading: false
    }
  }};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [
        LoginPageComponent,
        LoginFormComponent
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch AuthActions.login action', () => {
    const request = TEST_DATA.auth.loginRequest;
    const expected = AuthActions.login({ request });

    component.onLogin(request);

    expect(store.dispatch).toHaveBeenLastCalledWith(expected);
  });
});
