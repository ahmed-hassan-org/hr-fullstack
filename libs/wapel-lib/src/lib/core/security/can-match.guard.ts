import { Inject, Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment } from '@angular/router';
import { LocalStorageService } from '../helpers/LocalStorage.service';
import { LocalStorageKeysModel } from '../models/interfaace/LocalStorageKeysModel.interface';
import { WapelInjectToken } from '../token/WapelInjectToken.enum';

@Injectable({
  providedIn: 'root',
})
export class CanMatchGuard implements CanMatch {
  constructor(
    @Inject(WapelInjectToken.APP_LOCAL_STORAGE_KEYS)
    public localStorage: LocalStorageKeysModel,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}
  canMatch(route: Route, segments: UrlSegment[]) {
    const getToken = this.localStorageService.getSessionStorage(
      this.localStorage.APP_TOKEN_SESSION as string,
    );
    if (getToken) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
