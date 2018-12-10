import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './containers';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: 'root',
        component: LayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class CoreRoutingModule { }
