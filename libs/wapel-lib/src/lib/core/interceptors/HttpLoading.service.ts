import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs/operators';
import { IS_SPINNER_ENABLED } from '../token/WapelHttpToken';

@Injectable({
  providedIn: 'root',
})
export class HttpLoadingService implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const spinnreState = request.context.get(IS_SPINNER_ENABLED);
    if (spinnreState) {

      this.totalRequests++;
      // ConsoleService.success('loading spinner interceptor works fine');
      this.spinnerService.show('httpLoaderSpinner');

      return next.handle(request).pipe(
        delay(200),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            this.spinnerService.hide('httpLoaderSpinner');
          }
        })
      );
    }
    return next.handle(request);
  }
}
