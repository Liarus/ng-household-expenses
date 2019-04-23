import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';
import { ToolbarComponent, SidebarComponent } from './components';
import { LayoutEffects } from './store/effects/layout.effects';
import { reducer } from './store/reducers/layout.reducer';
import { LayoutPageComponent } from './containers';
import { LayoutRoutingModule } from './layout-routing.module';

const COMPONENTS = [
  ToolbarComponent,
  SidebarComponent,
  LayoutPageComponent
];

const PROVIDERS = [
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LayoutRoutingModule,
    FlexLayoutModule,
    StoreModule.forFeature('layout', reducer),
    EffectsModule.forFeature([LayoutEffects]),
  ],
  declarations: [
    COMPONENTS
  ]
})
export class LayoutModule {}
