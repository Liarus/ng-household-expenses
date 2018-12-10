import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { RootComponent, LayoutComponent } from './containers';
import { CoreRoutingModule } from './core-routing.module';

const COMPONENTS = [
    RootComponent,
    LayoutComponent
];

const PROVIDERS = [

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CoreRoutingModule,
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: CoreModule,
            providers: [PROVIDERS]
        };
    }
}
