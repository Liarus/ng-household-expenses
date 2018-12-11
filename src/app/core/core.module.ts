import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { RootComponent, LayoutComponent, PageNotFoundComponent } from './containers';
import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';

const COMPONENTS = [
    RootComponent,
    LayoutComponent,
    PageNotFoundComponent
];

const PROVIDERS = [

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CoreRoutingModule,
        MaterialModule
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ]
})
export class CoreModule { }
