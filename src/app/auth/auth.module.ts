import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './store/effects/auth.effects';
import { reducer } from './store/reducers/auth.reducer';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers';
import { LoginFormComponent } from './components';
import { MaterialModule } from '../material/material.module';
import { AuthService } from './services/auth.service';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent
];

const PROVIDERS = [
  AuthService
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
  providers: PROVIDERS
})
export class AuthModule {}
