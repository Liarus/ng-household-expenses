import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// import { HouseholdEffects } from './store/effects/household.effects';
import { reducers } from './store/reducers';
import { HouseholdRoutingModule } from './household-routing.module';
import { MaterialModule } from '../material/material.module';
import { HouseholdPageComponent } from './containers';

export const COMPONENTS = [
    HouseholdPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HouseholdRoutingModule,
    MaterialModule,
    StoreModule.forFeature('households', reducers),
    // EffectsModule.forFeature([HouseholdEffects]),
  ],
  declarations: COMPONENTS,
})
export class HouseholdModule {}
