import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../helpers/LocalStorage.service';
import { WapelHeaderKeys } from '../models/enum/WapelHeaderKeys.enum';
import { LoginResponseModel } from '../models/interfaace/AppAuthEntity.interface';
import { LocalStorageKeysModel } from '../models/interfaace/LocalStorageKeysModel.interface';
import { WapelInjectToken } from '../token/WapelInjectToken.enum';

@Injectable({
  providedIn: 'root',
})
export class HeaderKeysService implements HttpInterceptor {
  constructor(
    @Inject(WapelInjectToken.APP_LOCAL_STORAGE_KEYS)
    public localStorage: LocalStorageKeysModel,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const currentLang =
      this.localStorageService.getLocal(this.localStorage.APP_LANG as string) ??
      'ar';
    const userSession: LoginResponseModel =
      this.localStorageService.getSessionStorage(
        this.localStorage.APP_TOKEN_SESSION as string,
      );
    const selecetedRole = this.localStorageService.getSessionStorage(
      this.localStorage.APP_USER_SELECTED_ROLE as string,
    );
    if (currentLang) {
      const request = req.clone({
        headers: req.headers
          .append(
            WapelHeaderKeys.HEADER_CURRENT_MC_CODE,
            userSession && userSession.mcCode
              ? String(userSession?.mcCode)
              : String(1),
          )
          .append(
            WapelHeaderKeys.HEADER_CURRENT_LANGUAGE,
            String(currentLang).toUpperCase(),
          )
          .append(
            WapelHeaderKeys.HEADER_CURRENT_TOKEN,
            userSession?.token
              ? `Bearer ${userSession?.token as string}`
              : 'null',
          )
          .append(
            WapelHeaderKeys.HEADER_CURRENT_ROLE,
            selecetedRole ? `${selecetedRole as string}` : 'null',
          ),
      });
      return next.handle(request);
    }

    return next.handle(req);
  }
}
