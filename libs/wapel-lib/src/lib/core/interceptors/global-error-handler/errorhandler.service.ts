import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessage } from './HttpErrorMessage';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToasterService } from '@wapelSharedLib/core/helpers/Toaster.service';
import { AuthService } from '@wapelSharedLib/services/auth.service';
import { WapelInjectToken } from '@wapelSharedLib/core/token/WapelInjectToken.enum';

@Injectable({
  providedIn: 'root',
})
export class ErrorhandlerService implements HttpInterceptor {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private notify: ToasterService,
    private authService: AuthService,
    @Inject(WapelInjectToken.APP_NAME) private appName: string
  ) {
    console.log('erro interceptor  working');
  }

  HttpErrorMsg: HttpErrorMessage = new HttpErrorMessage(
    this.router,
    this.appName
  );

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);

        const trans = Object.values(
          this.translate.instant([
            `COMMON-MESSAGES.HTTP-STATUS.401`,
            `COMMON-MESSAGES.Error`,
          ])
        ) as string[];
        if (err.status === 401) {
          this.authService.setUserLoggedIn(false);
          this.notify.showToastError('', `${trans[0]}`);
          if (err.error.errors) {
            (err.error.errors as any[]).forEach((ele) => {
              this.notify.showToastError('', ele);
            });
          } else {
            this.notify.showToastError('', err.error.status);
          }
        } else if (err.status === 409) {
          if (err.error && err.error.messages) {
            this.notify.showToastError(err.error.status, err.error.messages[0]);
          }
          if (err.error && err.error.errors && err.error.errors.length > 0) {
            let messages = '';
            for (let i = 0; i < err.error.errors.length; i++) {
              messages += err.error.errors[i] + '<br />';
            }
            if (messages && messages != '') {
              this.notify.showToastError('', messages);
            }
          }
        } else if (err.status === 400) {
          console.log(err);

          if (err.error && err.error.errors) {
            for (let i = 0; i < err.error.errors.length; i++) {
              if (err.error.errors[i]) {
                this.notify.showToastError(
                  this.Locz('COMMON-MESSAGES.Error'),
                  err.error.errors[i].msg
                );
              }
            }
          }
        } else if (err.status === 404) {
          this.notify.showToastError(
            this.Locz('COMMON-MESSAGES.Error'),
            this.Locz('COMMON-MESSAGES.PageNotFoundErrorMessage')
          );
        } else if (err.status === 500) {
          this.notify.showToastError(
            this.Locz('COMMON-MESSAGES.Error'),
            this.Locz('COMMON-MESSAGES.InternalServerErrorMessage')
          );
          // this.router.navigate(['/auth/login']);
          this.router.navigate(['/pages/server-error']);
        } else if (err.status === 504) {
          this.notify.showToastError(
            this.Locz('Error'),
            this.Locz('COMMON-MESSAGES.NetworkErrorMessage')
          );
        }
        // << check client side error >> //
        if (err.error instanceof ErrorEvent) {
          throwError(err);
        } else {
          if (err.statusText === 'Unknown Error') {
            // this.HttpErrorMsg.handleHttpErrors(err.statusText);
            this.notify.showToastError('', 'COMMOM-MESSAGES.Error');
            this.router.navigate(['/pages/server-error']);
          } else {
            this.HttpErrorMsg.handleHttpErrors(err.status);
          }
        }
        return throwError(err);
      })
    );
  }

  Locz(key: string) {
    return this.translate.instant(key);
  }
}
