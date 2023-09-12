import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NotfoundComponent } from './pages/ErrorPages/notfound/notfound.component';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WapelApps } from '@wapelSharedLib/core/models/enum/WapelApps.enum';
import { RouterLoaderService } from '@wapelSharedLib/core/interceptors/router-loader.service';
import { HttpLoadingService } from '@wapelSharedLib/core/interceptors/HttpLoading.service';
import { HeaderKeysService } from '@wapelSharedLib/core/interceptors/header-keys.service';
import { ErrorhandlerService } from '@wapelSharedLib/core/interceptors/global-error-handler/errorhandler.service';
import { AppComponent } from './app.component';
import { LocalStorageKeys } from './core/models/enum/LocalStorageKeys.enum';
import { RouterModule } from '@angular/router';
import { ApplicationSettingsService } from './services/application-settings.service';
import { WapelInjectToken } from '@wapelSharedLib/core/token/WapelInjectToken.enum';
import { AppLayoutModule } from '@hrLayout/app.layout.module';
const config: SocketIoConfig = {
  url: environment.socketServer.url,
  options: {
    reconnectionAttempts: 3,
    reconnectionDelay: 2000,
    timeout: 5000,
    reconnection: false,
  },
};

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AppLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxSpinnerModule,
    ToastModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorhandlerService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderKeysService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RouterLoaderService,
      multi: true,
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeSettingData,
    //   deps: [ApplicationSettingsService],
    //   multi: true,
    // },
    // {
    //   provide: TitleStrategy,
    //   useClass: TitleTranslationStrategyService,
    // },
    {
      provide: WapelInjectToken.APP_ENVIRONMENT,
      useValue: Object.assign(environment),
    },
    {
      provide: WapelInjectToken.APP_NAME,
      useValue: WapelApps.HR_APP,
    },
    {
      provide: WapelInjectToken.APP_LOCAL_STORAGE_KEYS,
      useValue: LocalStorageKeys,
    },
    // { provide: APP_BASE_HREF, useValue: 'http://localhost:5000/#/' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

function initializeSettingData(settingConfig: ApplicationSettingsService) {
  return (): Promise<any> => {
    return settingConfig
      .loadSettingData()
      .then(() => {
        settingConfig.setSetting({});
      })
      .catch(() => {
        settingConfig.setSetting({});
      });
  };
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
