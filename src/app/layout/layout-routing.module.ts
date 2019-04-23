import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLoggedInGuard } from '../auth/services/authLoggedIn-guard.service';
import { LayoutPageComponent } from './containers';
import { LoginPageComponent } from '../auth/containers';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'home',
        loadChildren: '../dummy/dummy.module#DummyModule',
        canActivate: [AuthLoggedInGuard]
      },
      {
        path: 'households',
        loadChildren: '../household/household.module#HouseholdModule',
        canActivate: [AuthLoggedInGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
