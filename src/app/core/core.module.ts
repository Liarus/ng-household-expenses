import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent, PageNotFoundComponent } from './containers';
import { MaterialModule } from '../material/material.module';
import { reducers } from './store/reducers';

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
        MaterialModule,
        StoreModule.forFeature('core', reducers)
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ]
})
export class CoreModule {}
