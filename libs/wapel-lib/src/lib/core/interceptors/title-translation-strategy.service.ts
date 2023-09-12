import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class TitleTranslationStrategyService extends TitleStrategy {
  constructor(private readonly title: Title, private translation: TranslateService) {
    super();
  }

  updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
  }
}
