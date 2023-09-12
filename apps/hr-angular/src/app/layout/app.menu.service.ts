import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuSource = new Subject<any>();
  private resetSource = new Subject();
  private moduleScreenPermissionList: any = {};

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  onMenuStateChange(event: any) {
    this.menuSource.next(event);
  }

  reset() {
    this.resetSource.next(true);
  }
  /**
   * @description set permission after login here
   * */
  setModuleScreenPermission(data: any) {
    this.moduleScreenPermissionList = { ...data };
  }

  get getModuleScreenPermission() {
    return new Promise<any>((res, rej) =>
      res(this.moduleScreenPermissionList)
    );
  }

  /**
   * @description chcek if screen included in the roles array from server
   * @return boolean
   */
  checkIfModuleScreenExists(moduleScreenName: string) {
    return this.moduleScreenPermissionList.screens?.includes(moduleScreenName as string);
  }

  /**
   * @description chcek if module or submodules included in the roles array from server
   * @return boolean
   */
  checkIfModuleSubmoduleExistsAsync(moduleScreenName: string): Promise<boolean> {
    const module = this.moduleScreenPermissionList.modulesSubmodule?.includes(
      moduleScreenName as string
    ) as boolean;
    return new Promise((res, rej) => res(module));
  }

  checkIfScreenExistsAsync(moduleScreenName: string): Promise<boolean> {
    const screen: boolean = this.moduleScreenPermissionList.screens?.includes(
      moduleScreenName as string
    ) as boolean;
    return new Promise((res, rej) => res(screen));
  }

  checkIfSubmoduleInScreenModule(submoduleName: string): Promise<boolean> {
    const screnRolesArr = Object.keys(this.moduleScreenPermissionList.screenRoles[0]);
    const screen = screnRolesArr.includes(submoduleName);
    console.log(screen);

    return new Promise((res, rej) => res(screen));
  }
}
