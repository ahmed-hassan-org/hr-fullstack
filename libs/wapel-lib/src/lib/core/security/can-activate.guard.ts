import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { LocalStorageService } from '../helpers/LocalStorage.service';
import { LocalStorageKeysModel } from '../models/interfaace/LocalStorageKeysModel.interface';
import { WapelInjectToken } from '../token/WapelInjectToken.enum';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(
    @Inject(WapelInjectToken.APP_LOCAL_STORAGE_KEYS)
    public localStorage: LocalStorageKeysModel,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
