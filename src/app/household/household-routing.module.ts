import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseholdPageComponent } from './containers';

const routes: Routes = [{ path: '', component: HouseholdPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseholdRoutingModule {}
