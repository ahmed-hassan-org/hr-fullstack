import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterLoaderService implements HttpInterceptor {
  constructor(
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.router.events.pipe(map((evt) => evt)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show('routerSpinner');
      }

      if (event instanceof NavigationError) {
        this.spinnerService.hide('routerSpinner');
      }
      if (event instanceof NavigationCancel) {
        this.spinnerService.hide('routerSpinner');
      }

      if (event instanceof NavigationEnd) {
        this.spinnerService.hide('routerSpinner');
      }
    });
    return next.handle(req);
  }
}
