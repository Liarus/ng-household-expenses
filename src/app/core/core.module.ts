import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent, PageNotFoundComponent } from './containers';
import { MaterialModule } from '../material/material.module';
import { reducers } from './store/reducers';
import { ToolbarComponent, SidebarComponent } from './components';
import { LayoutEffects } from './store/effects/layout.effects';

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
        StoreModule.forFeature('core', reducers),
        EffectsModule.forFeature([LayoutEffects]),
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ]
})
export class CoreModule {}
