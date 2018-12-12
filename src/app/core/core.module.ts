import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppComponent, PageNotFoundComponent } from './containers';
import { MaterialModule } from '../material/material.module';

const COMPONENTS = [
    AppComponent,
    PageNotFoundComponent
];

const PROVIDERS = [

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ]
})
export class CoreModule {}
