import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/reducers';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers';
import { LoginFormComponent } from './components';
import { MaterialModule } from '../material/material.module';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
