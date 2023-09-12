import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './LocalStorage.service';

@Injectable({
  providedIn: 'root',
})
export class WapelHelperService {
  constructor(
    private localStorage: LocalStorageService,
    private translation: TranslateService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  /** this method used to get current used language in local storage */
  getActiveLanguageAsync(key: string): Promise<string | any> {
    const currentLang: string = this.localStorage.getLocal(key);
    if (currentLang) {
      return new Promise((res, rej) => {
        res(currentLang);
      });
    } else {
      return new Promise((res, rej) => {
        rej(null);
      });
    }
  }
  /** this method used to get current used language in local storage */
  getActiveLanguage(key: string): string {
    const currentLang: string = this.localStorage.getLocal(key);
    if (currentLang) {
      return currentLang;
    } else {
      return 'en';
    }
  }

  /** make window in full screen */
  fullScreenMode() {
    let fullscreen = false;

    if (!fullscreen) {
      fullscreen = true;
      this.document.documentElement.requestFullscreen();
      // fsEnter.innerHTML = 'Exit Fullscreen';
    } else {
      fullscreen = false;
      this.document.exitFullscreen();
      // fsEnter.innerHTML = 'Go Fullscreen';
    }
  }
  /** change app default language and change it in the localstorage also */
  changeAppDefaultLanguage(key: string, lang: string) {
    this.translation.setDefaultLang(lang);
    this.translation.use(lang);
    this.localStorage.setLocal(key, lang);
  }

  /** set theme dark Mode theme */
  applyDarkMode() {
    return true;
  }

  /** Get Max length from regular Expression File */
  getMaxLengthFromRegularExpression(IDNumberPattern: string) {
    let maxLength = 0;
    const regex = /\{([^\][]*)}/g;
    let matched;
    while ((matched = regex.exec(IDNumberPattern))) {
      maxLength += parseInt(matched[1]);
    }
    return maxLength == 0 ? null : maxLength;
  }
}
