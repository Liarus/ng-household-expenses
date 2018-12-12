import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/containers';
import { CoreModule } from './core/core.module';
import { reducers, metaReducers } from './store/reducers';
import { CustomRouterStateSerializer } from './shared/helpers/routerState';
import { environment } from '../environments/environment';
import { HttpService } from './shared/services/http.service';
import { AppConfigDev } from './shared/configs/appConfig.dev';
import { AuthModule } from './auth/auth.module';

const PROVIDERS = [
  HttpService
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      name: 'ng-household-expenses',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    PROVIDERS,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: 'IAppConfig', useClass: AppConfigDev }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
