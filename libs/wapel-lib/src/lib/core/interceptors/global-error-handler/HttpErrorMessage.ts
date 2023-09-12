import { Router } from '@angular/router';
import { WapelApps } from '@wapelSharedLib/core/models/enum/WapelApps.enum';
import { TranslateService } from '@ngx-translate/core';

export class HttpErrorMessage {
  constructor(
    private router: Router,
    private appName: string,
    private lang?: TranslateService,
  ) {}

  async handleHttpErrors(httpStatusCode: number | string) {
    if (httpStatusCode === 401) {
      if (this.appName !== WapelApps.FINANCIAL_APP) {
        this.router.navigate(['/login']);
      }
      if (this.appName !== WapelApps.HR_APP) {
        this.router.navigate(['/login']);
      }
    }
  }
}
