import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/containers';
import { AuthLoggedInGuard } from './auth/services/authLoggedIn-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './dummy/dummy.module#DummyModule',
    canActivate: [AuthLoggedInGuard],
  },
  {
    path: 'households',
    loadChildren: './household/household.module#HouseholdModule'
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
