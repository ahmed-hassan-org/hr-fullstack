import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { MenuService } from '@hrLayout/app.menu.service';
import { LocalStorageService } from '@wapelSharedLib/core/helpers/LocalStorage.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class FusionPermissionService {
  constructor(
    private permisionService: NgxPermissionsService,
    private menuService: MenuService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  async checkPerm(screenName: string, permissionName: string) {
    const data = await this.menuService.getModuleScreenPermission;
    if (data && data.screenRoles) {
      const perm: string[] = data.screenRoles[0][screenName];
      this.permisionService.addPermission(perm);
    }
    const isPermissionExists = await this.permisionService.hasPermission(
      permissionName,
    );

    if (isPermissionExists) {
      return true;
    } else {
      const rolesPerm: any = this.localStorageService.getSessionStorage(
        LocalStorageKeys.APP_TREE,
      );
      if (rolesPerm) {
        const moduleSbmoduleList = rolesPerm.modulesSubmodule;
        const screensList = rolesPerm.screens;
        this.permisionService.flushPermissions();

        this.menuService.setModuleScreenPermission(rolesPerm);
        // must add this line of code by take the screen from the response
        this.permisionService.addPermission([
          ...moduleSbmoduleList,
          ...screensList,
        ]);
      }
      return false;
    }
  }

  /**
   * @description check if token is provided after user logged in
   * */
  isTokenExists() {
    const getToken = this.localStorageService.getSessionStorage(
      LocalStorageKeys.APP_TOKEN_SESSION,
    );
    if (getToken) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
