import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HouseholdEffects } from './store/effects/household.effects';
import { reducer } from './store/reducers/household.reducer';
import { HouseholdRoutingModule } from './household-routing.module';
import { MaterialModule } from '../material/material.module';
import { HouseholdPageComponent } from './containers';
import { HouseholdListComponent, HouseholdDialogComponent } from './components';

export const COMPONENTS = [
  HouseholdPageComponent,
  HouseholdListComponent,
  HouseholdDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HouseholdRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature('households', reducer),
    EffectsModule.forFeature([HouseholdEffects]),
  ],
  declarations: COMPONENTS,
  entryComponents: [
    HouseholdDialogComponent
  ]
})
export class HouseholdModule {}
