import { ICrudSidebarConfig } from '../../core/models/interface/ILayoutConfig.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarConfigService {
  private sidebarConfig: BehaviorSubject<ICrudSidebarConfig> =
    new BehaviorSubject<ICrudSidebarConfig>({
      showSidebar: false,
      template: null,
      fullScreen: false,
      onCloseFn: () => null,
      data: {},
    });

  get getSidebarConfig() {
    return this.sidebarConfig.asObservable();
  }

  setSidebarConfig(data: ICrudSidebarConfig) {
    this.sidebarConfig.next({ ...data });
  }
}
