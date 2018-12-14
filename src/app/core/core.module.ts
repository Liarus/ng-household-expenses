import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent, PageNotFoundComponent } from './containers';
import { MaterialModule } from '../material/material.module';
import { reducers } from './store/reducers';
import { ToolbarComponent, SidebarComponent } from './components';

const COMPONENTS = [
    AppComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    SidebarComponent
];

const PROVIDERS = [

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FlexLayoutModule,
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
