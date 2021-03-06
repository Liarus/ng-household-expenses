import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ROOT_REDUCERS, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { HttpTokenInterceptor } from './auth/services/httpToken.interceptor';
import { HttpAuthErrorInterceptor } from './auth/services/httpAuthError.interceptor';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { MaterialModule } from './material/material.module';
import { HttpRequestHeaderInterceptor } from './core/interceptors/httpRequestHeader.interceptor';
import { AppConfigDev } from './core/configs/appConfig.dev';
import { CustomRouterStateSerializer } from './store/reducers/router.reducer';

const PROVIDERS = [
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CoreModule,
    AuthModule,
    LayoutModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerializer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      name: 'ng-household-expenses',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthErrorInterceptor, multi: true },
    { provide: 'AppConfig', useClass: AppConfigDev }
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
